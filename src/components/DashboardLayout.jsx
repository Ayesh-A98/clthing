import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sildebar';
import Header from './Header';


export default function DashboardLayout() {
  return (
    <div className="  flex min-h-screen bg-[#FDF8F5] text-[#2D1A12] font-sans">
      
      <Sidebar /> 
    
      
      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Header />
        <Outlet /> 
      </main>
    </div>
  );
}