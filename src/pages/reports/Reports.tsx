import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  CalendarIcon,
  DownloadIcon,
  BarChartIcon,
  PieChartIcon,
  ActivityLogIcon,
  MixIcon,
  PersonIcon,
  ClockIcon,
} from '@radix-ui/react-icons';

import './Reports.scss';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedChart, setSelectedChart] = useState('all');

  // 매출 데이터
  const salesData = [
    { name: '1월', 매출: 4000, 목표: 3500, 고객수: 120 },
    { name: '2월', 매출: 3000, 목표: 3200, 고객수: 98 },
    { name: '3월', 매출: 5000, 목표: 4000, 고객수: 140 },
    { name: '4월', 매출: 4500, 목표: 4200, 고객수: 135 },
    { name: '5월', 매출: 6000, 목표: 5000, 고객수: 165 },
    { name: '6월', 매출: 5500, 목표: 5200, 고객수: 158 },
  ];

  // 고객 분포 데이터
  const customerData = [
    { name: '신규 고객', value: 45, color: '#3b82f6' },
    { name: '기존 고객', value: 85, color: '#10b981' },
    { name: '휴면 고객', value: 25, color: '#f59e0b' },
    { name: '이탈 고객', value: 15, color: '#ef4444' },
  ];

  // 일별 활동 데이터
  const activityData = [
    { name: '월', 방문: 120, 상담: 45, 계약: 12 },
    { name: '화', 방문: 150, 상담: 55, 계약: 18 },
    { name: '수', 방문: 135, 상담: 48, 계약: 15 },
    { name: '목', 방문: 170, 상담: 62, 계약: 22 },
    { name: '금', 방문: 180, 상담: 68, 계약: 25 },
    { name: '토', 방문: 90, 상담: 25, 계약: 8 },
    { name: '일', 방문: 75, 상담: 20, 계약: 5 },
  ];

  // 성과 지표 데이터
  const performanceMetrics = [
    {
      title: '총 매출',
      value: '₩28,000,000',
      change: '+12.5%',
      trend: 'up',
      icon: <BarChartIcon width={24} height={24} />,
      color: 'blue',
    },
    {
      title: '신규 고객',
      value: '45명',
      change: '+23%',
      trend: 'up',
      icon: <PersonIcon width={24} height={24} />,
      color: 'green',
    },
    {
      title: '계약 성사율',
      value: '68%',
      change: '+5.2%',
      trend: 'up',
      icon: <PieChartIcon width={24} height={24} />,
      color: 'purple',
    },
    {
      title: '평균 응답시간',
      value: '2.3시간',
      change: '-15%',
      trend: 'down',
      icon: <ClockIcon width={24} height={24} />,
      color: 'orange',
    },
  ];

  const periods = [
    { value: 'week', label: '이번 주' },
    { value: 'month', label: '이번 달' },
    { value: 'quarter', label: '이번 분기' },
    { value: 'year', label: '올해' },
  ];

  const chartTypes = [
    { value: 'all', label: '전체', icon: <MixIcon width={16} height={16} /> },
    {
      value: 'bar',
      label: '막대',
      icon: <BarChartIcon width={16} height={16} />,
    },
    {
      value: 'line',
      label: '선형',
      icon: <ActivityLogIcon width={16} height={16} />,
    },
    {
      value: 'pie',
      label: '원형',
      icon: <PieChartIcon width={16} height={16} />,
    },
  ];

  return (
    <div className="reports">
      {/* 리포트 헤더 */}
      <div className="reports-header">
        <div className="header-content">
          <div>
            <h1 className="reports-title">리포트 & 분석</h1>
            <p className="reports-subtitle">
              비즈니스 성과를 한눈에 확인하세요 📊
            </p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary">
              <DownloadIcon width={16} height={16} />
              리포트 다운로드
            </button>
          </div>
        </div>
      </div>

      {/* 필터 및 제어 */}
      <div className="reports-controls">
        <div className="period-selector">
          <CalendarIcon width={18} height={18} />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="control-select"
          >
            {periods.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </div>

        <div className="chart-type-selector">
          {chartTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedChart(type.value)}
              className={`chart-type-btn ${selectedChart === type.value ? 'active' : ''}`}
            >
              {type.icon}
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* 성과 지표 카드 */}
      <div className="metrics-grid">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className={`metric-card ${metric.color}`}>
            <div className="metric-header">
              <div className="metric-icon">{metric.icon}</div>
              <div className={`metric-trend ${metric.trend}`}>
                <span>{metric.change}</span>
              </div>
            </div>
            <div className="metric-content">
              <h3 className="metric-title">{metric.title}</h3>
              <p className="metric-value">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 차트 그리드 */}
      <div className="charts-grid">
        {/* 매출 분석 차트 */}
        {(selectedChart === 'all' || selectedChart === 'bar') && (
          <div className="chart-card large">
            <div className="chart-header">
              <h3>월별 매출 분석</h3>
              <div className="chart-legend">
                <span className="legend-item">
                  <span
                    className="legend-color"
                    style={{ backgroundColor: '#3b82f6' }}
                  ></span>
                  실제 매출
                </span>
                <span className="legend-item">
                  <span
                    className="legend-color"
                    style={{ backgroundColor: '#10b981' }}
                  ></span>
                  목표 매출
                </span>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Bar dataKey="매출" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="목표" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 고객 분포 원형 차트 */}
        {(selectedChart === 'all' || selectedChart === 'pie') && (
          <div className="chart-card">
            <div className="chart-header">
              <h3>고객 분포</h3>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={customerData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
                    }
                  >
                    {customerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 일별 활동 라인 차트 */}
        {(selectedChart === 'all' || selectedChart === 'line') && (
          <div className="chart-card">
            <div className="chart-header">
              <h3>주간 활동 현황</h3>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="방문"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="상담"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="계약"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 고객 수 증가 추이 */}
        {selectedChart === 'all' && (
          <div className="chart-card large">
            <div className="chart-header">
              <h3>고객 수 증가 추이</h3>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient
                      id="colorCustomers"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="고객수"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorCustomers)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
