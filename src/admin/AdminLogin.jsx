import React, { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { ShieldAlert, Eye, EyeOff, Lock } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const { data } = useContext(DataContext);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Default password fallback if somehow missing
  const targetPassword = data.adminPassword || 'SaiAcademy2026';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === targetPassword) {
      setError('');
      // Save session authentication so they don't have to re-login within the same session
      sessionStorage.setItem('admin_authenticated', 'true');
      onLoginSuccess();
    } else {
      setError('Incorrect admin password. Please try again.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: '1.5rem'
    }}>
      <div className="card glass" style={{
        maxWidth: '400px',
        width: '100%',
        padding: '3rem 2rem',
        border: '1px solid hsl(var(--secondary) / 0.3)',
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 50px hsl(var(--secondary-glow))'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            background: 'hsl(var(--secondary) / 0.1)',
            color: 'hsl(var(--secondary))',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid hsl(var(--secondary) / 0.2)',
            fontSize: '1.5rem',
            marginBottom: '1rem'
          }}>
            <Lock size={28} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Admin Access</h2>
          <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Authentication required to modify academy content.
          </p>
        </div>

        {error && (
          <div style={{
            background: 'hsl(var(--error) / 0.15)',
            border: '1px solid hsl(var(--error) / 0.3)',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            color: 'hsl(var(--error))',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <ShieldAlert size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Enter Security Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                style={{ width: '100%', paddingRight: '3rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'hsl(var(--text-muted))',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-secondary" style={{ width: '100%', padding: '0.85rem' }}>
            Unlock Dashboard
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="#home" style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))', textDecoration: 'none' }}>
            &larr; Back to Academy Home
          </a>
        </div>
      </div>
    </div>
  );
}
