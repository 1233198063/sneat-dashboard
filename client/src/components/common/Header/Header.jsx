import React, { useState, useRef, useEffect } from 'react';
import {
  Bell, Search, Settings, Moon, ChevronDown, User, Mail, MessageCircle,
  DollarSign, HelpCircle, LogOut, BarChart3, Users, ShoppingCart, Calendar,
  FileText, Layout, Type, Square, Circle, List, X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.less';

const Header = () => {
  const navigate = useNavigate();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);

  const user = {
    name: 'Jone Doe',
    role: 'Admin',
    avatar: '/images/avatars/avatar-girl.jpg',
  };

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
      if (event.key === 'Escape') setIsSearchOpen(false);
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

  const getInitials = (name) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase();

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

  const handleSignOut = () => {
    // TODO: clear session / tokens as needed
    setIsUserMenuOpen(false);
    navigate('/login');
  };

  return (
    <div className="header">
      {/* Search */}
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
                    aria-label="Close search"
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
                        <Link key={index} to={item.url} className="search-item" onClick={() => setIsSearchOpen(false)}>
                          <item.icon size={16} />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="search-section">
                    <h4 className="search-section-title">APPS & PAGES</h4>
                    <div className="search-items">
                      {searchData.appsPages.map((item, index) => (
                        <Link key={index} to={item.url} className="search-item" onClick={() => setIsSearchOpen(false)}>
                          <item.icon size={16} />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="search-sections">
                  <div className="search-section">
                    <h4 className="search-section-title">USER INTERFACE</h4>
                    <div className="search-items">
                      {searchData.userInterface.map((item, index) => (
                        <Link key={index} to={item.url} className="search-item" onClick={() => setIsSearchOpen(false)}>
                          <item.icon size={16} />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="search-section">
                    <h4 className="search-section-title">FORMS & TABLES</h4>
                    <div className="search-items">
                      {searchData.formsTables.map((item, index) => (
                        <Link key={index} to={item.url} className="search-item" onClick={() => setIsSearchOpen(false)}>
                          <item.icon size={16} />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Actions + User */}
      <div className="header-actions">
        <button className="action-button" aria-label="Settings">
          <Settings size={20} />
        </button>

        <button className="action-button" aria-label="Toggle dark mode">
          <Moon size={20} />
        </button>

        <button className="action-button" aria-label="Notifications">
          <Bell size={20} />
          <div className="notification-badge"></div>
        </button>

        <div className="user-menu" ref={userMenuRef}>
          <button
            className="user-menu-trigger"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            aria-haspopup="menu"
            aria-expanded={isUserMenuOpen}
            type="button"
          >
            <Avatar />
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-role">{user.role}</div>
            </div>
            <ChevronDown className="dropdown-icon" size={16} />
          </button>

          {isUserMenuOpen && (
            <div className="user-dropdown" role="menu">
              <div className="dropdown-header">
                <Avatar />
                <div className="user-details">
                  <div className="user-name">{user.name}</div>
                  <div className="user-role">{user.role}</div>
                </div>
              </div>

              <div className="dropdown-divider"></div>

              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                  <User size={16} />
                  <span>Profile</span>
                </Link>
                <Link to="/inbox" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                  <Mail size={16} />
                  <span>Inbox</span>
                </Link>
                <Link to="/chat" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                  <MessageCircle size={16} />
                  <span>Chat</span>
                </Link>
              </div>

              <div className="dropdown-divider"></div>

              <div className="dropdown-menu">
                <Link to="/settings" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>
                <Link to="/pricing" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                  <DollarSign size={16} />
                  <span>Pricing</span>
                </Link>
                <Link to="/faq" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                  <HelpCircle size={16} />
                  <span>FAQ</span>
                </Link>
              </div>

              <div className="dropdown-divider"></div>

              <div className="dropdown-menu">
                <button type="button" className="dropdown-item logout" onClick={handleSignOut}>
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
