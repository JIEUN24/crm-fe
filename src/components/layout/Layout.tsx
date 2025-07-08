import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  PersonIcon,
  BarChartIcon,
  DashboardIcon,
  GearIcon,
  HamburgerMenuIcon,
  ExitIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ComponentInstanceIcon,
} from '@radix-ui/react-icons';

import { ROUTES } from '@/constants/routes';
import { NavigationItem } from '@/types/components.types';
import { useAppStore, useAuthStore } from '@/store';

import './Layout.scss';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const { user, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME, { replace: true });
  };

  const navigation: NavigationItem[] = [
    {
      name: '대시보드',
      href: ROUTES.DASHBOARD,
      icon: <DashboardIcon width={20} height={20} />,
    },
    {
      name: '고객 관리',
      href: ROUTES.CUSTOMERS,
      icon: <PersonIcon width={20} height={20} />,
    },
    {
      name: '리포트',
      href: ROUTES.REPORTS,
      icon: <BarChartIcon width={20} height={20} />,
    },

    {
      name: '설정',
      href: ROUTES.SETTINGS,
      icon: <GearIcon width={20} height={20} />,
    },
    {
      name: '샘플',
      href: ROUTES.SAMPLES,
      icon: <ComponentInstanceIcon width={20} height={20} />,
    },
  ];

  return (
    <div className="layout">
      {/* 헤더 */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <button
              onClick={toggleSidebar}
              className="sidebar-toggle"
              aria-label="메뉴 토글"
            >
              <HamburgerMenuIcon width={20} height={20} />
            </button>
            <div className="logo-section">
              <div className="logo-icon">
                <PersonIcon width={20} height={20} />
              </div>
              <h1 className="brand-title">CRM 시스템</h1>
            </div>
          </div>

          {/* <div className="header-center">
            <div className="search-box">
              <MagnifyingGlassIcon
                width={18}
                height={18}
                className="search-icon"
              />
              <input
                type="text"
                placeholder="검색..."
                className="search-input"
              />
            </div>
          </div> */}

          <div className="header-right">
            <button className="notification-btn" aria-label="알림">
              <BellIcon width={20} height={20} />
              <span className="notification-badge">3</span>
            </button>

            <div className="user-menu">
              <button
                className="user-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                aria-label="사용자 메뉴"
              >
                <div className="user-avatar">
                  <PersonIcon width={18} height={18} />
                </div>
                <span className="user-name">{user?.name || '사용자'}님</span>
                <ChevronDownIcon width={16} height={16} />
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <div className="user-avatar large">
                      <PersonIcon width={24} height={24} />
                    </div>
                    <div className="user-details">
                      <p className="user-name-large">
                        {user?.name || '사용자'}
                      </p>
                      <p className="user-email">
                        {user?.email || 'user@example.com'}
                      </p>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item">
                    <PersonIcon width={16} height={16} />
                    프로필
                  </button>
                  <button className="dropdown-item">
                    <GearIcon width={16} height={16} />
                    설정
                  </button>
                  <div className="dropdown-divider"></div>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout"
                  >
                    <ExitIcon width={16} height={16} />
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="main-container">
        {/* 사이드바 */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <nav className="navigation">
            <div className="nav-header">
              <h3>메인 메뉴</h3>
            </div>
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

        {/* 메인 콘텐츠 */}
        <main
          className={`main-content ${sidebarOpen ? 'with-sidebar' : 'full-width'}`}
        >
          <Outlet />
        </main>
      </div>

      {/* 사이드바가 열려있을 때 오버레이 */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

export default Layout;
