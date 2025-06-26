import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>대시보드</h1>
      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>총 고객 수</h3>
            <p className="stat-number">1,234</p>
          </div>
          <div className="stat-card">
            <h3>이번 달 매출</h3>
            <p className="stat-number">₩12,345,678</p>
          </div>
          <div className="stat-card">
            <h3>신규 고객</h3>
            <p className="stat-number">45</p>
          </div>
          <div className="stat-card">
            <h3>진행 중인 프로젝트</h3>
            <p className="stat-number">12</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
