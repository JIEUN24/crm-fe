import React, { useState } from 'react';
import {
  PersonIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  Pencil1Icon,
  TrashIcon,
  EyeOpenIcon,
  EnvelopeClosedIcon,
  MobileIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';

import CustomDialog from '@/components/ui/Dialog';
import './Customers.scss';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'lead' | 'vip';
  joinDate: string;
  lastContact: string;
  totalOrders: number;
  totalValue: number;
  avatar?: string;
}

const Customers = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // 샘플 고객 데이터
  const customers: Customer[] = [
    {
      id: 1,
      name: '김철수',
      email: 'kim@example.com',
      phone: '010-1234-5678',
      company: '㈜ABC 컴퍼니',
      status: 'vip',
      joinDate: '2023-01-15',
      lastContact: '2024-01-10',
      totalOrders: 25,
      totalValue: 12500000,
    },
    {
      id: 2,
      name: '이영희',
      email: 'lee@example.com',
      phone: '010-9876-5432',
      company: '디지털 솔루션',
      status: 'active',
      joinDate: '2023-03-22',
      lastContact: '2024-01-08',
      totalOrders: 18,
      totalValue: 8700000,
    },
    {
      id: 3,
      name: '박민수',
      email: 'park@example.com',
      phone: '010-5555-1111',
      company: '스타트업 코리아',
      status: 'lead',
      joinDate: '2023-12-01',
      lastContact: '2024-01-05',
      totalOrders: 3,
      totalValue: 1200000,
    },
    {
      id: 4,
      name: '정수현',
      email: 'jung@example.com',
      phone: '010-7777-8888',
      company: '테크놀로지 그룹',
      status: 'active',
      joinDate: '2023-06-10',
      lastContact: '2024-01-12',
      totalOrders: 12,
      totalValue: 5400000,
    },
    {
      id: 5,
      name: '최지원',
      email: 'choi@example.com',
      phone: '010-3333-4444',
      company: '이노베이션 랩',
      status: 'inactive',
      joinDate: '2023-02-28',
      lastContact: '2023-11-15',
      totalOrders: 8,
      totalValue: 3600000,
    },
  ];

  // 통계 데이터
  const stats = [
    {
      title: '전체 고객',
      value: customers.length,
      change: '+12%',
      trend: 'up',
      icon: <PersonIcon width={24} height={24} />,
      color: 'blue',
    },
    {
      title: 'VIP 고객',
      value: customers.filter((c) => c.status === 'vip').length,
      change: '+5%',
      trend: 'up',
      icon: <PersonIcon width={24} height={24} />,
      color: 'purple',
    },
    {
      title: '신규 리드',
      value: customers.filter((c) => c.status === 'lead').length,
      change: '+18%',
      trend: 'up',
      icon: <PlusIcon width={24} height={24} />,
      color: 'green',
    },
    {
      title: '평균 주문액',
      value: '₩4,680,000',
      change: '+8.5%',
      trend: 'up',
      icon: <CalendarIcon width={24} height={24} />,
      color: 'orange',
    },
  ];

  const statusOptions = [
    { value: 'all', label: '전체' },
    { value: 'vip', label: 'VIP' },
    { value: 'active', label: '활성' },
    { value: 'lead', label: '리드' },
    { value: 'inactive', label: '비활성' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip':
        return 'purple';
      case 'active':
        return 'green';
      case 'lead':
        return 'blue';
      case 'inactive':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'vip':
        return 'VIP';
      case 'active':
        return '활성';
      case 'lead':
        return '리드';
      case 'inactive':
        return '비활성';
      default:
        return status;
    }
  };

  // 필터링된 고객 데이터
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 페이지네이션
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="customers">
      {/* 고객 관리 헤더 */}
      <div className="customers-header">
        <div className="header-content">
          <div>
            <h1 className="customers-title">고객 관리</h1>
            <p className="customers-subtitle">
              고객 정보를 효율적으로 관리하세요 👥
            </p>
          </div>
          <div className="header-actions">
            <button
              className="btn-primary"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <PlusIcon width={16} height={16} />새 고객 추가
            </button>
          </div>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-header">
              <div className="stat-icon">{stat.icon}</div>
              <div className={`stat-trend ${stat.trend}`}>
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

      {/* 검색 및 필터 */}
      <div className="customers-controls">
        <div className="search-section">
          <div className="search-box">
            <MagnifyingGlassIcon
              width={18}
              height={18}
              className="search-icon"
            />
            <input
              type="text"
              placeholder="고객명, 이메일, 회사명으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-section">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 고객 테이블 */}
      <div className="customers-table-container">
        <div className="table-header">
          <h3>고객 목록 ({filteredCustomers.length}명)</h3>
        </div>

        <div className="customers-table">
          <div className="table-header-row">
            <div className="table-cell">고객정보</div>
            <div className="table-cell">연락처</div>
            <div className="table-cell">회사</div>
            <div className="table-cell">상태</div>
            <div className="table-cell">가입일</div>
            <div className="table-cell">총 주문액</div>
            <div className="table-cell">작업</div>
          </div>

          {currentCustomers.map((customer) => (
            <div key={customer.id} className="table-row">
              <div className="table-cell customer-info">
                <div className="customer-avatar">
                  <PersonIcon width={20} height={20} />
                </div>
                <div className="customer-details">
                  <p className="customer-name">{customer.name}</p>
                  <p className="customer-id">ID: {customer.id}</p>
                </div>
              </div>

              <div className="table-cell contact-info">
                <div className="contact-item">
                  <EnvelopeClosedIcon width={14} height={14} />
                  <span>{customer.email}</span>
                </div>
                <div className="contact-item">
                  <MobileIcon width={14} height={14} />
                  <span>{customer.phone}</span>
                </div>
              </div>

              <div className="table-cell">
                <span className="company-name">{customer.company}</span>
              </div>

              <div className="table-cell">
                <span
                  className={`status-badge ${getStatusColor(customer.status)}`}
                >
                  {getStatusLabel(customer.status)}
                </span>
              </div>

              <div className="table-cell">
                <span className="date">{customer.joinDate}</span>
              </div>

              <div className="table-cell">
                <span className="order-value">
                  ₩{customer.totalValue.toLocaleString()}
                </span>
                <span className="order-count">{customer.totalOrders}건</span>
              </div>

              <div className="table-cell actions">
                <button
                  className="action-btn view"
                  onClick={() => handleViewCustomer(customer)}
                  title="상세보기"
                >
                  <EyeOpenIcon width={16} height={16} />
                </button>
                <button className="action-btn edit" title="편집">
                  <Pencil1Icon width={16} height={16} />
                </button>
                <button className="action-btn delete" title="삭제">
                  <TrashIcon width={16} height={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeftIcon width={16} height={16} />
            이전
          </button>

          <div className="pagination-info">
            {startIndex + 1}-{Math.min(endIndex, filteredCustomers.length)} /{' '}
            {filteredCustomers.length}
          </div>

          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            다음
            <ChevronRightIcon width={16} height={16} />
          </button>
        </div>
      </div>

      {/* 새 고객 추가 다이얼로그 */}
      <CustomDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        title="새 고객 추가"
      >
        <form className="customer-form">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">고객명 *</label>
              <input
                type="text"
                className="form-input"
                placeholder="고객명을 입력하세요"
              />
            </div>
            <div className="form-group">
              <label className="form-label">회사명</label>
              <input
                type="text"
                className="form-input"
                placeholder="회사명을 입력하세요"
              />
            </div>
            <div className="form-group">
              <label className="form-label">이메일 *</label>
              <input
                type="email"
                className="form-input"
                placeholder="이메일을 입력하세요"
              />
            </div>
            <div className="form-group">
              <label className="form-label">전화번호</label>
              <input
                type="tel"
                className="form-input"
                placeholder="전화번호를 입력하세요"
              />
            </div>
            <div className="form-group full-width">
              <label className="form-label">고객 상태</label>
              <select className="form-select">
                <option value="lead">리드</option>
                <option value="active">활성</option>
                <option value="vip">VIP</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsAddDialogOpen(false)}
            >
              취소
            </button>
            <button type="submit" className="btn-primary">
              저장
            </button>
          </div>
        </form>
      </CustomDialog>

      {/* 고객 상세보기 다이얼로그 */}
      {selectedCustomer && (
        <CustomDialog
          open={isViewDialogOpen}
          onOpenChange={setIsViewDialogOpen}
          title="고객 상세정보"
        >
          <div className="customer-detail">
            <div className="customer-detail-header">
              <div className="customer-avatar large">
                <PersonIcon width={32} height={32} />
              </div>
              <div className="customer-detail-info">
                <h3>{selectedCustomer.name}</h3>
                <p>{selectedCustomer.company}</p>
                <span
                  className={`status-badge ${getStatusColor(selectedCustomer.status)}`}
                >
                  {getStatusLabel(selectedCustomer.status)}
                </span>
              </div>
            </div>

            <div className="customer-detail-grid">
              <div className="detail-item">
                <label>이메일</label>
                <span>{selectedCustomer.email}</span>
              </div>
              <div className="detail-item">
                <label>전화번호</label>
                <span>{selectedCustomer.phone}</span>
              </div>
              <div className="detail-item">
                <label>가입일</label>
                <span>{selectedCustomer.joinDate}</span>
              </div>
              <div className="detail-item">
                <label>최근 연락</label>
                <span>{selectedCustomer.lastContact}</span>
              </div>
              <div className="detail-item">
                <label>총 주문</label>
                <span>{selectedCustomer.totalOrders}건</span>
              </div>
              <div className="detail-item">
                <label>총 주문액</label>
                <span>₩{selectedCustomer.totalValue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CustomDialog>
      )}
    </div>
  );
};

export default Customers;
