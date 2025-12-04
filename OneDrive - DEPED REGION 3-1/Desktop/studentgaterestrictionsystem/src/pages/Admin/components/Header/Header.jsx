import { useState } from 'react';
import { Bell, Search, Menu, X, ChevronDown } from 'lucide-react';
import './header.css';

function Header({ sidebarOpen, setSidebarOpen, user }) {
  const [searchValue, setSearchValue] = useState('');

  // Get user display name or email safely
  const displayName = user?.displayName || user?.email?.split('@')[0] || "Unknown User";
  const role = "Admin"; // You can later replace this with your user.role from the database

  // Get initials for profile avatar
  const initials = displayName
    .split(' ')
    .map((word) => word[0]?.toUpperCase())
    .join('')
    .slice(0, 2);

  return (
    <header className="header" style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>
      <div className="header-content">
        <div className="header-left">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="menu-toggle"
          >
            {sidebarOpen ? <X className="icon" /> : <Menu className="icon" />}
          </button>
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search anything..."
              className="search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <div className="header-right">
          <button className="notification-btn">
            <Bell className="icon" />
            <span className="notification-badge"></span>
          </button>

          <div className="profile-section">
            <div className="profile-info">
              <p className="profile-name">{displayName}</p>
              <p className="profile-role">{role}</p>
            </div>
            <div className="profile-avatar">{initials}</div>
            <ChevronDown className="profile-chevron" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
