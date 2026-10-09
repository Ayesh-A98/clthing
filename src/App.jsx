import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Categ from './pages/Catgo'
import Jel from './pages/Jewelary'
import Summer from "./pages/Summercollection"
import About from './pages/About'
import Login from './components/Login'
import DashboardLayout from './components/DashboardLayout'
import Overeview from "./components/Overreview"
import Dashcat from "./components/Dashboardcat"
import Dashprod from "./components/Dashprod"
import Profile from './pages/Profile'

import ProtectedRoute from "./components/ProtectedRoute"
import './App.css'
import AccountInfo from './components/AccountInfo'


function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="categories" element={<Categ />} />
            <Route path="/category/:categoryId" element={<Jel />} />
            <Route path="/category/:categoryId" element={<Summer />} />
            <Route path="about" element={<About />} />
             <Route
    path="profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />
          </Route>

         
          <Route path="/login" element={<Login />} />
         
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overeview />} />
          
            <Route path="donations" element={<Dashcat />} />
            <Route path="collections" element={<Dashprod />} />
             <Route path="account" element={<AccountInfo />} />
           
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App