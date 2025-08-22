import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import CRM from './pages/CRM/CRM';
import ECommerce from './pages/eCommerce/eCommerce';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';
import BasicCards from './pages/Cards/BasicCards';
import ThemeCustomizer from './components/ui/ThemeCustomizer/ThemeCustomizer';
import './App.less';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/ecommerce" element={<ECommerce />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/cards/basic" element={<BasicCards />} />
          </Routes>
        </Layout>
        {/* Global Theme Customizer - appears on all pages */}
        <ThemeCustomizer />
      </div>
    </Router>
  );
}

export default App;