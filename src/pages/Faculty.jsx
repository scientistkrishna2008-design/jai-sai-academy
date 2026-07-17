import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Award, Briefcase, GraduationCap, Globe, Mail, Phone } from 'lucide-react';

export default function Faculty() {
  const { data } = useContext(DataContext);
  const { faculty } = data;

  // Sort by display order
  const sortedFaculty = [...faculty].sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));

  return (
    <div className="container section fade-in">
      <div className="section-header">
        <span className="section-tag">Our Educators</span>
        <h2 className="section-title">Meet Our Dedicated Faculty</h2>
        <p className="section-subtitle">
          Highly experienced language pandits, science mentors, and certified soft skills experts who design custom curriculums for outstanding results.
        </p>
      </div>

      <div className="faculty-grid">
        {sortedFaculty.map((teacher) => (
          <div key={teacher.id} className="card faculty-card glass">
            <div className="faculty-image-container">
              <img src={teacher.image} alt={teacher.name} className="faculty-img" />
              <div className="faculty-header-overlay">
                <h3 className="faculty-name">{teacher.name}</h3>
                <span className="faculty-title">{teacher.qualification}</span>
              </div>
            </div>
            
            <div className="faculty-content">
              <div className="faculty-exp" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Briefcase size={14} style={{ color: 'hsl(var(--secondary))' }} />
                <span>{teacher.experience}</span>
              </div>

              <p className="faculty-bio">{teacher.bio}</p>

              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <GraduationCap size={16} style={{ color: 'hsl(var(--primary))' }} /> Specializations:
                </h4>
                <div className="faculty-chips">
                  {teacher.subjects.map((sub, idx) => (
                    <span key={idx} className="faculty-chip">{sub}</span>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Globe size={16} style={{ color: 'hsl(var(--primary))' }} /> Languages spoken:
                </h4>
                <div className="faculty-chips">
                  {teacher.languages.map((lang, idx) => (
                    <span key={idx} className="faculty-chip" style={{ background: 'hsl(var(--secondary) / 0.1)', borderColor: 'hsl(var(--secondary) / 0.2)' }}>
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {teacher.achievements && teacher.achievements.length > 0 && (
                <div style={{ marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid hsl(var(--card-border) / 0.5)' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'hsl(var(--secondary))' }}>
                    <Award size={16} /> Honours:
                  </h4>
                  <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {teacher.achievements.map((ach, idx) => (
                      <li key={idx} style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                        <span style={{ color: 'hsl(var(--secondary))' }}>&bull;</span> {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="card glass" style={{ marginTop: '4rem', padding: '2.5rem', textAlign: 'center', borderColor: 'hsl(var(--secondary) / 0.3)' }}>
        <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Interested in Joining Our Faculty?</h3>
        <p style={{ color: 'hsl(var(--text-secondary))', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: '1.5' }}>
          We are always looking for certified teachers, native translators, and specialized tutors in Ambattur to expand our languages and mathematics departments.
        </p>
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSePmNCBtSfm_zcZQ0TUHURzv0iqySQfEqn32ZRwkminGfs11A/viewform?usp=publish-editor" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-secondary"
        >
          Fill out Recruitment Form
        </a>
      </div>
    </div>
  );
}
