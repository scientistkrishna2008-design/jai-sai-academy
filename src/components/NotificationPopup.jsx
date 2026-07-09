import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { X, Bell, Calendar, Award } from 'lucide-react';

export default function NotificationPopup() {
  const { data } = useContext(DataContext);
  const { popupNotice } = data;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (popupNotice.enabled) {
      // Delay popup by 2 seconds for a premium feel
      const timer = setTimeout(() => {
        // Only show if not explicitly dismissed in this session
        const dismissed = sessionStorage.getItem('popup_dismissed');
        if (!dismissed) {
          setVisible(true);
        }
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [popupNotice.enabled, popupNotice.title]);

  const dismissPopup = () => {
    setVisible(false);
    sessionStorage.setItem('popup_dismissed', 'true');
  };

  if (!visible) return null;

  const getNoticeIcon = () => {
    switch (popupNotice.type) {
      case 'Exam': return <Calendar size={16} className="text-secondary" />;
      case 'Holiday': return <Bell size={16} style={{ color: 'hsl(var(--error))' }} />;
      case 'Admission': return <Award size={16} style={{ color: 'hsl(var(--success))' }} />;
      default: return <Bell size={16} style={{ color: 'hsl(var(--primary))' }} />;
    }
  };

  return (
    <div className="notice-popup card glass">
      <div className="notice-header">
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {getNoticeIcon()}
          <span className="notice-badge">{popupNotice.type} NOTICE</span>
        </div>
        <button onClick={dismissPopup} className="notice-close" title="Dismiss">
          <X size={16} />
        </button>
      </div>
      <div className="notice-body">
        <h4 className="notice-title">{popupNotice.title}</h4>
        <p className="notice-msg">{popupNotice.message}</p>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#contact" className="btn btn-primary" onClick={dismissPopup} style={{ padding: '0.3rem 0.8rem', fontSize: '0.75rem', borderRadius: '4px' }}>
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
