import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { Clock, Users, ArrowLeft, Globe, MessageSquare } from 'lucide-react';

export default function Skills({ selectedId }) {
  const { data } = useContext(DataContext);
  const { skills, contact } = data;
  const [lightboxImg, setLightboxImg] = useState(null);

  if (selectedId) {
    const skill = skills.find(s => s.id === selectedId);

    if (!skill) {
      return (
        <div className="container section fade-in" style={{ textAlign: 'center', paddingTop: '100px' }}>
          <h2>Skill Program Not Found</h2>
          <p style={{ margin: '1rem 0' }}>The skill development class you are seeking does not exist.</p>
          <a href="#skills" className="btn btn-primary">Back to Skill Development</a>
        </div>
      );
    }

    const handleEnquire = () => {
      sessionStorage.setItem('enquiry_subject', `Enquiry for ${skill.name} Skill Program`);
      window.location.hash = '#contact';
    };

    return (
      <div className="container section fade-in" style={{ paddingTop: '50px' }}>
        <a href="#skills" className="btn btn-outline" style={{ marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Skill Programs
        </a>

        <div className="hero-grid" style={{ gap: '3rem' }}>
          <div className="hero-content" style={{ gap: '2rem' }}>
            <div>
              <span className="hero-tag">Skill Development Program</span>
              <h1 style={{ fontSize: '3rem', marginTop: '0.5rem' }}>{skill.name}</h1>
            </div>
            
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'hsl(var(--text-secondary))' }}>
              {skill.description}
            </p>

            <div className="modal-meta-grid" style={{ margin: 0 }}>
              <div className="modal-meta-item">
                <span className="modal-meta-label">Age Group</span>
                <span className="modal-meta-value" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Users size={16} /> {skill.ageGroup}
                </span>
              </div>
              <div className="modal-meta-item">
                <span className="modal-meta-label">Schedule & Duration</span>
                <span className="modal-meta-value" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={16} /> {skill.duration}
                </span>
              </div>
              <div className="modal-meta-item" style={{ gridColumn: 'span 2' }}>
                <span className="modal-meta-label">Class Format</span>
                <span className="modal-meta-value" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'hsl(var(--primary))' }}>
                  <Globe size={16} /> {skill.delivery}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={handleEnquire} className="btn btn-primary">
                Enquire for Batch Timings
              </button>
              <a 
                href={`https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I'd like to check batch availability for the ${skill.name} course at Jai Sai Academy.`)}`}
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare size={16} /> WhatsApp Inquiry
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="hero-image-container glass">
              <img src={skill.image} alt={skill.name} className="hero-img" style={{ height: '360px' }} />
            </div>

            {skill.gallery && skill.gallery.length > 0 && (
              <div>
                <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Class Snapshots</h4>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {skill.gallery.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="card glass" 
                      style={{ padding: '0.25rem', width: '100px', height: '80px', cursor: 'pointer', overflow: 'hidden' }}
                      onClick={() => setLightboxImg(img)}
                    >
                      <img src={img} alt={`${skill.name} thumbnail ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {lightboxImg && (
          <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
              <img src={lightboxImg} alt="Lightbox zoom" className="lightbox-img" />
              <button className="modal-close-btn" onClick={() => setLightboxImg(null)} style={{ top: '-40px', right: '-40px' }}>
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container section fade-in">
      <div className="section-header">
        <span className="section-tag">Extra-Curricular Growth</span>
        <h2 className="section-title">Skill Development Programs</h2>
        <p className="section-subtitle">
          Enhance creative thinking, motor coordination, verbal eloquence, and leadership capacities.
        </p>
      </div>

      <div className="programs-grid">
        {skills.map((skl) => (
          <div key={skl.id} className="card program-card glass">
            <div className="program-image-wrapper">
              <img src={skl.image} alt={skl.name} className="program-image" />
              <span className="program-badge" style={{ background: 'hsl(var(--secondary) / 0.15)', color: 'hsl(var(--secondary))', border: '1px solid hsl(var(--secondary) / 0.3)' }}>
                {skl.delivery}
              </span>
            </div>
            <div className="program-info">
              <h3 className="program-title">{skl.name}</h3>
              <p className="program-desc">{skl.description}</p>
              
              <div style={{ margin: '0.5rem 0', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span className="faculty-chip" style={{ fontSize: '0.75rem' }}>Age: {skl.ageGroup}</span>
                <span className="faculty-chip" style={{ fontSize: '0.75rem', background: 'hsl(var(--primary) / 0.05)' }}>
                  Dur: {skl.duration}
                </span>
              </div>

              <div className="program-footer">
                <button 
                  onClick={() => {
                    sessionStorage.setItem('enquiry_subject', `Enquiry for ${skl.name}`);
                    window.location.hash = '#contact';
                  }} 
                  className="btn btn-outline" 
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                >
                  Enquire Now
                </button>
                <a href={`#skills/${skl.id}`} className="program-link">
                  Learn More &rarr;
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
