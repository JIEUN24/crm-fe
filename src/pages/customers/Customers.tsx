import React, { useState } from 'react';

import CustomDialog from '@/components/ui/Dialog';

const Customers = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="customers">
      <h1>고객 관리</h1>
      <div className="customers-content">
        <div className="customers-header">
          <CustomDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            title="새 고객 추가"
            trigger={<button className="btn-primary">새 고객 추가</button>}
          >
            <form>
              <div className="form-group">
                <label>고객명</label>
                <input type="text" placeholder="고객명을 입력하세요" />
              </div>
              <div className="form-group">
                <label>이메일</label>
                <input type="email" placeholder="이메일을 입력하세요" />
              </div>
              <div className="form-group">
                <label>전화번호</label>
                <input type="tel" placeholder="전화번호를 입력하세요" />
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'flex-end',
                }}
              >
                <button type="button" onClick={() => setIsDialogOpen(false)}>
                  취소
                </button>
                <button type="submit" className="btn-primary">
                  저장
                </button>
              </div>
            </form>
          </CustomDialog>
        </div>
        <div className="customers-list">
          <p>고객 목록이 여기에 표시됩니다.</p>
          <div style={{ marginTop: '20px' }}>
            <div
              style={{
                background: 'white',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
            >
              <strong>김철수</strong> - kim@example.com - 010-1234-5678
            </div>
            <div
              style={{
                background: 'white',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
            >
              <strong>이영희</strong> - lee@example.com - 010-9876-5432
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
