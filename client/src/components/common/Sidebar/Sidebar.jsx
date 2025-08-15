import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Mail, MessageSquare, Calendar, FileText, 
  User, Shield, Folder, Lock, BookOpen, ExternalLink,
  Type, Crown, TestTube, ChevronRight, ChevronDown,
  CreditCard, Package, Grid3X3, Layers, CheckSquare,
  Smartphone, Table, BarChart3, ShieldCheck, MoreHorizontal
} from 'lucide-react';
import './Sidebar.less';

const Sidebar = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({
    '/dashboard': true // 默认展开 Dashboards
  });

  const toggleSubmenu = (path) => {
    setExpandedMenus(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const navSections = [
    {
      title: '',
      items: [
        { 
          path: '/dashboard', 
          icon: Home, 
          label: 'Dashboards', 
          badge: 'New', 
          hasSubmenu: true,
          submenu: [
            { path: '/', label: 'Analytics' },
            { path: '/crm', label: 'CRM' },
            { path: '/ecommerce', label: 'eCommerce' }
          ]
        }
      ]
    },
    {
      title: 'APPS & PAGES',  
      items: [
        { path: '/email', icon: Mail, label: 'Email' },
        { path: '/chat', icon: MessageSquare, label: 'Chat' },
        { path: '/calendar', icon: Calendar, label: 'Calendar' },
        { path: '/invoice', icon: FileText, label: 'Invoice', hasSubmenu: true },
        { path: '/user', icon: User, label: 'User', hasSubmenu: true },
        { path: '/roles', icon: Shield, label: 'Roles & Permissions', hasSubmenu: true },
        { path: '/pages', icon: Folder, label: 'Pages', hasSubmenu: true },
        { path: '/auth', icon: Lock, label: 'Auth Pages', hasSubmenu: true },
        { path: '/wizard', icon: BookOpen, label: 'Wizard Examples', hasSubmenu: true },
        { path: '/dialog', icon: ExternalLink, label: 'Dialog Examples' }
      ]
    },
    {
      title: 'USER INTERFACE',
      items: [
        { path: '/typography', icon: Type, label: 'Typography' },
        { path: '/icons', icon: Crown, label: 'Icons' },
        { path: '/icons-test', icon: TestTube, label: 'Icons Test' },
        { 
          path: '/cards', 
          icon: CreditCard, 
          label: 'Cards', 
          hasSubmenu: true,
          submenu: [
            { path: '/cards/basic', label: 'Basic', hasIcon: true },
            { path: '/cards/advanced', label: 'Advanced' },
            { path: '/cards/statistics', label: 'Statistics' },
            { path: '/cards/widgets', label: 'Widgets' },
            { path: '/cards/gamification', label: 'Gamification' },
            { path: '/cards/actions', label: 'Actions' }
          ]
        },
        { path: '/components', icon: Package, label: 'Components', badge: '19', hasSubmenu: true }
      ]
    },
    {
      title: 'FORMS & TABLES',
      items: [
        { path: '/form-elements', icon: Grid3X3, label: 'Form Elements', hasSubmenu: true },
        { path: '/form-layouts', icon: Layers, label: 'Form Layouts' },
        { path: '/form-validation', icon: CheckSquare, label: 'Form Validation' },
        { path: '/form-wizard', icon: Smartphone, label: 'Form Wizard' },
        { path: '/table', icon: Table, label: 'Table' },
        { path: '/mui-datagrid', icon: Table, label: 'Mui DataGrid' }
      ]
    },
    {
      title: 'CHARTS & MISC',
      items: [
        { path: '/charts', icon: BarChart3, label: 'Charts', hasSubmenu: true },
        { path: '/access-control', icon: ShieldCheck, label: 'Access Control' },
        { path: '/others', icon: MoreHorizontal, label: 'Others', hasSubmenu: true }
      ]
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="logo">
          <div className="logo-icon">S</div>
          <div className="logo-text">Sneat</div>
        </Link>
      </div>
      
      <nav className="sidebar-nav">
        {navSections.map((section, index) => (
          <div key={index} className="nav-section">
            {section.title && <div className="section-title">{section.title}</div>}
            {section.items.map(({ path, icon: Icon, label, badge, hasSubmenu, submenu }) => (
              <div key={path} className="nav-item-container">
                {hasSubmenu ? (
                  <div
                    className={`nav-item ${expandedMenus[path] ? 'expanded' : ''} ${location.pathname === path || (path === '/dashboard' && location.pathname === '/') ? 'active' : ''}`}
                    onClick={() => toggleSubmenu(path)}
                  >
                    <Icon className="nav-icon" size={20} />
                    <span className="nav-text">{label}</span>
                    {badge && <span className={`nav-badge ${badge === 'New' ? 'new-badge' : ''}`}>{badge}</span>}
                    {expandedMenus[path] ? (
                      <ChevronDown className="nav-arrow" size={16} />
                    ) : (
                      <ChevronRight className="nav-arrow" size={16} />
                    )}
                  </div>
                ) : (
                  <Link
                    to={path}
                    className={`nav-item ${location.pathname === path || (path === '/dashboard' && location.pathname === '/') ? 'active' : ''}`}
                  >
                    <Icon className="nav-icon" size={20} />
                    <span className="nav-text">{label}</span>
                    {badge && <span className={`nav-badge ${badge === 'New' ? 'new-badge' : ''}`}>{badge}</span>}
                  </Link>
                )}
                
                {submenu && expandedMenus[path] && (
                  <div className="submenu">
                    {submenu.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`submenu-item ${location.pathname === subItem.path || (location.pathname === '/' && subItem.path === '/') ? 'active' : ''}`}
                      >
                        <span className="submenu-text">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </nav>

    </div>
  );
};

export default Sidebar;