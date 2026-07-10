import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Award, Star } from 'lucide-react';
import { formatBrandText } from '../utils/textFormatter';

export default function Achievers() {
  const { data } = useContext(DataContext);
  const { achievers } = data;

  return (
    <div className="container section fade-in">
      <div className="section-header">
        <span className="section-tag">Student Hall of Fame</span>
        <h2 className="section-title">Our Outstanding Achievers</h2>
        <p className="section-subtitle">
          Meet the exceptional students who secured top grades, centum marks, and state-level distinctions in board exams and language contests.
        </p>
      </div>

      <div className="gallery-grid">
        {achievers.map((student) => (
          <div key={student.id} className="card glass" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ height: '240px', width: '100%', position: 'relative', overflow: 'hidden', borderBottom: '1px solid hsl(var(--card-border))' }}>
              {student.image ? (
                <img 
                  src={student.image} 
                  alt={student.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
                />
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'hsl(var(--card-border) / 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={48} style={{ color: 'hsl(var(--text-muted))' }} />
                </div>
              )}
              <span className="program-badge" style={{ background: 'hsl(var(--secondary))', color: '#0c0f1d', fontWeight: '800' }}>
                {student.score}
              </span>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'hsl(var(--text-muted))', textTransform: 'uppercase' }}>
                Class of {student.year} &bull; {student.exam}
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{student.name}</h3>
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.85rem', lineHeight: '1.4', flexGrow: 1 }}>
                {student.achievement}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="card glass" style={{ marginTop: '4rem', padding: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, hsl(var(--card-bg)) 0%, hsl(var(--primary) / 0.1) 100%)' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Want to See Your Child Here Next Year?</h3>
        <p style={{ color: 'hsl(var(--text-secondary))', maxWidth: '600px', lineHeight: '1.5', fontSize: '0.95rem', margin: '0 auto 2rem' }}>
          At {formatBrandText("Jai Sai Academy")}, we believe that academic brilliance is a result of consistent support, customized learning methods, and dedicated teachers. Enroll your child today and see the difference!
        </p>
        <a href="#contact" className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>
          Book an Admission Counseling
        </a>
      </div>
    </div>
  );
}
