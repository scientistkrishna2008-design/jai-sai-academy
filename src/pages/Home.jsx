import React, { useContext, useState, useEffect, useRef } from 'react';
import { DataContext } from '../context/DataContext';
import { formatBrandText } from '../utils/textFormatter';
import { Award, Users, BookOpen, Clock, ArrowRight, ChevronLeft, ChevronRight, Star, Heart, CheckCircle2 } from 'lucide-react';

// Hero Swarm Canvas Particle Animation (Self-assembling into Pencil, Cap, Book)
const HeroAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = canvas.parentElement.clientWidth || 480;
    let height = 480;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Scaling helpers
    const scaleX = (x) => (x / 400) * width * 0.8 + width * 0.1;
    const scaleY = (y) => (y / 400) * height * 0.8 + height * 0.1;

    // Define Paths for school shapes on 0-400 coordinate box
    const pencilPaths = [
      [{ x: 130, y: 80 }, { x: 130, y: 320 }],
      [{ x: 270, y: 80 }, { x: 270, y: 320 }],
      [{ x: 130, y: 80 }, { x: 200, y: 20 }],
      [{ x: 270, y: 80 }, { x: 200, y: 20 }],
      [{ x: 130, y: 80 }, { x: 270, y: 80 }],
      [{ x: 175, y: 80 }, { x: 175, y: 320 }],
      [{ x: 225, y: 80 }, { x: 225, y: 320 }],
      [{ x: 130, y: 320 }, { x: 270, y: 320 }],
      [{ x: 130, y: 340 }, { x: 270, y: 340 }],
      [{ x: 130, y: 360 }, { x: 270, y: 360 }]
    ];

    const capPaths = [
      [{ x: 50, y: 150 }, { x: 200, y: 80 }],
      [{ x: 200, y: 80 }, { x: 350, y: 150 }],
      [{ x: 350, y: 150 }, { x: 200, y: 220 }],
      [{ x: 200, y: 220 }, { x: 50, y: 150 }],
      [{ x: 120, y: 185 }, { x: 120, y: 250 }],
      [{ x: 280, y: 185 }, { x: 280, y: 250 }],
      [{ x: 120, y: 250 }, { x: 280, y: 250 }],
      [{ x: 200, y: 150 }, { x: 320, y: 160 }],
      [{ x: 320, y: 160 }, { x: 320, y: 260 }],
      [{ x: 310, y: 260 }, { x: 330, y: 260 }]
    ];

    const bookPaths = [
      [{ x: 60, y: 100 }, { x: 190, y: 130 }],
      [{ x: 210, y: 130 }, { x: 340, y: 100 }],
      [{ x: 60, y: 100 }, { x: 60, y: 280 }],
      [{ x: 340, y: 100 }, { x: 340, y: 280 }],
      [{ x: 190, y: 130 }, { x: 190, y: 310 }],
      [{ x: 210, y: 130 }, { x: 210, y: 310 }],
      [{ x: 60, y: 280 }, { x: 190, y: 310 }],
      [{ x: 210, y: 310 }, { x: 340, y: 280 }],
      [{ x: 190, y: 310 }, { x: 210, y: 310 }],
      [{ x: 80, y: 160 }, { x: 170, y: 175 }],
      [{ x: 80, y: 200 }, { x: 170, y: 215 }],
      [{ x: 80, y: 240 }, { x: 170, y: 255 }],
      [{ x: 230, y: 175 }, { x: 320, y: 160 }],
      [{ x: 230, y: 215 }, { x: 320, y: 200 }],
      [{ x: 230, y: 255 }, { x: 320, y: 240 }]
    ];

    const jsaPaths = [
      // J
      [{ x: 40, y: 120 }, { x: 120, y: 120 }],
      [{ x: 120, y: 120 }, { x: 120, y: 260 }],
      [{ x: 120, y: 260 }, { x: 100, y: 280 }],
      [{ x: 100, y: 280 }, { x: 60, y: 280 }],
      [{ x: 60, y: 280 }, { x: 40, y: 260 }],
      [{ x: 40, y: 260 }, { x: 40, y: 230 }],
      [{ x: 40, y: 230 }, { x: 70, y: 230 }],
      [{ x: 70, y: 230 }, { x: 70, y: 250 }],
      [{ x: 70, y: 250 }, { x: 90, y: 250 }],
      [{ x: 90, y: 250 }, { x: 90, y: 150 }],
      [{ x: 90, y: 150 }, { x: 40, y: 150 }],
      [{ x: 40, y: 150 }, { x: 40, y: 120 }],
      
      // S
      [{ x: 140, y: 120 }, { x: 230, y: 120 }],
      [{ x: 230, y: 120 }, { x: 230, y: 150 }],
      [{ x: 230, y: 150 }, { x: 170, y: 150 }],
      [{ x: 170, y: 150 }, { x: 170, y: 185 }],
      [{ x: 170, y: 185 }, { x: 230, y: 185 }],
      [{ x: 230, y: 185 }, { x: 230, y: 280 }],
      [{ x: 230, y: 280 }, { x: 140, y: 280 }],
      [{ x: 140, y: 280 }, { x: 140, y: 250 }],
      [{ x: 140, y: 250 }, { x: 200, y: 250 }],
      [{ x: 200, y: 250 }, { x: 200, y: 215 }],
      [{ x: 200, y: 215 }, { x: 140, y: 215 }],
      [{ x: 140, y: 215 }, { x: 140, y: 120 }],

      // A (Outer)
      [{ x: 250, y: 280 }, { x: 285, y: 120 }],
      [{ x: 285, y: 120 }, { x: 305, y: 120 }],
      [{ x: 305, y: 120 }, { x: 340, y: 280 }],
      [{ x: 340, y: 280 }, { x: 310, y: 280 }],
      [{ x: 310, y: 280 }, { x: 300, y: 220 }],
      [{ x: 300, y: 220 }, { x: 290, y: 220 }],
      [{ x: 290, y: 220 }, { x: 280, y: 280 }],
      [{ x: 280, y: 280 }, { x: 250, y: 280 }],
      
      // A (Inner Hole)
      [{ x: 295, y: 160 }, { x: 300, y: 190 }],
      [{ x: 300, y: 190 }, { x: 290, y: 190 }],
      [{ x: 290, y: 190 }, { x: 295, y: 160 }]
    ];

    // Sampling point finder along lines
    const samplePoints = (paths, count) => {
      const points = [];
      let totalLength = 0;
      const segments = paths.map(seg => {
        const dx = seg[1].x - seg[0].x;
        const dy = seg[1].y - seg[0].y;
        const length = Math.sqrt(dx * dx + dy * dy);
        totalLength += length;
        return { p1: seg[0], p2: seg[1], dx, dy, length };
      });

      for (let i = 0; i < count; i++) {
        const r = Math.random() * totalLength;
        let runningSum = 0;
        let segment = segments[0];
        for (const s of segments) {
          runningSum += s.length;
          if (runningSum >= r) {
            segment = s;
            break;
          }
        }
        const t = Math.random();
        points.push({
          x: scaleX(segment.p1.x + segment.dx * t),
          y: scaleY(segment.p1.y + segment.dy * t)
        });
      }
      return points;
    };

    const particleCount = 280;
    const shapes = [pencilPaths, capPaths, bookPaths, jsaPaths];
    let currentShapeIdx = 0;

    let targets = samplePoints(shapes[currentShapeIdx], particleCount);

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        targetX: targets[i].x,
        targetY: targets[i].y,
        radius: Math.random() * 2 + 1.2,
        color: i % 2 === 0 ? 'hsla(265, 89%, 65%, 0.95)' : 'hsla(330, 90%, 60%, 0.95)', // theme violet & pink
        alpha: Math.random() * 0.4 + 0.6
      });
    }

    const intervalId = setInterval(() => {
      currentShapeIdx = (currentShapeIdx + 1) % shapes.length;
      const newTargets = samplePoints(shapes[currentShapeIdx], particleCount);
      particles.forEach((p, idx) => {
        p.targetX = newTargets[idx].x;
        p.targetY = newTargets[idx].y;
      });
    }, 4500);

    const handleResize = () => {
      width = canvas.parentElement.clientWidth || 480;
      height = 480;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      const currentTargets = samplePoints(shapes[currentShapeIdx], particleCount);
      particles.forEach((p, idx) => {
        p.targetX = currentTargets[idx].x;
        p.targetY = currentTargets[idx].y;
      });
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.fillStyle = 'rgba(11, 14, 27, 0.12)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        
        const force = 0.045;
        p.vx += dx * force;
        p.vy += dy * force;
        
        const friction = 0.85;
        p.vx *= friction;
        p.vy *= friction;

        // Brownian fluctuation
        p.vx += (Math.random() - 0.5) * 0.18;
        p.vy += (Math.random() - 0.5) * 0.18;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        display: 'block', 
        width: '100%', 
        height: '480px', 
        borderRadius: '24px',
        background: 'radial-gradient(circle, #0e1227 0%, #060914 100%)'
      }} 
    />
  );
};

export default function Home() {
  const { data } = useContext(DataContext);
  const { homepage, programs, gallery, testimonials } = data;
  
  // Testimonials Carousel State
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const featuredTestimonials = testimonials.filter(t => t.isFeatured);

  useEffect(() => {
    if (featuredTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % featuredTestimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [featuredTestimonials.length]);

  // Featured programs (Take 4 programs)
  const featuredPrograms = programs.slice(0, 4);

  // Latest 4 featured gallery photos
  const latestPhotos = gallery.filter(g => g.isOnHomepage || g.isFeatured).slice(0, 4);

  return (
    <div className="fade-in">
      {/* Premium Hero Banner */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-tag">
              <Award size={14} />
              <span>Celebrating 25 Years of Academic Glory</span>
            </div>
            <h1 className="hero-title">{homepage.heroTitle}</h1>
            <p className="hero-subtitle">{formatBrandText(homepage.heroSubtitle)}</p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                {homepage.heroCtaText} <ArrowRight size={16} />
              </a>
              <a href="#programs" className="btn btn-outline">
                Explore Programs
              </a>
            </div>
          </div>
          <div className="hero-image-container glass" style={{ padding: 0, overflow: 'hidden' }}>
            {homepage.heroImage ? (
              <img src={homepage.heroImage} alt="Jai Sai Academy Campus" className="hero-img" style={{ display: 'block', width: '100%', height: '480px', objectFit: 'cover' }} />
            ) : (
              <HeroAnimation />
            )}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="stats-banner">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Why JSA?</h2>
          <div className="stats-grid">
            <div className="card stat-card glass">
              <div className="stat-number">{homepage.stats.experience}</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="card stat-card glass">
              <div className="stat-number">{homepage.stats.students}</div>
              <div className="stat-label">Students Guided</div>
            </div>
            <div className="card stat-card glass">
              <div className="stat-number">{homepage.stats.teachers}</div>
              <div className="stat-label">Hindi Pandits</div>
            </div>
            <div className="card stat-card glass">
              <div className="stat-number">{homepage.stats.passRate}</div>
              <div className="stat-label">Pass Average</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span className="section-tag">About The Academy</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Nurturing Excellence in Language, Science & Fine Arts</h2>
            <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Founded in 2001, {formatBrandText("Jai Sai Academy")} has evolved from a dedicated language tuition room into a premier multi-disciplinary educational institute in Ambattur. We believe in providing systematic, concept-focused training that helps students build solid foundational clarity.
            </p>
            <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Whether preparing school children for competitive CBSE / State Board maths and science courses or guiding scholars through national-level Hindi language accreditations, our customized teaching plan ensures outstanding academic growth.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <CheckCircle2 size={18} style={{ color: 'hsl(var(--secondary))' }} />
                <span style={{ fontWeight: 600 }}>Experienced and certified native scholars</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <CheckCircle2 size={18} style={{ color: 'hsl(var(--secondary))' }} />
                <span style={{ fontWeight: 600 }}>Small batches for high individual concentration</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <CheckCircle2 size={18} style={{ color: 'hsl(var(--secondary))' }} />
                <span style={{ fontWeight: 600 }}>Hybrid classes with online support recordings</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <CheckCircle2 size={18} style={{ color: 'hsl(var(--secondary))' }} />
                <span style={{ fontWeight: 600 }}>One-to-One Attention</span>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="card glass" style={{ padding: '1rem', borderRadius: '20px' }}>
              <img 
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800" 
                alt="Classroom learning" 
                style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '12px' }}
              />
            </div>
            <div className="card glass" style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '200px', padding: '1.5rem', textAlign: 'center', borderColor: 'hsl(var(--secondary) / 0.4)' }}>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: 'hsl(var(--secondary))' }}>100%</div>
              <div style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', fontWeight: '600' }}>Sabha Exam Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Our Strength */}
      <section className="section bg-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Core Value System</span>
            <h2 className="section-title">Why Parents Trust {formatBrandText("Jai Sai Academy")}</h2>
            <p className="section-subtitle">We design custom academic trajectories that combine robust theoretical foundations with active, interactive classes.</p>
          </div>
          
          <div className="strengths-grid">
            {homepage.strengths.map((str) => (
              <div key={str.id} className="card strength-card glass">
                <div className="strength-icon-box">
                  <Award size={20} />
                </div>
                <h3>{str.title}</h3>
                <p>{formatBrandText(str.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Academic Excellence</span>
            <h2 className="section-title">Featured Academic Programs</h2>
            <p className="section-subtitle">All courses are certified by Dakshin Bharat Prachar Sabha and the center itself is a certified center by the Dakshin Bharat Prachar Sabha.</p>
          </div>

          <div className="programs-grid">
            {featuredPrograms.map((prg) => (
              <div key={prg.id} className="card program-card glass">
                <div className="program-image-wrapper">
                  <img src={prg.image} alt={prg.name} className="program-image" />
                  <span className="program-badge">{prg.category}</span>
                </div>
                <div className="program-info">
                  <h3 className="program-title">{prg.name}</h3>
                  <p className="program-desc">{formatBrandText(prg.description)}</p>
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

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="#programs" className="btn btn-secondary">
              View All Academic Offerings
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials (Parent & Student Highlights) */}
      <section className="section bg-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title">What Parents Say About Us</h2>
            <p className="section-subtitle">Genuine reviews written by parents of students who secured top ranks and scores under our care.</p>
          </div>

          {featuredTestimonials.length > 0 && (
            <div className="testimonials-slider">
              <div className="testimonial-slide">
                <div className="stars">
                  {[...Array(featuredTestimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="review-text">
                  "{featuredTestimonials[activeTestimonial].review}"
                </p>
                <div className="author-info">
                  <span className="author-name">{featuredTestimonials[activeTestimonial].parentName}</span>
                  <span className="student-tag">Parent of {featuredTestimonials[activeTestimonial].studentName}</span>
                </div>
              </div>

              {featuredTestimonials.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveTestimonial((prev) => (prev === 0 ? featuredTestimonials.length - 1 : prev - 1))}
                    className="lightbox-nav-btn lightbox-prev" 
                    style={{ background: 'hsl(var(--card-bg))', width: '40px', height: '40px' }}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => setActiveTestimonial((prev) => (prev + 1) % featuredTestimonials.length)}
                    className="lightbox-nav-btn lightbox-next"
                    style={{ background: 'hsl(var(--card-bg))', width: '40px', height: '40px' }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <div className="slider-dots">
                {featuredTestimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`slider-dot ${i === activeTestimonial ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Auto-updated Gallery Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Inside The Academy</span>
            <h2 className="section-title">Latest Gallery Highlights</h2>
            <p className="section-subtitle">Real-time snapshots of our Graduation Ceremony and other competitions, cultural fests, and prize ceremonies. Maintained live through the admin dashboard.</p>
          </div>

          <div className="gallery-grid">
            {latestPhotos.map((photo) => (
              <div 
                key={photo.id} 
                className="card gallery-card glass" 
                onClick={() => window.location.hash = '#gallery'}
              >
                <img src={photo.url} alt={photo.caption} className="gallery-img" />
                <div className="gallery-overlay">
                  <span className="gallery-caption">{photo.caption}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="#gallery" className="btn btn-outline">
              Explore Full Gallery Lightbox
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-alt" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 5, textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
            Start Your Child's Journey to Excellence Today
          </h2>
          <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Batches are filling fast for CBSE Tuitions and language batches. Get in touch with our admissions coordinator or drop a message on WhatsApp.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
              Enquire for Admission
            </a>
            <a href="tel:+919080315139" className="btn btn-outline" style={{ padding: '1rem 2rem' }}>
              Call Academy (+91 9080315139)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
