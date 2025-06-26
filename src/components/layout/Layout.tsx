import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { NavigationItem } from '@/types/components.types';
import { useAppStore, useAuthStore } from '@/store';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME, { replace: true });
  };

  const navigation: NavigationItem[] = [
    { name: '대시보드', href: ROUTES.DASHBOARD, icon: '📊' },
    { name: '고객 관리', href: ROUTES.CUSTOMERS, icon: '👥' },
    { name: '리포트', href: ROUTES.REPORTS, icon: '📈' },
    { name: '설정', href: ROUTES.SETTINGS, icon: '⚙️' },
  ];

  return (
    <div className="layout">
      {/* 헤더 */}
      <header className="header">
        <div className="header-content">
          <button onClick={toggleSidebar} className="sidebar-toggle">
            ☰
          </button>
          <h1 className="logo">CRM System</h1>
          <div className="header-actions">
            <span>환영합니다, {user?.name || '사용자'}님</span>
            <button onClick={handleLogout} className="logout-btn">
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <div className="main-container">
        {/* 사이드바 */}
        {sidebarOpen && (
          <aside className="sidebar">
            <nav className="navigation">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`nav-item ${location.pathname === item.href ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.name}</span>
                </Link>
              ))}
            </nav>
          </aside>
        )}

        {/* 메인 콘텐츠 */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
