import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, Menu, ChevronRight, Settings, Moon, ChevronDown, User, Mail, MessageCircle, DollarSign, HelpCircle, LogOut, BarChart3, Users, ShoppingCart, Calendar, FileText, Palette, Layout, Type, Square, Circle, CreditCard, List, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import './Header.less';

const Header = () => {
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);

  // 用户信息 - 您可以从context或props中获取
  const user = {
    name: 'Jone Doe',
    role: 'Admin',
    avatar: '/images/avatars/avatar-girl.jpg', // 使用您上传的头像
  };

  // Search panel data
  const searchData = {
    popularSearches: [
      { icon: BarChart3, label: 'Analytics', url: '/analytics' },
      { icon: Users, label: 'CRM', url: '/crm' },
      { icon: ShoppingCart, label: 'eCommerce', url: '/ecommerce' },
      { icon: Users, label: 'User List', url: '/users' }
    ],
    appsPages: [
      { icon: Calendar, label: 'Calendar', url: '/calendar' },
      { icon: FileText, label: 'Invoice List', url: '/invoices' },
      { icon: DollarSign, label: 'Pricing', url: '/pricing' },
      { icon: Settings, label: 'Account Settings', url: '/settings' }
    ],
    userInterface: [
      { icon: Type, label: 'Typography', url: '/ui/typography' },
      { icon: Square, label: 'Tabs', url: '/ui/tabs' },
      { icon: Circle, label: 'Buttons', url: '/ui/buttons' },
      { icon: Layout, label: 'Advanced Cards', url: '/ui/cards' }
    ],
    formsTables: [
      { icon: List, label: 'Select', url: '/forms/select' },
      { icon: Square, label: 'Autocomplete', url: '/forms/autocomplete' },
      { icon: FileText, label: 'Table', url: '/tables' },
      { icon: Calendar, label: 'Date Pickers', url: '/forms/datepickers' }
    ]
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
      if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
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
      <div className="header-search" ref={searchRef}>
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder="Search (Ctrl+/)"
          className="search-input"
          onFocus={() => setIsSearchOpen(true)}
          readOnly
        />
        
        {isSearchOpen && (
          <>
            <div className="search-backdrop" onClick={() => setIsSearchOpen(false)}></div>
            <div className="search-dropdown">
              <div className="search-modal-header">
                <div className="search-input-container">
                <Search className="search-modal-icon" size={20} />
                <input 
                  type="text" 
                  placeholder="Search..."
                  className="search-modal-input"
                  autoFocus
                />
                <div className="search-hint">[esc]</div>
                <button 
                  className="search-close"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X size={16} />
                </button>
                </div>
              </div>
            
            <div className="search-content">
              <div className="search-sections">
                <div className="search-section">
                  <h4 className="search-section-title">POPULAR SEARCHES</h4>
                  <div className="search-items">
                    {searchData.popularSearches.map((item, index) => (
                      <a key={index} href={item.url} className="search-item">
                        <item.icon size={16} />
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="search-section">
                  <h4 className="search-section-title">APPS & PAGES</h4>
                  <div className="search-items">
                    {searchData.appsPages.map((item, index) => (
                      <a key={index} href={item.url} className="search-item">
                        <item.icon size={16} />
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="search-sections">
                <div className="search-section">
                  <h4 className="search-section-title">USER INTERFACE</h4>
                  <div className="search-items">
                    {searchData.userInterface.map((item, index) => (
                      <a key={index} href={item.url} className="search-item">
                        <item.icon size={16} />
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="search-section">
                  <h4 className="search-section-title">FORMS & TABLES</h4>
                  <div className="search-items">
                    {searchData.formsTables.map((item, index) => (
                      <a key={index} href={item.url} className="search-item">
                        <item.icon size={16} />
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            </div>
          </>
        )}
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