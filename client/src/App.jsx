import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import CRM from './pages/CRM/CRM';
import Analytics from './pages/Analytics/Analytics';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';
import BasicCards from './pages/Cards/BasicCards';
import './App.less';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Analytics />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/cards/basic" element={<BasicCards />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;