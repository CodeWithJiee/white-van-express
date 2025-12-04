import './adminhome.css';
import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import UserManagement from './components/UserManagement/UserManagement';
import Schedule from './components/Schedule/Schedule';
import LogHistory from './components/LogHistory/LogHistory';
import VisitorApproval from './components/VisitorApproval/VisitorApproval';
import ReportModule from './components/ReportModule/ReportModule';


  function AdminHome() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'userManagement':
        return <UserManagement />;
      case 'viewSchedule':
        return <Schedule />;
      case 'logHistory':
        return <LogHistory />;
      case 'visitorApproval':
        return <VisitorApproval />;
      case 'reportingModule':
        return <ReportModule />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        sidebarOpen={sidebarOpen} 
      />
      
      <div className="main-wrapper">
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />
        
        <main className="content-area">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
export default AdminHome;