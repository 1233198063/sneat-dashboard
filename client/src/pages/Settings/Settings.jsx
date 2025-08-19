import React from 'react';
import FixedButtons from '../../components/ui/FixedButtons/FixedButtons';
import './Settings.less';

const Settings = () => {
  return (
    <div className="settings">
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title">Settings</h1>
            <p className="page-subtitle">Manage your application settings</p>
          </div>
        </div>
      </div>

      <div className="settings-content">
        <p>Settings page content will be added here.</p>
      </div>
      
      <FixedButtons />
    </div>
  );
};

export default Settings;