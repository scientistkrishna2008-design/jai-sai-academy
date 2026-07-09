import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { Clock, DollarSign, BookOpen, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';

export default function Programs({ selectedId }) {
  const { data } = useContext(DataContext);
  const { programs, contact } = data;
  const [lightboxImg, setLightboxImg] = useState(null);

  // If a specific program is selected, show details
  if (selectedId) {
    const program = programs.find(p => p.id === selectedId);

    if (!program) {
      return (
        <div className="container section fade-in" style={{ textAlign: 'center', paddingTop: '100px' }}>
          <h2>Program Not Found</h2>
          <p style={{ margin: '1rem 0' }}>The program you are looking for does not exist or has been modified.</p>
          <a href="#programs" className="btn btn-primary">Back to Programs</a>
        </div>
      );
    }

    const handleEnquire = () => {
      // Set session storage query pre-fill
      sessionStorage.setItem('enquiry_subject', `Admission details for ${program.name}`);
      window.location.hash = '#contact';
    };

    return (
      <div className="container section fade-in" style={{ paddingTop: '50px' }}>
        <a href="#programs" className="btn btn-outline" style={{ marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to All Programs
        </a>

        <div className="hero-grid" style={{ gap: '3rem' }}>
          <div className="hero-content" style={{ gap: '2rem' }}>
            <div>
              <span className="hero-tag">{program.category} Syllabus</span>
              <h1 style={{ fontSize: '3rem', marginTop: '0.5rem' }}>{program.name}</h1>
            </div>
            
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'hsl(var(--text-secondary))' }}>
              {program.details || program.description}
            </p>

            <div className="modal-meta-grid" style={{ margin: 0 }}>
              <div className="modal-meta-item">
                <span className="modal-meta-label">Course Duration</span>
                <span className="modal-meta-value" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={16} /> {program.duration}
                </span>
              </div>
              <div className="modal-meta-item">
                <span className="modal-meta-label">Tuition Fees</span>
                <span className="modal-meta-value" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <DollarSign size={16} /> {program.fees}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={handleEnquire} className="btn btn-primary">
                Enquire for Admission
              </button>
              <a 
                href={`https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in the ${program.name} program. Please send details.`)}`}
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="hero-image-container glass">
              <img src={program.image} alt={program.name} className="hero-img" style={{ height: '360px' }} />
            </div>

            {/* Extra gallery images for this program if they exist */}
            {program.gallery && program.gallery.length > 0 && (
              <div>
                <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Course Gallery</h4>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {program.gallery.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="card glass" 
                      style={{ padding: '0.25rem', width: '100px', height: '80px', cursor: 'pointer', overflow: 'hidden' }}
                      onClick={() => setLightboxImg(img)}
                    >
                      <img src={img} alt={`${program.name} gallery ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Local lightbox for program gallery */}
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

  // Otherwise, render full programs index
  return (
    <div className="container section fade-in">
      <div className="section-header">
        <span className="section-tag">Academic Curriculums</span>
        <h2 className="section-title">Academic Programs Offered</h2>
        <p className="section-subtitle">
          We provide rigorous coaching for core sciences, mathematics, school curricula, and national-level Hindi certifications by Dakshin Bharat Prachar Sabha.
        </p>
      </div>

      <div className="programs-grid">
        {programs.map((prg) => (
          <div key={prg.id} className="card program-card glass">
            <div className="program-image-wrapper">
              <img src={prg.image} alt={prg.name} className="program-image" />
              <span className="program-badge">{prg.category}</span>
            </div>
            <div className="program-info">
              <h3 className="program-title">{prg.name}</h3>
              <p className="program-desc">{prg.description}</p>
              <div className="program-footer">
                <div className="program-duration">
                  <Clock size={14} />
                  <span>{prg.duration}</span>
                </div>
                <a href={`#programs/${prg.id}`} className="program-link">
                  View Syllabus <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
