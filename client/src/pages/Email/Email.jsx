import React, { useState } from 'react';
import { 
  Mail, Search, Star, Archive, Trash2, Send, 
  MoreHorizontal, ChevronDown, Plus, Paperclip,
  Reply, ReplyAll, Forward, Flag
} from 'lucide-react';
import Card from '../../components/ui/Card/Card';
import './Email.less';

const Email = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState('inbox');

  const folders = [
    { id: 'inbox', name: 'Inbox', count: 1 },
    { id: 'sent', name: 'Sent', count: 0 },
    { id: 'draft', name: 'Draft', count: 4 },
    { id: 'starred', name: 'Starred', count: 0 },
    { id: 'spam', name: 'Spam', count: 2 },
    { id: 'trash', name: 'Trash', count: 0 }
  ];

  const labels = [
    { id: 'personal', name: 'Personal', color: '#28a745' },
    { id: 'company', name: 'Company', color: '#007bff' },
    { id: 'important', name: 'Important', color: '#ffc107' },
    { id: 'private', name: 'Private', color: '#dc3545' }
  ];

  const emails = [
    {
      id: 1,
      sender: 'Tommy Sicilia',
      subject: 'How to Succeed with Your Shopify Store',
      preview: 'Effective strategies to grow your e-commerce business...',
      time: '11:46 PM',
      unread: true,
      starred: false,
      important: true,
      avatar: '/images/avatars/Unsplash-Avatars_0004s_0007_nathan-dumlao-Ju--S80ezyU-unsplash.png'
    },
    {
      id: 2,
      sender: 'Tressa Gass',
      subject: 'Please find attached the latest Company Report',
      preview: 'Hi team, I have attached the quarterly report for review...',
      time: '11:55 PM',
      unread: true,
      starred: true,
      important: false,
      avatar: '/images/avatars/Unsplash-Avatars_0001s_0008_aiony-haust-soK2Bdjzrng-unsplash.png'
    },
    {
      id: 3,
      sender: 'Louetta Esses',
      subject: 'Update Can Change Your Personal Life',
      preview: 'Personal development tips and life-changing advice...',
      time: '01:04 AM',
      unread: false,
      starred: false,
      important: false,
      avatar: '/images/avatars/Unsplash-Avatars_0004s_0028_toa-heftiba-O3ymvT7Wf9U-unsplash.png'
    },
    {
      id: 4,
      sender: 'Waldemar Mannering',
      subject: 'Refer friends. Get rewards.',
      preview: 'Join our referral program and earn amazing rewards...',
      time: '03:02 AM',
      unread: true,
      starred: false,
      important: false,
      avatar: '/images/avatars/Unsplash-Avatars_0005s_0007_emile-guillemot-vfijBqzoQE0-unsplash.png'
    },
    {
      id: 5,
      sender: 'Eb Begg',
      subject: 'App Update',
      preview: 'New features and improvements are now available...',
      time: '03:12 PM',
      unread: false,
      starred: false,
      important: false,
      avatar: '/images/avatars/Unsplash-Avatars_0004s_0004_nathan-dumlao-iKwCVH4cyjQ-unsplash.png'
    },
    {
      id: 6,
      sender: 'Modestine Spat',
      subject: 'Password Reset',
      preview: 'You requested a password reset for your account...',
      time: '04:25 AM',
      unread: false,
      starred: false,
      important: false,
      avatar: '/images/avatars/Unsplash-Avatars_0000s_0035_azamat-zhanisov-a5sRFieA3BY-unsplash 1.png'
    },
    {
      id: 7,
      sender: 'Ardis Balderson',
      subject: 'Bank transfer initiated.',
      preview: 'Your bank transfer has been successfully initiated...',
      time: '04:58 AM',
      unread: false,
      starred: true,
      important: false,
      avatar: '/images/avatars/Unsplash-Avatars_0004s_0015_ali-pazani-_AIaWSaSTVI-unsplash.png'
    },
    {
      id: 8,
      sender: 'Dalila Ouldcott',
      subject: 'Order Feedback',
      preview: 'We would love to hear your feedback about your recent order...',
      time: '11:28 AM',
      unread: false,
      starred: false,
      important: false,
      avatar: '/images/avatars/Unsplash-Avatars_0005s_0000_stefan-stefancik-aoB1B2kkyIw-unsplash.png'
    }
  ];

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
            <button className="settings-btn">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Email List */}
        <div className="email-list">
          {emails.map(email => (
            <div key={email.id} className={`email-item ${email.unread ? 'unread' : ''}`}>
              <div className="email-select">
                <input type="checkbox" />
              </div>
              
              <div className="email-star">
                <Star 
                  size={16} 
                  fill={email.starred ? '#FFD700' : 'none'}
                  stroke={email.starred ? '#FFD700' : '#ccc'}
                />
              </div>

              <div className="email-sender">
                <img 
                  src={email.avatar} 
                  alt={email.sender}
                  className="sender-avatar"
                />
                <span className="sender-name">{email.sender}</span>
              </div>

              <div className="email-content-preview">
                <div className="email-subject-line">
                  <span className="email-subject">{email.subject}</span>
                  {email.important && (
                    <Flag size={14} className="important-flag" fill="#dc3545" stroke="#dc3545" />
                  )}
                </div>
                <div className="email-preview">{email.preview}</div>
              </div>

              <div className="email-meta">
                <div className="email-indicators">
                  {email.unread && <div className="unread-indicator blue"></div>}
                  {email.important && <div className="unread-indicator red"></div>}
                </div>
                <span className="email-time">{email.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Email;