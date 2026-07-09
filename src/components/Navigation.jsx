import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Menu, X, Sun, Moon, BookOpen, GraduationCap } from 'lucide-react';

export default function Navigation({ currentPath }) {
  const { data } = useContext(DataContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { label: 'Home', path: '#home' },
    { label: 'Programs Offered', path: '#programs' },
    { label: 'Skill Development', path: '#skills' },
    { label: 'Our Faculty', path: '#faculty' },
    { label: 'Achievements', path: '#achievements' },
    { label: 'Our Achievers', path: '#achievers' },
    { label: 'Gallery', path: '#gallery' },
    { label: 'Contact', path: '#contact' },
    { label: 'Admin', path: '#admin', isBtn: true }
  ];

  const getActiveState = (path) => {
    if (path === '#home' && (currentPath === '#home' || currentPath === '')) return 'active';
    if (currentPath.startsWith(path)) return 'active';
    return '';
  };

  return (
    <nav className={`navbar glass ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="logo-link" onClick={() => setMenuOpen(false)}>
          <img src="/logo.png" alt="Jai Sai Academy Logo" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'contain', background: '#fff', border: '1px solid hsl(var(--card-border))' }} />
          <span>Jai Sai Academy</span>
        </a>

        {/* Desktop Nav */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.path}>
              <a
                href={item.path}
                className={item.isBtn ? "btn btn-primary" : `nav-item ${getActiveState(item.path)}`}
                onClick={() => setMenuOpen(false)}
                style={item.isBtn ? { padding: '0.4rem 1rem', fontSize: '0.85rem' } : {}}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <button 
              onClick={toggleTheme} 
              className="social-link" 
              title="Toggle Theme" 
              style={{ border: 'none', cursor: 'pointer' }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </li>
        </ul>

        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
