import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - 페이지를 찾을 수 없습니다</h1>
      <p>요청하신 페이지가 존재하지 않습니다.</p>
      <Link to={ROUTES.DASHBOARD} className="back-link">
        대시보드로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
