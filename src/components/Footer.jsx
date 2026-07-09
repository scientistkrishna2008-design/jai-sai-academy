import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Phone, Mail, MapPin, GraduationCap } from 'lucide-react';

export default function Footer() {
  const { data } = useContext(DataContext);
  const { contact } = data;

  const quickLinks = [
    { label: 'Home', path: '#home' },
    { label: 'Programs Offered', path: '#programs' },
    { label: 'Skill Development', path: '#skills' },
    { label: 'Our Faculty', path: '#faculty' }
  ];

  const secondaryLinks = [
    { label: 'Achievements', path: '#achievements' },
    { label: 'Our Achievers', path: '#achievers' },
    { label: 'Gallery', path: '#gallery' },
    { label: 'Contact Us', path: '#contact' }
  ];

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'facebook': return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
      case 'instagram': return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
      case 'youtube': return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12.5a29 29 0 0 0 .46 6.08 2.78 2.78 0 0 0 1.95 1.96C5.12 21 12 21 12 21s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12.5a29 29 0 0 0-.46-6.08z"/><polygon points="9.75 15.02 15.5 12.5 9.75 9.98 9.75 15.02"/></svg>;
      case 'twitter': return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
      default: return null;
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <a href="#home" className="logo-link" style={{ marginBottom: '0.5rem' }}>
              <img src="/logo.png" alt="Jai Sai Academy Logo" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'contain', background: '#fff', border: '1px solid hsl(var(--card-border))' }} />
              <span>Jai Sai Academy</span>
            </a>
            <p>
              Dedicated to offering Premium Tuition, Creative Skill training at an affordable cost. Fostering excellence for over 25 years.
            </p>
            <div className="footer-socials">
              {Object.entries(contact.socialLinks).map(([platform, url]) => (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="social-link" title={platform}>
                  {getSocialIcon(platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links 1 */}
          <div className="footer-nav">
            <h4>Explore</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <a href={link.path}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div className="footer-nav">
            <h4>Academy</h4>
            <ul className="footer-links">
              {secondaryLinks.map((link) => (
                <li key={link.path}>
                  <a href={link.path}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-contact">
            <h4>Contact Info</h4>
            <div className="footer-contact-details">
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'hsl(var(--primary))', flexShrink: 0, marginTop: '0.15rem' }} />
                <span>{contact.address}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Phone size={16} style={{ color: 'hsl(var(--primary))' }} />
                <span><a href={`tel:${contact.phone}`}>{contact.phone}</a></span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Mail size={16} style={{ color: 'hsl(var(--primary))' }} />
                <span><a href={`mailto:${contact.email}`}>{contact.email}</a></span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Jai Sai Academy. All Rights Reserved. Designed for Professional Excellence.</p>
        </div>
      </div>
    </footer>
  );
}
