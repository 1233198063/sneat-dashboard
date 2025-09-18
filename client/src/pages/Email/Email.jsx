import React, { useState, useEffect } from 'react';
import {
  Mail, Search, Star, Archive, Trash2, Send,
  MoreHorizontal, ChevronDown, Plus, Paperclip,
  Reply, ReplyAll, Forward, Flag, Loader
} from 'lucide-react';
import Card from '../../components/ui/Card/Card';
import { emailAPI } from '../../services/api';
import './Email.less';

const Email = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const folders = [
    { id: 'inbox', name: 'Inbox', count: 0 },
    { id: 'sent', name: 'Sent', count: 0 },
    { id: 'draft', name: 'Draft', count: 0 },
    { id: 'starred', name: 'Starred', count: 0 },
    { id: 'spam', name: 'Spam', count: 0 },
    { id: 'trash', name: 'Trash', count: 0 }
  ];

  const labels = [
    { id: 'personal', name: 'Personal', color: '#28a745' },
    { id: 'company', name: 'Company', color: '#007bff' },
    { id: 'important', name: 'Important', color: '#ffc107' },
    { id: 'private', name: 'Private', color: '#dc3545' }
  ];

  // Fetch emails from MySQL database
  const fetchEmails = async (page = 1, status = null) => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page,
        limit: pagination.limit
      };

      if (status) {
        params.status = status;
      }

      const response = await emailAPI.getEmails(params);

      if (response.data.success) {
        setEmails(response.data.data);
        setPagination(response.data.pagination);
      } else {
        setError('Failed to fetch emails');
      }
    } catch (err) {
      console.error('Error fetching emails:', err);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Load emails when component mounts
  useEffect(() => {
    fetchEmails();
  }, []);

  // Reload emails when folder changes
  useEffect(() => {
    const statusMapping = {
      'inbox': 'pending',
      'sent': 'sent',
      'draft': null,
      'starred': null,
      'spam': 'failed',
      'trash': null
    };

    fetchEmails(1, statusMapping[selectedFolder]);
  }, [selectedFolder]);

  // Format timestamp for display
  const formatTime = (timestamp) => {
    if (!timestamp) return '';

    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  // Get default avatar if avatar is not provided
  const getAvatar = (avatar, name) => {
    if (avatar && avatar.startsWith('http')) {
      return avatar;
    }

    // Generate a simple avatar based on the first letter of the name
    const initial = name ? name.charAt(0).toUpperCase() : '?';
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    const colorIndex = name ? name.charCodeAt(0) % colors.length : 0;

    return `data:image/svg+xml,${encodeURIComponent(`
      <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="${colors[colorIndex]}"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-size="16" font-family="Arial">${initial}</text>
      </svg>
    `)}`;
  };

  // Handle email click
  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  // Handle star toggle
  const handleStarToggle = async (emailId, currentStarred) => {
    try {
      // This would typically update the starred status in the database
      // For now, we'll just update the local state
      setEmails(emails.map(email =>
        email.id === emailId
          ? { ...email, starred: !currentStarred }
          : email
      ));
    } catch (err) {
      console.error('Error toggling star:', err);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchEmails(newPage);
    }
  };

  return (
    <div className="email-page">
      {/* Email Sidebar */}
      <div className="email-sidebar">
        <div className="compose-section">
          <button className="compose-btn">
            <Plus size={20} />
            COMPOSE
          </button>
        </div>

        <div className="search-section">
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search mail"
              className="search-input"
            />
          </div>
        </div>

        <div className="folders-section">
          {folders.map(folder => (
            <div
              key={folder.id}
              className={`folder-item ${selectedFolder === folder.id ? 'active' : ''}`}
              onClick={() => setSelectedFolder(folder.id)}
            >
              <div className="folder-icon">
                {folder.id === 'inbox' && <Mail size={20} />}
                {folder.id === 'sent' && <Send size={20} />}
                {folder.id === 'draft' && <Mail size={20} />}
                {folder.id === 'starred' && <Star size={20} />}
                {folder.id === 'spam' && <Mail size={20} />}
                {folder.id === 'trash' && <Trash2 size={20} />}
              </div>
              <span className="folder-name">{folder.name}</span>
              {folder.count > 0 && (
                <span className="folder-count">{folder.count}</span>
              )}
            </div>
          ))}
        </div>

        <div className="labels-section">
          <div className="section-header">
            <span className="section-title">LABELS</span>
          </div>
          {labels.map(label => (
            <div key={label.id} className="label-item">
              <div
                className="label-color"
                style={{ backgroundColor: label.color }}
              ></div>
              <span className="label-name">{label.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Email Content Area */}
      <div className="email-content">
        {/* Email Header */}
        <div className="email-header">
          <div className="email-actions">
            <input type="checkbox" className="select-all-checkbox" />
            <ChevronDown size={16} className="dropdown-icon" />
            <div className="action-buttons">
              <button className="action-btn">
                <Archive size={16} />
              </button>
              <button className="action-btn">
                <Trash2 size={16} />
              </button>
              <button className="action-btn">
                <Mail size={16} />
              </button>
            </div>
          </div>
          <div className="email-settings">
            <button
              className="settings-btn"
              onClick={() => fetchEmails(pagination.page)}
              disabled={loading}
            >
              {loading ? <Loader size={20} className="spin" /> : <MoreHorizontal size={20} />}
            </button>
          </div>
        </div>

        {/* Email List */}
        <div className="email-list">
          {loading && emails.length === 0 ? (
            <div className="loading-container">
              <Loader size={24} className="spin" />
              <span>Loading emails...</span>
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">{error}</p>
              <button
                className="retry-btn"
                onClick={() => fetchEmails()}
              >
                Retry
              </button>
            </div>
          ) : emails.length === 0 ? (
            <div className="empty-container">
              <Mail size={48} className="empty-icon" />
              <p>No emails found</p>
            </div>
          ) : (
            emails.map(email => (
              <div
                key={email.id}
                className={`email-item ${email.status === 'pending' ? 'unread' : ''}`}
                onClick={() => handleEmailClick(email)}
              >
                <div className="email-select">
                  <input type="checkbox" />
                </div>

                <div
                  className="email-star"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStarToggle(email.id, email.starred);
                  }}
                >
                  <Star
                    size={16}
                    fill={email.starred ? '#FFD700' : 'none'}
                    stroke={email.starred ? '#FFD700' : '#ccc'}
                  />
                </div>

                <div className="email-sender">
                  <img
                    src={getAvatar(email.avatar, email.name)}
                    alt={email.name}
                    className="sender-avatar"
                    onError={(e) => {
                      e.target.src = getAvatar(null, email.name);
                    }}
                  />
                  <span className="sender-name">{email.name}</span>
                </div>

                <div className="email-content-preview">
                  <div className="email-subject-line">
                    <span className="email-subject">{email.subject || 'No Subject'}</span>
                    {email.status === 'failed' && (
                      <Flag size={14} className="important-flag" fill="#dc3545" stroke="#dc3545" />
                    )}
                  </div>
                  <div className="email-preview">
                    {email.message || 'No content available'}
                  </div>
                </div>

                <div className="email-meta">
                  <div className="email-indicators">
                    {email.status === 'pending' && <div className="unread-indicator blue"></div>}
                    {email.status === 'failed' && <div className="unread-indicator red"></div>}
                  </div>
                  <span className="email-time">
                    {formatTime(email.createdAt)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="email-pagination">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              Previous
            </button>

            <span className="pagination-info">
              Page {pagination.page} of {pagination.totalPages}
              ({pagination.total} total)
            </span>

            <button
              className="pagination-btn"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Email;