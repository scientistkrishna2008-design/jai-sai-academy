import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { Phone, Mail, MapPin, Clock, Send, Globe, ShieldCheck } from 'lucide-react';
import { formatBrandText } from '../utils/textFormatter';

export default function Contact() {
  const { data } = useContext(DataContext);
  const { contact } = data;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    mode: 'Offline',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Pre-fill subject if redirected from a specific program/skill details page
  useEffect(() => {
    const subject = sessionStorage.getItem('enquiry_subject');
    if (subject) {
      setFormState(prev => ({ ...prev, course: subject }));
      sessionStorage.removeItem('enquiry_subject');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate API request
    setSubmitted(true);
    
    // Retrieve existing enquiries from localStorage or initialize empty
    const savedEnquiries = JSON.parse(localStorage.getItem('jaisai_academy_enquiries') || '[]');
    const newEnquiry = {
      ...formState,
      id: `enq-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      status: 'New'
    };
    localStorage.setItem('jaisai_academy_enquiries', JSON.stringify([newEnquiry, ...savedEnquiries]));

    // Reset form after submission
    setFormState({
      name: '',
      email: '',
      phone: '',
      course: '',
      mode: 'Offline',
      message: ''
    });
  };

  return (
    <div className="container section fade-in">
      <div className="section-header">
        <span className="section-tag" style={{ color: 'var(--text)' }}>Get In Touch</span>
        <h2 className="section-title">{formatBrandText("Jai Sai Academy")}</h2>
        <p className="section-subtitle">
          Have queries about batches, syllabus, or sabha exam registrations? Fill out the admission form or call us directly.
        </p>
      </div>

      <div className="contact-grid">
        {/* Contact Information */}
        <div className="contact-info-list">
          <div className="card glass" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Admissions Desk</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="contact-item">
                <div className="contact-icon-box">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="contact-label">Location Address</div>
                  <div className="contact-value">{contact.address}</div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="contact-label">Phone & WhatsApp</div>
                  <div className="contact-value">
                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="contact-label">Email Address</div>
                  <div className="contact-value">
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="contact-label">Working Hours</div>
                  <div className="contact-value">{contact.workingHours}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive online classroom highlight */}
          <div className="card glass" style={{ padding: '1.5rem 2rem', borderColor: 'hsl(var(--primary) / 0.3)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="contact-icon-box" style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
              <Globe size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.2rem' }}>Global Online Class Support</h4>
              <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.4' }}>
                {contact.onlineClassesInfo}
              </p>
            </div>
          </div>

          {/* Map Section */}
          <div className="map-container glass">
            <iframe 
              src={contact.googleMapUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Jai Sai Academy location map"
            ></iframe>
          </div>
        </div>

        {/* Admissions Form */}
        <div className="card glass form-card">
          <h3 className="form-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Admission Enquiry Form
          </h3>
          
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'hsl(var(--success) / 0.1)', color: 'hsl(var(--success))', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid hsl(var(--success) / 0.2)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                <ShieldCheck size={28} />
              </div>
              <h4 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Enquiry Sent Successfully!</h4>
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', lineHeight: '1.5', maxWidth: '400px' }}>
                Thank you for reaching out. Our academic coordinator will contact you shortly via email/phone with batch schedules.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Student Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="form-input" 
                    required 
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Enter student name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Contact Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    className="form-input" 
                    required 
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="Parent/Student phone number"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-input" 
                    required 
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Enter email for notifications"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="course">Course of Interest *</label>
                  <input 
                    type="text" 
                    id="course" 
                    name="course" 
                    className="form-input" 
                    required 
                    value={formState.course}
                    onChange={handleChange}
                    placeholder="e.g. CBSE Hindi, Mathematics"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="mode">Class Mode *</label>
                  <select 
                    id="mode" 
                    name="mode" 
                    className="form-select" 
                    value={formState.mode}
                    onChange={handleChange}
                  >
                    <option value="Offline">Offline Class (Ambattur Center)</option>
                    <option value="Online">Online Class (Zoom/Meet)</option>
                    <option value="Hybrid">Hybrid (Flexible)</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label" htmlFor="message">Message / Queries</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    className="form-textarea" 
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Describe specific student needs, class standard, or sabha grade"
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Send Admission Request <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
