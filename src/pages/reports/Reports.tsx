import React from 'react';

const Reports = () => {
  return (
    <div className="reports">
      <h1>리포트</h1>
      <div className="reports-content">
        <div className="report-filters">
          <select className="filter-select">
            <option>이번 주</option>
            <option>이번 달</option>
            <option>이번 분기</option>
          </select>
        </div>
        <div className="reports-grid">
          <p>리포트 차트와 데이터가 여기에 표시됩니다.</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
