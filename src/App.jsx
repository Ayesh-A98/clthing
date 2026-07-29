import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Categ from './pages/Catgo'
import Jel from './pages/Jewelary'
import About from './pages/About'
import DashboardLayout from './components/DashboardLayout'
import Overeview from "./components/Overreview"
import  Dashcat from "./components/Dashboardcat"
import Dashprod from "./components/Dashprod"
import Report from "./components/Report"
import Setting from "./components/Setting"
import { getAllProducts } from './api/products'
import './App.css'
 

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
          <Route path="jel" element={<Jel />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overeview />} />
           <Route path="donations" element={<Dashcat />} /> 
            <Route path="collections" element={<Dashprod />} /> 
               <Route path="report" element={<Report />} /> 
                <Route path="setting" element={<Setting />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App