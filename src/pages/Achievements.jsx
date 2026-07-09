import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Trophy, Calendar, Award, Star } from 'lucide-react';

export default function Achievements() {
  const { data } = useContext(DataContext);
  const { timeline, awards } = data.achievements;

  return (
    <div className="container section fade-in">
      <div className="section-header">
        <span className="section-tag">Our History</span>
        <h2 className="section-title">25 Years of Educational Milestones</h2>
        <p className="section-subtitle">
          From a humble neighborhood tuition class to Ambattur's top academy. Trace our historic journey of excellence.
        </p>
      </div>

      {/* Timeline Section */}
      <div className="timeline-container">
        {timeline.map((event, idx) => (
          <div key={event.id} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-year">{event.year}</span>
              <h3 className="timeline-title">{event.title}</h3>
              <p className="timeline-desc">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Awards Section */}
      <div style={{ marginTop: '6rem' }}>
        <div className="section-header">
          <span className="section-tag">Certifications</span>
          <h2 className="section-title">Academy Awards & Accreditation</h2>
          <p className="section-subtitle">
            Official recognitions from the Dakshin Bharat Hindi Prachar Sabha and regional educational boards.
          </p>
        </div>

        <div className="strengths-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {awards.map((award) => (
            <div key={award.id} className="card glass" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', padding: '2rem' }}>
              <div className="strength-icon-box" style={{ background: 'hsl(var(--secondary) / 0.1)', color: 'hsl(var(--secondary))', border: '1px solid hsl(var(--secondary) / 0.2)', width: '56px', height: '56px', fontSize: '1.5rem', flexShrink: 0 }}>
                <Trophy size={24} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'hsl(var(--text-muted))', textTransform: 'uppercase' }}>
                  {award.issuer} &bull; {award.year}
                </span>
                <h3 style={{ fontSize: '1.25rem' }}>{award.title}</h3>
                <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  {award.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights Box */}
      <div className="card glass" style={{ marginTop: '5rem', padding: '3rem', textAlign: 'center', borderColor: 'hsl(var(--secondary) / 0.3)', background: 'radial-gradient(circle at 50% 0%, hsl(var(--bg-gradient-end) / 0.5), hsl(var(--bg-gradient-start) / 0.5))' }}>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ minWidth: '150px' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'hsl(var(--secondary))' }}>100%</div>
            <div style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', marginTop: '0.25rem' }}>Board Exam Pass Rate</div>
          </div>
          <div style={{ borderLeft: '1px solid hsl(var(--card-border))' }} className="hide-mobile"></div>
          <div style={{ minWidth: '150px' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'hsl(var(--primary))' }}>25+</div>
            <div style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', marginTop: '0.25rem' }}>Sabha Exam Sessions</div>
          </div>
          <div style={{ borderLeft: '1px solid hsl(var(--card-border))' }} className="hide-mobile"></div>
          <div style={{ minWidth: '150px' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'hsl(var(--secondary))' }}>5000+</div>
            <div style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', marginTop: '0.25rem' }}>Alumni Guided</div>
          </div>
        </div>
      </div>
    </div>
  );
}
