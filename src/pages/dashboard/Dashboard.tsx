import React from 'react';
import {
  BarChartIcon,
  PersonIcon,
  CalendarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
} from '@radix-ui/react-icons';

import './Dashboard.scss';

const Dashboard = () => {
  const stats = [
    {
      title: '총 고객 수',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: <PersonIcon width={24} height={24} />,
      color: 'blue',
    },
    {
      title: '이번 달 매출',
      value: '₩12,345,678',
      change: '+8.2%',
      trend: 'up',
      icon: <BarChartIcon width={24} height={24} />,
      color: 'green',
    },
    {
      title: '신규 고객',
      value: '45',
      change: '+23%',
      trend: 'up',
      icon: <PlusIcon width={24} height={24} />,
      color: 'purple',
    },
    {
      title: '진행 중인 프로젝트',
      value: '12',
      change: '-5%',
      trend: 'down',
      icon: <CalendarIcon width={24} height={24} />,
      color: 'orange',
    },
  ];

  const recentActivities = [
    { id: 1, action: '신규 고객 등록', name: '김철수', time: '5분 전' },
    { id: 2, action: '계약 체결', name: '㈜ABC 컴퍼니', time: '1시간 전' },
    { id: 3, action: '미팅 일정', name: '이영희', time: '2시간 전' },
    { id: 4, action: '견적서 발송', name: '㈜XYZ 기업', time: '3시간 전' },
  ];

  return (
    <div className="dashboard">
      {/* 대시보드 헤더 */}
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1 className="dashboard-title">대시보드</h1>
            <p className="dashboard-subtitle">오늘도 좋은 하루 되세요! 📊</p>
          </div>
          <div className="header-actions">
            <button className="btn-primary">
              <PlusIcon width={16} height={16} />새 고객 추가
            </button>
          </div>
        </div>
      </div>

      {/* 통계 카드 그리드 */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-header">
              <div className="stat-icon">{stat.icon}</div>
              <div className={`stat-trend ${stat.trend}`}>
                {stat.trend === 'up' ? (
                  <ArrowUpIcon width={16} height={16} />
                ) : (
                  <ArrowDownIcon width={16} height={16} />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="stat-content">
              <h3 className="stat-title">{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 그리드 */}
      <div className="dashboard-grid">
        {/* 최근 활동 */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>최근 활동</h3>
            <button className="btn-text">전체 보기</button>
          </div>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <p className="activity-action">{activity.action}</p>
                  <p className="activity-name">{activity.name}</p>
                </div>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 빠른 작업 */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>빠른 작업</h3>
          </div>
          <div className="quick-actions">
            <button className="quick-action-btn">
              <PersonIcon width={20} height={20} />
              고객 등록
            </button>
            <button className="quick-action-btn">
              <CalendarIcon width={20} height={20} />
              일정 등록
            </button>
            <button className="quick-action-btn">
              <BarChartIcon width={20} height={20} />
              리포트 생성
            </button>
            <button className="quick-action-btn">
              <PlusIcon width={20} height={20} />
              프로젝트 생성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
