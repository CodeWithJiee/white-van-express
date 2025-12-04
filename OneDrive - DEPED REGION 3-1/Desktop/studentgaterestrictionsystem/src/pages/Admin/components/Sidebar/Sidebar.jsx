import { Home, Users, Calendar, ClipboardClock, Handshake, FileText, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import './sidebar.css';


function Sidebar({ activeTab, setActiveTab, sidebarOpen }) {
  const navigate = useNavigate();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'userManagement', label: 'User Management', icon: Users },
    { id: 'viewSchedule', label: 'Schedule Integration', icon: Calendar },
    { id: 'logHistory', label: 'Access Logs', icon: ClipboardClock },
    { id: 'visitorApproval', label: 'Visitor Approval', icon: Handshake },
    { id: 'reportingModule', label: 'Generate Report', icon: FileText }
  ];

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (confirmLogout) {
      try {
        await signOut(auth);
        console.log("User logged out successfully");
        navigate("/login");
      } catch (error) {
        console.error("Error logging out:", error);
        alert("Failed to logout. Please try again.");
      }
    }
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar-header">
        <img className="bulsulogo" src="bulsulogo.svg" alt="" />
        <h1 className="sidebar-title">BulSU Gate System</h1>
      </div>
      <nav className="sidebar-nav">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-item ${activeTab === tab.id ? 'nav-item-active' : ''}`}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{tab.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut className="nav-icon" />
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </aside>
  );
}
export default Sidebar;