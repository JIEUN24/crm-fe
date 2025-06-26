import React from 'react';

import { useAppStore } from '@/store';

const Settings = () => {
  const { theme, setTheme } = useAppStore();

  return (
    <div className="settings">
      <h1>설정</h1>
      <div className="settings-content">
        <div className="setting-group">
          <h3>테마 설정</h3>
          <div className="theme-options">
            <label>
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === 'light'}
                onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
              />
              라이트 모드
            </label>
            <label>
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
              />
              다크 모드
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
