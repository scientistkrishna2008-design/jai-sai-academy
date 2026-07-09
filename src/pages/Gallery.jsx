import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function Gallery() {
  const { data } = useContext(DataContext);
  const { gallery } = data;
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = [
    'All',
    'Classroom',
    'Graduation',
    'Cultural Events',
    'Drawing',
    'Dance',
    'Award Functions',
    'Student Activities'
  ];

  // Filter gallery items by active category
  const filteredGallery = activeCategory === 'All' 
    ? gallery 
    : gallery.filter(item => item.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % filteredGallery.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  };

  return (
    <div className="container section fade-in">
      <div className="section-header">
        <span className="section-tag">Media Grid</span>
        <h2 className="section-title">Our Academy Gallery</h2>
        <p className="section-subtitle">
          Take a visual tour of our vibrant classrooms, annual graduations, cultural fests, and student art workshops.
        </p>
      </div>

      {/* Category Filters */}
      <div className="gallery-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setLightboxIndex(null); }}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Media Grid */}
      {filteredGallery.length > 0 ? (
        <div className="gallery-grid">
          {filteredGallery.map((item, idx) => (
            <div 
              key={item.id} 
              className="card gallery-card glass" 
              onClick={() => openLightbox(idx)}
            >
              <img src={item.url} alt={item.caption} className="gallery-img" />
              <div className="gallery-overlay">
                <div style={{ width: '100%' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'hsl(var(--secondary))', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                    {item.category}
                  </span>
                  <p className="gallery-caption">{item.caption}</p>
                </div>
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                  <ZoomIn size={16} color="white" style={{ marginTop: '2px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card glass" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'hsl(var(--text-secondary))' }}>No photos found in this category. Upload photos in the admin panel to populate this view.</p>
        </div>
      )}

      {/* Lightbox Slider overlay */}
      {lightboxIndex !== null && filteredGallery.length > 0 && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="modal-close-btn" onClick={closeLightbox} style={{ top: '2rem', right: '2rem' }}>
            <X size={20} />
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={filteredGallery[lightboxIndex].url} 
              alt={filteredGallery[lightboxIndex].caption} 
              className="lightbox-img" 
            />

            {filteredGallery.length > 1 && (
              <>
                <button className="lightbox-nav-btn lightbox-prev" onClick={prevImage}>
                  <ChevronLeft size={24} />
                </button>
                <button className="lightbox-nav-btn lightbox-next" onClick={nextImage}>
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <div className="lightbox-caption">
              <span style={{ fontSize: '0.75rem', color: 'hsl(var(--secondary))', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                {filteredGallery[lightboxIndex].category}
              </span>
              <p>{filteredGallery[lightboxIndex].caption}</p>
              <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', marginTop: '0.5rem', display: 'block' }}>
                Image {lightboxIndex + 1} of {filteredGallery.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
