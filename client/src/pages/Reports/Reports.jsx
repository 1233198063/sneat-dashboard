import React from 'react';
import FixedButtons from '../../components/ui/FixedButtons/FixedButtons';
import './Reports.less';

const Reports = () => {
  return (
    <div className="reports">
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title">Reports</h1>
            <p className="page-subtitle">Generate and view detailed reports</p>
          </div>
        </div>
      </div>

      <div className="reports-content">
        <p>Reports page content will be added here.</p>
      </div>
      
      <FixedButtons />
    </div>
  );
};

export default Reports;