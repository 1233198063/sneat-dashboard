import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, Menu, ChevronRight, Settings, Moon, ChevronDown, User, Mail, MessageCircle, DollarSign, HelpCircle, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import './Header.less';

const Header = () => {
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // 用户信息 - 您可以从context或props中获取
  const user = {
    name: 'Jone Doe',
    role: 'Admin',
    avatar: '/images/avatars/avatar-girl.jpg', // 使用您上传的头像
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // 获取用户名首字母
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // 头像组件
  const Avatar = ({ className = '' }) => (
    <div className={`user-avatar ${className}`}>
      {user.avatar ? (
        <img src={user.avatar} alt={user.name} className="avatar-image" />
      ) : (
        getInitials(user.name)
      )}
      <div className="online-status"></div>
    </div>
  );

  const getBreadcrumb = () => {
    const path = location.pathname;
    switch(path) {
      case '/':
      case '/dashboard':
        return [{ label: 'Dashboards', active: false }, { label: 'Analytics', active: true }];
      case '/analytics':
        return [{ label: 'Apps & Pages', active: false }, { label: 'Analytics', active: true }];
      case '/reports':
        return [{ label: 'Apps & Pages', active: false }, { label: 'Reports', active: true }];
      case '/settings':
        return [{ label: 'Apps & Pages', active: false }, { label: 'Settings', active: true }];
      default:
        return [{ label: 'Dashboard', active: true }];
    }
  };

  return (
    <div className="header">
      <div className="header-search">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder="Search (Ctrl+/)"
          className="search-input"
        />
      </div>
      
      <div className="header-actions">
        <button className="action-button">
          <Settings size={20} />
        </button>
        
        <button className="action-button">
          <Moon size={20} />
        </button>
        
        <button className="action-button">
          <Bell size={20} />
          <div className="notification-badge"></div>
        </button>
        
        <div className="user-menu" ref={userMenuRef}>
          <div 
            className="user-menu-trigger"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <Avatar />
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-role">{user.role}</div>
            </div>
            <ChevronDown className="dropdown-icon" size={16} />
          </div>
          
          {isUserMenuOpen && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <Avatar />
                <div className="user-details">
                  <div className="user-name">{user.name}</div>
                  <div className="user-role">{user.role}</div>
                </div>
              </div>
              
              <div className="dropdown-divider"></div>
              
              <div className="dropdown-menu">
                <a href="#" className="dropdown-item">
                  <User size={16} />
                  <span>Profile</span>
                </a>
                <a href="#" className="dropdown-item">
                  <Mail size={16} />
                  <span>Inbox</span>
                </a>
                <a href="#" className="dropdown-item">
                  <MessageCircle size={16} />
                  <span>Chat</span>
                </a>
              </div>
              
              <div className="dropdown-divider"></div>
              
              <div className="dropdown-menu">
                <a href="#" className="dropdown-item">
                  <Settings size={16} />
                  <span>Settings</span>
                </a>
                <a href="#" className="dropdown-item">
                  <DollarSign size={16} />
                  <span>Pricing</span>
                </a>
                <a href="#" className="dropdown-item">
                  <HelpCircle size={16} />
                  <span>FAQ</span>
                </a>
              </div>
              
              <div className="dropdown-divider"></div>
              
              <div className="dropdown-menu">
                <a href="#" className="dropdown-item logout">
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;