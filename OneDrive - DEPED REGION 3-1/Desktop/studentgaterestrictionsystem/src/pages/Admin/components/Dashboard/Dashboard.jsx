import "./dashboard.css";
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { useState } from 'react';

 function Dashboard() {

  
  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div>
          <h2 className="page-title">Dashboard Overview</h2>
          <p className="page-subtitle">Welcome back! Here's what's happening today.</p>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card stat-card-purple">
          <div className="stat-icon-wrapper stat-icon-purple">
            <Users className="stat-icon" />
          </div>
          <div className="stat-content">
            <h3 className="stat-label">Total Students</h3>
            <p className="stat-value">0</p>
          </div>
        </div>

       
    
      
      </div>

      

      <div className="dashboard-section">
        <div className="section-card">
          <h3 className="section-title">Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-dot activity-dot-yellow"></div>
              <div className="activity-content">
                <p onChange className="activity-text">New section schedule added: BSIT 3H-G2  </p>
                <p className="activity-time">2 hours ago</p>
              </div>
            </div>
             <div className="activity-item">
              <div className="activity-dot activity-dot-yellow"></div>
              <div className="activity-content">
                <p onChange className="activity-text">New section schedule added: BSIT 3H-G2  </p>
                <p className="activity-time">2 hours ago</p>
              </div>
            </div>
             <div className="activity-item">
              <div className="activity-dot activity-dot-yellow"></div>
              <div className="activity-content">
                <p onChange className="activity-text">New section schedule added: BSIT 3H-G2  </p>
                <p className="activity-time">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;