import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../API/axiosInstance";

const AuthContext = createContext(null);

function readStoredProfile() {
  try {
    return JSON.parse(localStorage.getItem("userFallbackProfile")) || null;
  } catch {
    return null;
  }
}

function normalizeProfile(rawProfile) {
  if (!rawProfile) return null;

  const name = rawProfile.name || rawProfile.full_name || rawProfile.fullName || rawProfile.user_metadata?.full_name || rawProfile.user_metadata?.name || rawProfile.email?.split("@")[0] || rawProfile.username || null;
  const email = rawProfile.email || rawProfile.user_email || rawProfile.username || rawProfile.user_metadata?.email || null;
  const phone = rawProfile.phone || rawProfile.phone_number || rawProfile.mobile || rawProfile.user_metadata?.phone || rawProfile.user_metadata?.phone_number || null;
  const address = rawProfile.address || rawProfile.user_metadata?.address || rawProfile.profile?.address || null;
const rawRole = rawProfile.user_metadata?.role || rawProfile.app_metadata?.role || rawProfile.rol || (rawProfile.role !== "authenticated" ? rawProfile.role : null) || rawProfile.aud || null;  const normalizedRole = typeof rawRole === 'string' ? rawRole.toLowerCase() : rawRole;
  const role = normalizedRole === "authenticated" || normalizedRole === "user"
    ? "User"
    : normalizedRole === "anon" || normalizedRole === "guest"
    ? "Guest"
    : normalizedRole === "admin"
    ? "admin"
    : rawRole || "User";

  return {
    ...rawProfile,
    name,
    email,
    phone,
    address,
    role,
  };
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem("accessToken") || null);
  const [profile, setProfile] = useState(() => readStoredProfile());
  const [loading, setLoading] = useState(true);

const refreshProfile = async (fallbackProfile = null) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setProfile(null);
      localStorage.removeItem("userFallbackProfile");
      return null;
    }

    try {
      const res = await axiosInstance.get("/auth/me");
      const authUser = res?.data?.data?.authUser || res?.data?.authUser || null;
      const appProfile = res?.data?.data?.profile || res?.data?.profile || null;

      // Merge: authUser fills in base fields (email etc), appProfile (your real DB row) overrides with the actual role/name
      const rawProfile = (authUser || appProfile)
        ? { ...authUser, ...appProfile }
        : res?.data?.user || res?.data?.data?.user || fallbackProfile || null;

      const normalizedProfile = normalizeProfile(rawProfile);

      setProfile(normalizedProfile);
      if (normalizedProfile) {
        localStorage.setItem("userFallbackProfile", JSON.stringify(normalizedProfile));
      } else {
        localStorage.removeItem("userFallbackProfile");
      }

      return normalizedProfile;
    } catch (err) {
      console.warn("Failed to refresh auth profile:", err);
      const fallbackNormalized = fallbackProfile ? normalizeProfile(fallbackProfile) : null;
      if (fallbackNormalized) {
        setProfile(fallbackNormalized);
        localStorage.setItem("userFallbackProfile", JSON.stringify(fallbackNormalized));
      } else {
        setProfile(null);
        localStorage.removeItem("userFallbackProfile");
      }
      return fallbackNormalized;
    }
  };
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        if (isMounted) {
          setAccessToken(null);
          setProfile(null);
          setLoading(false);
        }
        return;
      }

      try {
        if (isMounted) {
          setAccessToken(token);
        }

        await refreshProfile();
      } catch (err) {
        console.warn("Failed to initialize auth session:", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        if (isMounted) {
          setAccessToken(null);
          setProfile(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email, password, adminOnly = false) => {
    const response = await axiosInstance.post("/auth/login", { email, password });
    const session = response?.data?.data?.session || response?.data?.session || response?.data?.data?.auth || response?.data?.auth || null;
    const accessTokenFromResponse = session?.access_token || response?.data?.data?.access_token || response?.data?.access_token || response?.data?.accessToken || response?.data?.data?.accessToken || null;

    if (!accessTokenFromResponse) {
      throw new Error("No token returned from server.");
    }

    localStorage.setItem("accessToken", accessTokenFromResponse);
    const refreshTokenFromResponse = session?.refresh_token || response?.data?.data?.refresh_token || response?.data?.refresh_token || null;
    if (refreshTokenFromResponse) {
      localStorage.setItem("refreshToken", refreshTokenFromResponse);
    }

    setAccessToken(accessTokenFromResponse);

    const normalizedProfile = await refreshProfile(response?.data?.data?.profile || response?.data?.profile || response?.data?.data?.user || response?.data?.user || null);

    if (adminOnly && normalizedProfile?.role !== "admin") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setAccessToken(null);
      setProfile(null);
      throw new Error("Only admin credentials are allowed on this page.");
    }

    return normalizedProfile;
  };

  const register = async (name, email, password, phone = '', address = '', role = 'User') => {
    const payload = { name, email, password, phone, address, role };
    const response = await axiosInstance.post("/auth/register", payload);
    const session = response?.data?.data?.session || response?.data?.session || response?.data?.data?.auth || response?.data?.auth || null;
    const accessTokenFromResponse = session?.access_token || response?.data?.data?.access_token || response?.data?.access_token || response?.data?.accessToken || response?.data?.data?.accessToken || null;

    if (!accessTokenFromResponse) {
      return {
        requiresEmailConfirmation: true,
        profile: normalizeProfile(response?.data?.data?.profile || response?.data?.profile || response?.data?.data?.user || response?.data?.user || null) || { name, email, phone, address, role },
      };
    }

    localStorage.setItem("accessToken", accessTokenFromResponse);
    const refreshTokenFromResponse = session?.refresh_token || response?.data?.data?.refresh_token || response?.data?.refresh_token || null;
    if (refreshTokenFromResponse) {
      localStorage.setItem("refreshToken", refreshTokenFromResponse);
    }

    setAccessToken(accessTokenFromResponse);

    const normalizedProfile = await refreshProfile(response?.data?.data?.profile || response?.data?.profile || response?.data?.data?.user || response?.data?.user || null);
    const fallbackProfile = normalizeProfile({ name, email, phone, address, role });
    const finalProfile = normalizedProfile || fallbackProfile;

    setProfile(finalProfile);
    if (finalProfile) {
      localStorage.setItem("userFallbackProfile", JSON.stringify(finalProfile));
    }

    return { requiresEmailConfirmation: false, profile: finalProfile };
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (err) {
      console.log("Logout API call failed:", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userFallbackProfile");
      setAccessToken(null);
      setProfile(null);
    }
  };

  const value = {
    accessToken,
    profile,
    user: profile, // alias so components can use either `profile` or `user`
    loading,
    isAuthenticated: !!accessToken,
    isAdmin: profile?.role === "admin",
    login,
    register,
    logout,
    refreshProfile,
    setAccessToken,
    setLoading,
    normalizeProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}