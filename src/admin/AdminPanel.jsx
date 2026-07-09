import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { 
  Users, BookOpen, Image, Star, Trophy, Phone, Home, Globe, AlertCircle, 
  Trash2, Edit, Plus, Check, Undo, Upload, Shield, MessageSquare, Save, Activity
} from 'lucide-react';
import AdminLogin from './AdminLogin';

// Preset images for easy selection in admin
const PRESET_IMAGES = {
  Classroom: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800",
  Graduation: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
  Dance: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800",
  Drawing: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
  Language: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800",
  Mathematics: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
  Physics: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
  Teacher: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800"
};

export default function AdminPanel() {
  const { 
    data, loading, isCloud, updateHomepage, updateContact, updateSEO, updatePopupNotice, updatePassword,
    saveItem, deleteItem, saveTimelineEvent, deleteTimelineEvent,
    saveAward, deleteAward, resetAllData
  } = useContext(DataContext);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [enquiries, setEnquiries] = useState([]);
  const [formState, setFormState] = useState(null); // Used for Add/Edit forms
  const [formType, setFormType] = useState(''); // 'edit' or 'add'
  const [currentSection, setCurrentSection] = useState(''); // e.g. 'programs', 'faculty'
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('admin_authenticated') === 'true');

  // Load enquiries from localStorage
  useEffect(() => {
    const loaded = JSON.parse(localStorage.getItem('jaisai_academy_enquiries') || '[]');
    setEnquiries(loaded);
  }, []);

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="spinner"></div>
        <span style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--text-secondary))', marginTop: '1rem' }}>Synchronizing with Cloud Firestore...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const handleEnquiryStatus = (id, newStatus) => {
    const updated = enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e);
    setEnquiries(updated);
    localStorage.setItem('jaisai_academy_enquiries', JSON.stringify(updated));
  };

  const handleEnquiryDelete = (id) => {
    if (window.confirm("Delete this enquiry permanently?")) {
      const filtered = enquiries.filter(e => e.id !== id);
      setEnquiries(filtered);
      localStorage.setItem('jaisai_academy_enquiries', JSON.stringify(filtered));
    }
  };

  // Helper for image upload -> base64
  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image file size is too large. Please select a file smaller than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddForm = (section, defaultData) => {
    setCurrentSection(section);
    setFormType('add');
    setFormState(defaultData);
  };

  const openEditForm = (section, item) => {
    setCurrentSection(section);
    setFormType('edit');
    setFormState(item);
  };

  const closeForm = () => {
    setFormState(null);
    setFormType('');
    setCurrentSection('');
  };

  // Nav menu items
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Activity size={18} /> },
    { id: 'programs', label: 'Programs Offered', icon: <BookOpen size={18} /> },
    { id: 'faculty', label: 'Faculty Brochure', icon: <Users size={18} /> },
    { id: 'gallery', label: 'Gallery Media', icon: <Image size={18} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <Star size={18} /> },
    { id: 'achievers', label: 'Achievers Grid', icon: <Trophy size={18} /> },
    { id: 'achievements', label: 'Timeline & Awards', icon: <Trophy size={18} /> },
    { id: 'homepage', label: 'Homepage Settings', icon: <Home size={18} /> },
    { id: 'contact', label: 'Contact & Map', icon: <Phone size={18} /> },
    { id: 'seo', label: 'SEO & Meta Tags', icon: <Globe size={18} /> },
    { id: 'popup', label: 'Popup Notices', icon: <AlertCircle size={18} /> },
    { id: 'security', label: 'Security Lock', icon: <Shield size={18} /> }
  ];

  return (
    <div className="admin-layout fade-in">
      {/* Admin Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/logo.png" alt="Jai Sai Academy Logo" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'contain', background: '#fff', border: '1px solid hsl(var(--card-border))' }} />
          <span>JSA Admin Portal</span>
        </div>
        <div style={{
          fontSize: '0.75rem',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          background: isCloud ? 'hsl(var(--success) / 0.15)' : 'hsl(var(--warning) / 0.15)',
          color: isCloud ? 'hsl(var(--success))' : 'hsl(var(--warning))',
          fontWeight: 600,
          textAlign: 'center',
          marginTop: '-0.75rem'
        }}>
          {isCloud ? 'Cloud Connected' : 'Local Storage Mode'}
        </div>
        
        <ul className="admin-nav">
          {menuItems.map(item => (
            <li key={item.id}>
              <button 
                onClick={() => { setActiveTab(item.id); closeForm(); }} 
                className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid hsl(var(--card-border))' }}>
          <button onClick={resetAllData} className="btn btn-outline" style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', color: 'hsl(var(--error))', borderColor: 'hsl(var(--error) / 0.3)' }}>
            Reset Factory Data
          </button>
          <a href="#home" className="btn btn-primary" style={{ width: '100%', marginTop: '0.75rem', padding: '0.5rem', fontSize: '0.8rem' }}>
            View Live Site
          </a>
        </div>
      </aside>

      {/* Admin Main Body */}
      <main className="admin-main">
        {/* Render Form overlay if a form is active */}
        {formState ? (
          <div className="fade-in">
            <div className="admin-header">
              <div>
                <h2>{formType === 'add' ? 'Add New' : 'Edit'} {currentSection.slice(0, -1).toUpperCase()}</h2>
                <p className="admin-title-desc">Modify the fields below to update the live website content instantly.</p>
              </div>
              <button onClick={closeForm} className="btn btn-outline">Cancel</button>
            </div>
            
            {/* Dynamic fields selector based on active editor section */}
            {currentSection === 'programs' && (
              <ProgramFormEditor 
                item={formState} 
                onSave={(data) => { saveItem('programs', data); closeForm(); }} 
                onUpload={handleImageUpload} 
              />
            )}
            
            {currentSection === 'faculty' && (
              <FacultyFormEditor 
                item={formState} 
                onSave={(data) => { saveItem('faculty', data); closeForm(); }} 
                onUpload={handleImageUpload} 
              />
            )}

            {currentSection === 'gallery' && (
              <GalleryFormEditor 
                item={formState} 
                onSave={(data) => { saveItem('gallery', data); closeForm(); }} 
                onUpload={handleImageUpload} 
              />
            )}

            {currentSection === 'testimonials' && (
              <TestimonialFormEditor 
                item={formState} 
                onSave={(data) => { saveItem('testimonials', data); closeForm(); }} 
              />
            )}

            {currentSection === 'achievers' && (
              <AchieversFormEditor 
                item={formState} 
                onSave={(data) => { saveItem('achievers', data); closeForm(); }} 
                onUpload={handleImageUpload} 
              />
            )}

            {currentSection === 'timeline' && (
              <TimelineFormEditor 
                item={formState} 
                onSave={(data) => { saveTimelineEvent(data); closeForm(); }} 
              />
            )}

            {currentSection === 'awards' && (
              <AwardFormEditor 
                item={formState} 
                onSave={(data) => { saveAward(data); closeForm(); }} 
              />
            )}
          </div>
        ) : (
          /* Render Main Dashboard Content Tab */
          <div className="fade-in">
            {activeTab === 'dashboard' && (
              <DashboardView 
                data={data} 
                enquiries={enquiries} 
                onStatusChange={handleEnquiryStatus} 
                onDelete={handleEnquiryDelete} 
              />
            )}

            {activeTab === 'programs' && (
              <ProgramsView 
                list={data.programs} 
                onEdit={(item) => openEditForm('programs', item)} 
                onAdd={() => openAddForm('programs', { name: '', description: '', details: '', category: 'Academic', duration: '', fees: '', image: PRESET_IMAGES.Language, gallery: [] })} 
                onDelete={(id) => deleteItem('programs', id)} 
              />
            )}

            {activeTab === 'faculty' && (
              <FacultyView 
                list={data.faculty} 
                onEdit={(item) => openEditForm('faculty', item)} 
                onAdd={() => openAddForm('faculty', { name: '', qualification: '', experience: '', subjects: [], languages: [], bio: '', achievements: [], image: PRESET_IMAGES.Teacher, displayOrder: 5 })} 
                onDelete={(id) => deleteItem('faculty', id)} 
              />
            )}

            {activeTab === 'gallery' && (
              <GalleryView 
                list={data.gallery} 
                onEdit={(item) => openEditForm('gallery', item)} 
                onAdd={() => openAddForm('gallery', { url: PRESET_IMAGES.Classroom, category: 'Classroom', caption: '', isFeatured: false, isOnHomepage: true })} 
                onDelete={(id) => deleteItem('gallery', id)} 
              />
            )}

            {activeTab === 'testimonials' && (
              <TestimonialsView 
                list={data.testimonials} 
                onEdit={(item) => openEditForm('testimonials', item)} 
                onAdd={() => openAddForm('testimonials', { parentName: '', studentName: '', review: '', rating: 5, isFeatured: true })} 
                onDelete={(id) => deleteItem('testimonials', id)} 
              />
            )}

            {activeTab === 'achievers' && (
              <AchieversView 
                list={data.achievers} 
                onEdit={(item) => openEditForm('achievers', item)} 
                onAdd={() => openAddForm('achievers', { name: '', exam: '', score: '', year: new Date().getFullYear().toString(), achievement: '', image: '' })} 
                onDelete={(id) => deleteItem('achievers', id)} 
              />
            )}

            {activeTab === 'achievements' && (
              <AchievementsView 
                timeline={data.achievements.timeline} 
                awards={data.achievements.awards} 
                onEditTimeline={(item) => openEditForm('timeline', item)} 
                onAddTimeline={() => openAddForm('timeline', { year: '', title: '', description: '', image: '' })} 
                onDeleteTimeline={deleteTimelineEvent} 
                onEditAward={(item) => openEditForm('awards', item)} 
                onAddAward={() => openAddForm('awards', { title: '', issuer: '', year: '', description: '', image: '' })} 
                onDeleteAward={deleteAward} 
              />
            )}

            {activeTab === 'homepage' && (
              <HomepageSettingsView 
                settings={data.homepage} 
                onSave={updateHomepage} 
                onUpload={handleImageUpload} 
              />
            )}

            {activeTab === 'contact' && (
              <ContactSettingsView 
                settings={data.contact} 
                onSave={updateContact} 
              />
            )}

            {activeTab === 'seo' && (
              <SEOSettingsView 
                settings={data.seo} 
                onSave={updateSEO} 
              />
            )}

            {activeTab === 'popup' && (
              <PopupSettingsView 
                settings={data.popupNotice} 
                onSave={updatePopupNotice} 
              />
            )}

            {activeTab === 'security' && (
              <SecuritySettingsView 
                currentPassword={data.adminPassword || 'SaiAcademy2026'} 
                onSave={updatePassword} 
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

/* ==========================================================================
   SUB VIEWS & FORM EDITORS
   ========================================================================== */

// Dashboard
function DashboardView({ data, enquiries, onStatusChange, onDelete }) {
  return (
    <div>
      <div className="admin-header">
        <div>
          <h2>Executive Dashboard</h2>
          <p className="admin-title-desc">Key metrics and recent website inquiries from parent forms.</p>
        </div>
      </div>

      <div className="admin-dashboard-grid">
        <div className="card admin-metric-card glass">
          <div className="admin-metric-icon"><Users size={20} /></div>
          <div className="admin-metric-info">
            <div className="admin-metric-val">{data.programs.length}</div>
            <div className="admin-metric-lbl">Total Programs</div>
          </div>
        </div>
        <div className="card admin-metric-card glass">
          <div className="admin-metric-icon" style={{ color: 'hsl(var(--secondary))', background: 'hsl(var(--secondary) / 0.1)' }}><Users size={20} /></div>
          <div className="admin-metric-info">
            <div className="admin-metric-val">{data.faculty.length}</div>
            <div className="admin-metric-lbl">Active Faculty</div>
          </div>
        </div>
        <div className="card admin-metric-card glass">
          <div className="admin-metric-icon"><Image size={20} /></div>
          <div className="admin-metric-info">
            <div className="admin-metric-val">{data.gallery.length}</div>
            <div className="admin-metric-lbl">Gallery Photos</div>
          </div>
        </div>
        <div className="card admin-metric-card glass">
          <div className="admin-metric-icon" style={{ color: 'hsl(var(--success))', background: 'hsl(var(--success) / 0.1)' }}><MessageSquare size={20} /></div>
          <div className="admin-metric-info">
            <div className="admin-metric-val">{enquiries.length}</div>
            <div className="admin-metric-lbl">Enquiries Received</div>
          </div>
        </div>
      </div>

      <div className="admin-card-header">
        <h3>Recent Admission Enquiries</h3>
      </div>

      {enquiries.length > 0 ? (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Student Details</th>
                <th>Course / Mode</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map(enq => (
                <tr key={enq.id}>
                  <td>{enq.date}</td>
                  <td>
                    <strong>{enq.name}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>Phone: {enq.phone}</div>
                    <div style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>Email: {enq.email}</div>
                  </td>
                  <td>
                    <div>{enq.course}</div>
                    <span className="faculty-chip" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem' }}>{enq.mode}</span>
                  </td>
                  <td style={{ maxWidth: '240px', fontSize: '0.85rem' }}>{enq.message}</td>
                  <td>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      padding: '0.2rem 0.5rem', 
                      borderRadius: '4px',
                      background: enq.status === 'New' ? 'hsl(var(--error) / 0.15)' : 'hsl(var(--success) / 0.15)',
                      color: enq.status === 'New' ? 'hsl(var(--error))' : 'hsl(var(--success))'
                    }}>
                      {enq.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions-cell">
                      {enq.status === 'New' && (
                        <button 
                          onClick={() => onStatusChange(enq.id, 'Contacted')}
                          className="btn btn-outline admin-btn-sm" 
                          style={{ borderColor: 'hsl(var(--success) / 0.5)', color: 'hsl(var(--success))' }}
                          title="Mark contacted"
                        >
                          <Check size={12} />
                        </button>
                      )}
                      <button 
                        onClick={() => onDelete(enq.id)}
                        className="btn btn-outline admin-btn-sm" 
                        style={{ color: 'hsl(var(--error))' }}
                        title="Delete enquiry"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card glass" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'hsl(var(--text-secondary))' }}>No enquiries received yet. Try filling out the contact form on the public page!</p>
        </div>
      )}
    </div>
  );
}

// Programs list
function ProgramsView({ list, onEdit, onAdd, onDelete }) {
  return (
    <div>
      <div className="admin-header">
        <div>
          <h2>Manage Programs Offered</h2>
          <p className="admin-title-desc">Add, edit, or remove academic courses appearing on the syllabus page.</p>
        </div>
        <button onClick={onAdd} className="btn btn-primary"><Plus size={16} /> Add Program</button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Program Name</th>
              <th>Category</th>
              <th>Duration</th>
              <th>Tuition Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map(p => (
              <tr key={p.id}>
                <td><img src={p.image} alt={p.name} className="admin-table-thumb" /></td>
                <td><strong>{p.name}</strong><div style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.description}</div></td>
                <td>{p.category}</td>
                <td>{p.duration}</td>
                <td>{p.fees}</td>
                <td>
                  <div className="admin-actions-cell">
                    <button onClick={() => onEdit(p)} className="btn btn-outline admin-btn-sm"><Edit size={12} /></button>
                    <button onClick={() => { if(window.confirm(`Delete ${p.name}?`)) onDelete(p.id); }} className="btn btn-outline admin-btn-sm" style={{ color: 'hsl(var(--error))' }}><Trash2 size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Program Form Editor
function ProgramFormEditor({ item, onSave, onUpload }) {
  const [state, setState] = useState({ ...item });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handlePresetSelect = (url) => {
    setState(prev => ({ ...prev, image: url }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(state);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Program Title *</label>
          <input type="text" name="name" className="form-input" required value={state.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Category *</label>
          <select name="category" className="form-select" value={state.category} onChange={handleChange}>
            <option value="Academic">Academic Tuition</option>
            <option value="Languages">Languages</option>
          </select>
        </div>
        <div className="form-group full-width">
          <label className="form-label">Short Description (for cards) *</label>
          <input type="text" name="description" className="form-input" required value={state.description} onChange={handleChange} />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Detailed Syllabus details (shows on individual page) *</label>
          <textarea name="details" className="form-textarea" required value={state.details} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label className="form-label">Class Duration *</label>
          <input type="text" name="duration" className="form-input" required value={state.duration} onChange={handleChange} placeholder="e.g. 3 Months (36 hours)" />
        </div>
        <div className="form-group">
          <label className="form-label">Tuition Fee *</label>
          <input type="text" name="fees" className="form-input" required value={state.fees} onChange={handleChange} placeholder="e.g. Rs. 2,000/month" />
        </div>
        
        {/* Clickable Image Upload Block */}
        <div className="form-group full-width">
          <label className="form-label">Program Banner Photo *</label>
          <div style={{ marginTop: '0.5rem' }}>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => onUpload(e, (base64) => setState(prev => ({ ...prev, image: base64 })))} 
              id="file-program-image"
              style={{ display: 'none' }}
            />
            <label 
              htmlFor="file-program-image" 
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '1rem',
                border: '2px dashed hsl(var(--card-border))',
                borderRadius: '12px',
                padding: '2rem',
                cursor: 'pointer',
                textAlign: 'center',
                background: 'hsl(var(--background) / 0.3)',
                transition: 'all 0.2s ease',
                minHeight: '180px'
              }}
            >
              {state.image ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <img 
                    src={state.image} 
                    alt="Preview" 
                    style={{ maxWidth: '200px', maxHeight: '120px', borderRadius: '8px', objectFit: 'cover', border: '1px solid hsl(var(--card-border))' }} 
                  />
                  <span style={{ fontSize: '0.85rem', color: 'hsl(var(--primary))', fontWeight: 600 }}>Click to Upload/Change Photo</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'hsl(var(--text-secondary))' }}>
                  <Upload size={28} style={{ color: 'hsl(var(--text-muted))' }} />
                  <div>
                    <span style={{ fontWeight: 700, color: 'hsl(var(--primary))' }}>Click to Browse Files</span>
                    <p style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', marginTop: '0.25rem' }}>Upload from phone folder or laptop</p>
                  </div>
                </div>
              )}
            </label>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary"><Save size={16} /> Save Program</button>
      </div>
    </form>
  );
}

// Faculty Listing
function FacultyView({ list, onEdit, onAdd, onDelete }) {
  return (
    <div>
      <div className="admin-header">
        <div>
          <h2>Manage Faculty Brochure</h2>
          <p className="admin-title-desc">Define details for instructors. Appears styled like an educational brochure.</p>
        </div>
        <button onClick={onAdd} className="btn btn-primary"><Plus size={16} /> Add Teacher</button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Teacher Name</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Display Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map(f => (
              <tr key={f.id}>
                <td><img src={f.image} alt={f.name} className="admin-table-thumb" /></td>
                <td><strong>{f.name}</strong></td>
                <td>{f.qualification}</td>
                <td>{f.experience}</td>
                <td>{f.displayOrder || 9}</td>
                <td>
                  <div className="admin-actions-cell">
                    <button onClick={() => onEdit(f)} className="btn btn-outline admin-btn-sm"><Edit size={12} /></button>
                    <button onClick={() => { if(window.confirm(`Delete ${f.name}?`)) onDelete(f.id); }} className="btn btn-outline admin-btn-sm" style={{ color: 'hsl(var(--error))' }}><Trash2 size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Faculty Form Editor
function FacultyFormEditor({ item, onSave, onUpload }) {
  const [state, setState] = useState({
    ...item,
    subjects: Array.isArray(item.subjects) ? item.subjects.join(', ') : item.subjects || '',
    languages: Array.isArray(item.languages) ? item.languages.join(', ') : item.languages || '',
    achievements: Array.isArray(item.achievements) ? item.achievements.join(', ') : item.achievements || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert comma strings back to clean arrays
    const formatted = {
      ...state,
      subjects: state.subjects.split(',').map(s => s.trim()).filter(Boolean),
      languages: state.languages.split(',').map(l => l.trim()).filter(Boolean),
      achievements: state.achievements.split(',').map(a => a.trim()).filter(Boolean),
      displayOrder: parseInt(state.displayOrder || 5)
    };
    onSave(formatted);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Faculty Name *</label>
          <input type="text" name="name" className="form-input" required value={state.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Qualification *</label>
          <input type="text" name="qualification" className="form-input" required value={state.qualification} onChange={handleChange} placeholder="e.g. M.A Hindi | B.Ed" />
        </div>
        <div className="form-group">
          <label className="form-label">Experience *</label>
          <input type="text" name="experience" className="form-input" required value={state.experience} onChange={handleChange} placeholder="e.g. 15 Years Experience" />
        </div>
        <div className="form-group">
          <label className="form-label">Display Priority Order *</label>
          <input type="number" name="displayOrder" className="form-input" required value={state.displayOrder} onChange={handleChange} placeholder="e.g. 1 (first), 2, 3" />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Subjects/Specializations (comma separated) *</label>
          <input type="text" name="subjects" className="form-input" required value={state.subjects} onChange={handleChange} placeholder="Spoken Hindi, CBSE Hindi, Maths" />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Languages spoken (comma separated) *</label>
          <input type="text" name="languages" className="form-input" required value={state.languages} onChange={handleChange} placeholder="Hindi, English, Tamil" />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Honours / Awards (comma separated)</label>
          <input type="text" name="achievements" className="form-input" value={state.achievements} onChange={handleChange} placeholder="Best Hindi Educator 2024, Centum Coaching Badge" />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Short Professional Biography *</label>
          <textarea name="bio" className="form-textarea" required value={state.bio} onChange={handleChange}></textarea>
        </div>

        {/* Clickable Image Upload Block */}
        <div className="form-group full-width">
          <label className="form-label">Teacher Photo *</label>
          <div style={{ marginTop: '0.5rem' }}>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => onUpload(e, (base64) => setState(prev => ({ ...prev, image: base64 })))} 
              id="file-faculty-image"
              style={{ display: 'none' }}
            />
            <label 
              htmlFor="file-faculty-image" 
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '1rem',
                border: '2px dashed hsl(var(--card-border))',
                borderRadius: '12px',
                padding: '2rem',
                cursor: 'pointer',
                textAlign: 'center',
                background: 'hsl(var(--background) / 0.3)',
                transition: 'all 0.2s ease',
                minHeight: '180px'
              }}
            >
              {state.image ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <img 
                    src={state.image} 
                    alt="Preview" 
                    style={{ maxWidth: '200px', maxHeight: '120px', borderRadius: '8px', objectFit: 'cover', border: '1px solid hsl(var(--card-border))' }} 
                  />
                  <span style={{ fontSize: '0.85rem', color: 'hsl(var(--primary))', fontWeight: 600 }}>Click to Upload/Change Photo</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'hsl(var(--text-secondary))' }}>
                  <Upload size={28} style={{ color: 'hsl(var(--text-muted))' }} />
                  <div>
                    <span style={{ fontWeight: 700, color: 'hsl(var(--primary))' }}>Click to Browse Files</span>
                    <p style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', marginTop: '0.25rem' }}>Upload from phone folder or laptop</p>
                  </div>
                </div>
              )}
            </label>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary"><Save size={16} /> Save Teacher Profile</button>
      </div>
    </form>
  );
}

// Gallery Media View
function GalleryView({ list, onEdit, onAdd, onDelete }) {
  return (
    <div>
      <div className="admin-header">
        <div>
          <h2>Manage Gallery Media</h2>
          <p className="admin-title-desc">Control images shown in lightbox. Toggle featured to show on home screen.</p>
        </div>
        <button onClick={onAdd} className="btn btn-primary"><Plus size={16} /> Add Photo</button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Caption</th>
              <th>Category</th>
              <th>Home View</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map(g => (
              <tr key={g.id}>
                <td><img src={g.url} alt={g.caption} className="admin-table-thumb" /></td>
                <td><strong>{g.caption || '(No caption)'}</strong></td>
                <td>{g.category}</td>
                <td>{g.isOnHomepage ? 'Yes' : 'No'}</td>
                <td>{g.isFeatured ? 'Yes' : 'No'}</td>
                <td>
                  <div className="admin-actions-cell">
                    <button onClick={() => onEdit(g)} className="btn btn-outline admin-btn-sm"><Edit size={12} /></button>
                    <button onClick={() => { if(window.confirm('Delete photo?')) onDelete(g.id); }} className="btn btn-outline admin-btn-sm" style={{ color: 'hsl(var(--error))' }}><Trash2 size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Gallery Form Editor
function GalleryFormEditor({ item, onSave, onUpload }) {
  const [state, setState] = useState({ ...item });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setState(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(state);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Category *</label>
          <select name="category" className="form-select" value={state.category} onChange={handleChange}>
            <option value="Classroom">Classroom</option>
            <option value="Graduation">Graduation</option>
            <option value="Cultural Events">Cultural Events</option>
            <option value="Drawing">Drawing</option>
            <option value="Dance">Dance</option>
            <option value="Award Functions">Award Functions</option>
            <option value="Student Activities">Student Activities</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Caption *</label>
          <input type="text" name="caption" className="form-input" required value={state.caption} onChange={handleChange} placeholder="Describe the photo event" />
        </div>
        
        {/* Clickable Image Upload Block */}
        <div className="form-group full-width">
          <label className="form-label">Gallery Image *</label>
          <div style={{ marginTop: '0.5rem' }}>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => onUpload(e, (base64) => setState(prev => ({ ...prev, url: base64 })))} 
              id="file-gallery-image"
              style={{ display: 'none' }}
            />
            <label 
              htmlFor="file-gallery-image" 
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '1rem',
                border: '2px dashed hsl(var(--card-border))',
                borderRadius: '12px',
                padding: '2rem',
                cursor: 'pointer',
                textAlign: 'center',
                background: 'hsl(var(--background) / 0.3)',
                transition: 'all 0.2s ease',
                minHeight: '180px'
              }}
            >
              {state.url ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <img 
                    src={state.url} 
                    alt="Preview" 
                    style={{ maxWidth: '200px', maxHeight: '120px', borderRadius: '8px', objectFit: 'cover', border: '1px solid hsl(var(--card-border))' }} 
                  />
                  <span style={{ fontSize: '0.85rem', color: 'hsl(var(--primary))', fontWeight: 600 }}>Click to Upload/Change Photo</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'hsl(var(--text-secondary))' }}>
                  <Upload size={28} style={{ color: 'hsl(var(--text-muted))' }} />
                  <div>
                    <span style={{ fontWeight: 700, color: 'hsl(var(--primary))' }}>Click to Browse Files</span>
                    <p style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', marginTop: '0.25rem' }}>Upload from phone folder or laptop</p>
                  </div>
                </div>
              )}
            </label>
          </div>
        </div>

        <div className="form-group" style={{ flexDirection: 'row', gap: '0.5rem', alignItems: 'center' }}>
          <input type="checkbox" id="isOnHomepage" name="isOnHomepage" checked={state.isOnHomepage} onChange={handleChange} />
          <label htmlFor="isOnHomepage" className="form-label" style={{ cursor: 'pointer', marginBottom: 0 }}>Show on Home Screen</label>
        </div>

        <div className="form-group" style={{ flexDirection: 'row', gap: '0.5rem', alignItems: 'center' }}>
          <input type="checkbox" id="isFeatured" name="isFeatured" checked={state.isFeatured} onChange={handleChange} />
          <label htmlFor="isFeatured" className="form-label" style={{ cursor: 'pointer', marginBottom: 0 }}>Mark Featured</label>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary"><Save size={16} /> Save Image</button>
      </div>
    </form>
  );
}

// Testimonials list
function TestimonialsView({ list, onEdit, onAdd, onDelete }) {
  return (
    <div>
      <div className="admin-header">
        <div>
          <h2>Manage Client Testimonials</h2>
          <p className="admin-title-desc">Control Parent reviews. Mark featured reviews to trigger them in home carousel.</p>
        </div>
        <button onClick={onAdd} className="btn btn-primary"><Plus size={16} /> Add Review</button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Parent Name</th>
              <th>Student Name</th>
              <th>Review Text</th>
              <th>Rating</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map(t => (
              <tr key={t.id}>
                <td><strong>{t.parentName}</strong></td>
                <td>{t.studentName}</td>
                <td style={{ maxWidth: '300px', fontSize: '0.85rem' }}>{t.review}</td>
                <td>{t.rating} Stars</td>
                <td>{t.isFeatured ? 'Featured' : 'Regular'}</td>
                <td>
                  <div className="admin-actions-cell">
                    <button onClick={() => onEdit(t)} className="btn btn-outline admin-btn-sm"><Edit size={12} /></button>
                    <button onClick={() => { if(window.confirm('Delete review?')) onDelete(t.id); }} className="btn btn-outline admin-btn-sm" style={{ color: 'hsl(var(--error))' }}><Trash2 size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Testimonials form
function TestimonialFormEditor({ item, onSave }) {
  const [state, setState] = useState({ ...item });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setState(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...state, rating: parseInt(state.rating) });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Parent Name *</label>
          <input type="text" name="parentName" className="form-input" required value={state.parentName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Student Name *</label>
          <input type="text" name="studentName" className="form-input" required value={state.studentName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Rating *</label>
          <select name="rating" className="form-select" value={state.rating} onChange={handleChange}>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
          </select>
        </div>
        <div className="form-group" style={{ flexDirection: 'row', gap: '0.5rem', alignItems: 'center', marginTop: '1.75rem' }}>
          <input type="checkbox" id="isFeatured" name="isFeatured" checked={state.isFeatured} onChange={handleChange} />
          <label htmlFor="isFeatured" className="form-label" style={{ cursor: 'pointer', marginBottom: 0 }}>Show on Homepage Slider</label>
        </div>
        <div className="form-group full-width">
          <label className="form-label">Parent Review Text *</label>
          <textarea name="review" className="form-textarea" required value={state.review} onChange={handleChange}></textarea>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary"><Save size={16} /> Save Review</button>
      </div>
    </form>
  );
}

// Achievers list
function AchieversView({ list, onEdit, onAdd, onDelete }) {
  return (
    <div>
      <div className="admin-header">
        <div>
          <h2>Manage Student Achievers Grid</h2>
          <p className="admin-title-desc">Display toppers, scores, and board exam years. Instantly builds parent trust.</p>
        </div>
        <button onClick={onAdd} className="btn btn-primary"><Plus size={16} /> Add Topper</button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Topper Photo</th>
              <th>Student Name</th>
              <th>Exam Name</th>
              <th>Score / Marks</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map(s => (
              <tr key={s.id}>
                <td>
                  {s.image ? (
                    <img src={s.image} alt={s.name} className="admin-table-thumb" />
                  ) : (
                    <div style={{ width: '40px', height: '40px', background: 'hsl(var(--card-border) / 0.5)', borderRadius: '6px' }}></div>
                  )}
                </td>
                <td><strong>{s.name}</strong></td>
                <td>{s.exam}</td>
                <td><strong style={{ color: 'hsl(var(--secondary))' }}>{s.score}</strong></td>
                <td>{s.year}</td>
                <td>
                  <div className="admin-actions-cell">
                    <button onClick={() => onEdit(s)} className="btn btn-outline admin-btn-sm"><Edit size={12} /></button>
                    <button onClick={() => { if(window.confirm('Delete student achiever?')) onDelete(s.id); }} className="btn btn-outline admin-btn-sm" style={{ color: 'hsl(var(--error))' }}><Trash2 size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Achievers Form Editor
function AchieversFormEditor({ item, onSave, onUpload }) {
  const [state, setState] = useState({ ...item });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(state);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Student Name *</label>
          <input type="text" name="name" className="form-input" required value={state.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Exam Title *</label>
          <input type="text" name="exam" className="form-input" required value={state.exam} onChange={handleChange} placeholder="e.g. CBSE Class 10 Hindi" />
        </div>
        <div className="form-group">
          <label className="form-label">Marks/Rank Secured *</label>
          <input type="text" name="score" className="form-input" required value={state.score} onChange={handleChange} placeholder="e.g. 99/100, Gold Medalist" />
        </div>
        <div className="form-group">
          <label className="form-label">Passing Year *</label>
          <input type="text" name="year" className="form-input" required value={state.year} onChange={handleChange} placeholder="e.g. 2025" />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Topper Achievement details *</label>
          <input type="text" name="achievement" className="form-input" required value={state.achievement} onChange={handleChange} placeholder="e.g. Perfect centum points under Ramesh sir's guidance." />
        </div>
        
        {/* Clickable Image Upload Block */}
        <div className="form-group full-width">
          <label className="form-label">Student Photo (or leave blank for default icon)</label>
          <div style={{ marginTop: '0.5rem' }}>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => onUpload(e, (base64) => setState(prev => ({ ...prev, image: base64 })))} 
              id="file-achiever-image"
              style={{ display: 'none' }}
            />
            <label 
              htmlFor="file-achiever-image" 
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '1rem',
                border: '2px dashed hsl(var(--card-border))',
                borderRadius: '12px',
                padding: '2rem',
                cursor: 'pointer',
                textAlign: 'center',
                background: 'hsl(var(--background) / 0.3)',
                transition: 'all 0.2s ease',
                minHeight: '180px'
              }}
            >
              {state.image ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <img 
                    src={state.image} 
                    alt="Preview" 
                    style={{ maxWidth: '200px', maxHeight: '120px', borderRadius: '8px', objectFit: 'cover', border: '1px solid hsl(var(--card-border))' }} 
                  />
                  <span style={{ fontSize: '0.85rem', color: 'hsl(var(--primary))', fontWeight: 600 }}>Click to Upload/Change Photo</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'hsl(var(--text-secondary))' }}>
                  <Upload size={28} style={{ color: 'hsl(var(--text-muted))' }} />
                  <div>
                    <span style={{ fontWeight: 700, color: 'hsl(var(--primary))' }}>Click to Browse Files</span>
                    <p style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', marginTop: '0.25rem' }}>Upload from phone folder or laptop</p>
                  </div>
                </div>
              )}
            </label>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary"><Save size={16} /> Save Achiever</button>
      </div>
    </form>
  );
}

// Achievements (Timeline and Awards)
function AchievementsView({ timeline, awards, onEditTimeline, onAddTimeline, onDeleteTimeline, onEditAward, onAddAward, onDeleteAward }) {
  return (
    <div>
      <div className="admin-header">
        <div>
          <h2>Manage Timeline & Awards</h2>
          <p className="admin-title-desc">Control historical achievements and official credentials.</p>
        </div>
      </div>

      {/* Timeline Editor */}
      <div style={{ marginBottom: '4rem' }}>
        <div className="admin-card-header">
          <h3>25-Year Journey Milestones</h3>
          <button onClick={onAddTimeline} className="btn btn-primary"><Plus size={16} /> Add Milestone</button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Milestone Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {timeline.map(t => (
                <tr key={t.id}>
                  <td><strong>{t.year}</strong></td>
                  <td><strong>{t.title}</strong></td>
                  <td style={{ fontSize: '0.85rem' }}>{t.description}</td>
                  <td>
                    <div className="admin-actions-cell">
                      <button onClick={() => onEditTimeline(t)} className="btn btn-outline admin-btn-sm"><Edit size={12} /></button>
                      <button onClick={() => { if(window.confirm('Delete timeline event?')) onDeleteTimeline(t.id); }} className="btn btn-outline admin-btn-sm" style={{ color: 'hsl(var(--error))' }}><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Awards Editor */}
      <div>
        <div className="admin-card-header">
          <h3>Academy Certificates & Awards</h3>
          <button onClick={onAddAward} className="btn btn-primary"><Plus size={16} /> Add Award</button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Award Name</th>
                <th>Issuing Authority</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {awards.map(a => (
                <tr key={a.id}>
                  <td><strong>{a.year}</strong></td>
                  <td><strong>{a.title}</strong></td>
                  <td>{a.issuer}</td>
                  <td style={{ fontSize: '0.85rem' }}>{a.description}</td>
                  <td>
                    <div className="admin-actions-cell">
                      <button onClick={() => onEditAward(a)} className="btn btn-outline admin-btn-sm"><Edit size={12} /></button>
                      <button onClick={() => { if(window.confirm('Delete award?')) onDeleteAward(a.id); }} className="btn btn-outline admin-btn-sm" style={{ color: 'hsl(var(--error))' }}><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Timeline Form Editor
function TimelineFormEditor({ item, onSave }) {
  const [state, setState] = useState({ ...item });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(state);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Milestone Year *</label>
          <input type="text" name="year" className="form-input" required value={state.year} onChange={handleChange} placeholder="e.g. 2001" />
        </div>
        <div className="form-group">
          <label className="form-label">Milestone Title *</label>
          <input type="text" name="title" className="form-input" required value={state.title} onChange={handleChange} placeholder="e.g. Inception of Academy" />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Description *</label>
          <textarea name="description" className="form-textarea" required value={state.description} onChange={handleChange}></textarea>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary"><Save size={16} /> Save Milestone</button>
      </div>
    </form>
  );
}

// Award Form Editor
function AwardFormEditor({ item, onSave }) {
  const [state, setState] = useState({ ...item });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(state);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Award Name *</label>
          <input type="text" name="title" className="form-input" required value={state.title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Issuing Authority *</label>
          <input type="text" name="issuer" className="form-input" required value={state.issuer} onChange={handleChange} placeholder="e.g. Hindi Sabha Council" />
        </div>
        <div className="form-group">
          <label className="form-label">Year Awarded *</label>
          <input type="text" name="year" className="form-input" required value={state.year} onChange={handleChange} placeholder="e.g. 2024" />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Brief Description *</label>
          <textarea name="description" className="form-textarea" required value={state.description} onChange={handleChange}></textarea>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary"><Save size={16} /> Save Award</button>
      </div>
    </form>
  );
}

// Homepage Settings
function HomepageSettingsView({ settings, onSave, onUpload }) {
  const [state, setState] = useState({
    heroTitle: settings.heroTitle,
    heroSubtitle: settings.heroSubtitle,
    heroCtaText: settings.heroCtaText,
    heroImage: settings.heroImage,
    stats: { ...settings.stats }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleStatChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      stats: { ...prev.stats, [name]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(state);
    alert("Homepage settings updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="admin-card-header" style={{ marginBottom: '1.5rem', borderBottom: '1px solid hsl(var(--card-border) / 0.5)', paddingBottom: '0.75rem' }}>
        <h3>Hero Banner Settings</h3>
      </div>
      
      <div className="form-grid">
        <div className="form-group full-width">
          <label className="form-label">Hero Title *</label>
          <input type="text" name="heroTitle" className="form-input" required value={state.heroTitle} onChange={handleChange} />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Hero Subtitle *</label>
          <textarea name="heroSubtitle" className="form-textarea" required value={state.heroSubtitle} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label className="form-label">CTA Button Label *</label>
          <input type="text" name="heroCtaText" className="form-input" required value={state.heroCtaText} onChange={handleChange} />
        </div>
        
        {/* Clickable Image Upload Block */}
        <div className="form-group full-width">
          <label className="form-label">Hero Banner Photo (Leave empty to show the Particle Shape animation)</label>
          <div style={{ marginTop: '0.5rem' }}>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => onUpload(e, (base64) => setState(prev => ({ ...prev, heroImage: base64 })))} 
              id="file-hero-image"
              style={{ display: 'none' }}
            />
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <label 
                htmlFor="file-hero-image" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '0.75rem',
                  border: '2px dashed hsl(var(--card-border))',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  background: 'hsl(var(--background) / 0.3)',
                  transition: 'all 0.2s ease',
                  minHeight: '100px',
                  flexGrow: 1
                }}
              >
                {state.heroImage ? (
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={state.heroImage} 
                      alt="Preview" 
                      style={{ maxWidth: '120px', maxHeight: '80px', borderRadius: '8px', objectFit: 'cover', border: '1px solid hsl(var(--card-border))' }} 
                    />
                    <span style={{ fontSize: '0.85rem', color: 'hsl(var(--primary))', fontWeight: 600 }}>Click to Change Photo</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'hsl(var(--text-secondary))' }}>
                    <Upload size={20} style={{ color: 'hsl(var(--text-muted))' }} />
                    <span style={{ fontWeight: 700, color: 'hsl(var(--primary))', fontSize: '0.9rem' }}>Click to Upload Photo</span>
                  </div>
                )}
              </label>
              
              {state.heroImage && (
                <button 
                  type="button" 
                  onClick={() => setState(prev => ({ ...prev, heroImage: "" }))} 
                  className="btn btn-outline"
                  style={{ color: 'hsl(var(--error))', borderColor: 'hsl(var(--error) / 0.3)', padding: '0.5rem 1rem' }}
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="admin-card-header" style={{ margin: '2.5rem 0 1.5rem', borderBottom: '1px solid hsl(var(--card-border) / 0.5)', paddingBottom: '0.75rem' }}>
        <h3>Statistics Counter Values</h3>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Years Experience *</label>
          <input type="text" name="experience" className="form-input" required value={state.stats.experience} onChange={handleStatChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Students Mentored *</label>
          <input type="text" name="students" className="form-input" required value={state.stats.students} onChange={handleStatChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Hindi Pandits *</label>
          <input type="text" name="teachers" className="form-input" required value={state.stats.teachers} onChange={handleStatChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Pass Percentage *</label>
          <input type="text" name="passRate" className="form-input" required value={state.stats.passRate} onChange={handleStatChange} />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary"><Save size={16} /> Save Homepage Settings</button>
      </div>
    </form>
  );
}

// Contact settings
function ContactSettingsView({ settings, onSave }) {
  const [state, setState] = useState({ ...settings });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(state);
    alert("Contact settings updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="admin-card-header" style={{ marginBottom: '1.5rem', borderBottom: '1px solid hsl(var(--card-border) / 0.5)', paddingBottom: '0.75rem' }}>
        <h3>Academy Contact Details</h3>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Contact Phone Number *</label>
          <input type="text" name="phone" className="form-input" required value={state.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address *</label>
          <input type="email" name="email" className="form-input" required value={state.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">WhatsApp Number (numbers only, no spaces/plus) *</label>
          <input type="text" name="whatsappNumber" className="form-input" required value={state.whatsappNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Working Hours *</label>
          <input type="text" name="workingHours" className="form-input" required value={state.workingHours} onChange={handleChange} />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Admissions Office Physical Address *</label>
          <input type="text" name="address" className="form-input" required value={state.address} onChange={handleChange} />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Google Maps iframe Embed URL *</label>
          <textarea name="googleMapUrl" className="form-textarea" style={{ minHeight: '80px' }} required value={state.googleMapUrl} onChange={handleChange} placeholder="Paste embed link src attribute"></textarea>
        </div>
        <div className="form-group full-width">
          <label className="form-label">Online Classes Information Details *</label>
          <textarea name="onlineClassesInfo" className="form-textarea" style={{ minHeight: '80px' }} required value={state.onlineClassesInfo} onChange={handleChange}></textarea>
        </div>
      </div>

      <div className="admin-card-header" style={{ margin: '2.5rem 0 1.5rem', borderBottom: '1px solid hsl(var(--card-border) / 0.5)', paddingBottom: '0.75rem' }}>
        <h3>Social Media Accounts</h3>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Facebook Profile Link</label>
          <input type="text" name="facebook" className="form-input" value={state.socialLinks.facebook} onChange={handleSocialChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Instagram Link</label>
          <input type="text" name="instagram" className="form-input" value={state.socialLinks.instagram} onChange={handleSocialChange} />
        </div>
        <div className="form-group">
          <label className="form-label">YouTube Channel</label>
          <input type="text" name="youtube" className="form-input" value={state.socialLinks.youtube} onChange={handleSocialChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Twitter / X profile</label>
          <input type="text" name="twitter" className="form-input" value={state.socialLinks.twitter} onChange={handleSocialChange} />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary"><Save size={16} /> Save Contact Details</button>
      </div>
    </form>
  );
}

// SEO settings
function SEOSettingsView({ settings, onSave }) {
  const [state, setState] = useState({ ...settings });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(state);
    alert("SEO meta configurations saved successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="admin-card-header" style={{ marginBottom: '1.5rem', borderBottom: '1px solid hsl(var(--card-border) / 0.5)', paddingBottom: '0.75rem' }}>
        <h3>SEO Search Engine Configuration</h3>
      </div>

      <div className="form-grid">
        <div className="form-group full-width">
          <label className="form-label">Meta HTML Document Title *</label>
          <input type="text" name="metaTitle" className="form-input" required value={state.metaTitle} onChange={handleChange} />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Meta Description Text *</label>
          <textarea name="metaDescription" className="form-textarea" required value={state.metaDescription} onChange={handleChange}></textarea>
        </div>
        <div className="form-group full-width">
          <label className="form-label">SEO Focus Keywords (comma separated) *</label>
          <input type="text" name="keywords" className="form-input" required value={state.keywords} onChange={handleChange} />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary"><Save size={16} /> Save SEO Tags</button>
      </div>
    </form>
  );
}

// Popup Alerts Settings
function PopupSettingsView({ settings, onSave }) {
  const [state, setState] = useState({ ...settings });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setState(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(state);
    alert("Popup notification alerts updated!");
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="admin-card-header" style={{ marginBottom: '1.5rem', borderBottom: '1px solid hsl(var(--card-border) / 0.5)', paddingBottom: '0.75rem' }}>
        <h3>Broadcast Alert Notification Popup</h3>
      </div>

      <div className="form-grid">
        <div className="form-group" style={{ flexDirection: 'row', gap: '0.5rem', alignItems: 'center', gridColumn: 'span 2' }}>
          <input type="checkbox" id="enabled" name="enabled" checked={state.enabled} onChange={handleChange} />
          <label htmlFor="enabled" className="form-label" style={{ cursor: 'pointer', marginBottom: 0 }}>Enable Broadcast Notice Popup on Live Site</label>
        </div>

        <div className="form-group">
          <label className="form-label">Notice Type *</label>
          <select name="type" className="form-select" value={state.type} onChange={handleChange}>
            <option value="Admission">Admissions Alert</option>
            <option value="Exam">Exam Schedule Notice</option>
            <option value="Holiday">Holiday Notification</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Notice Header/Title *</label>
          <input type="text" name="title" className="form-input" required value={state.title} onChange={handleChange} />
        </div>

        <div className="form-group full-width">
          <label className="form-label">Notice Details Message *</label>
          <textarea name="message" className="form-textarea" required value={state.message} onChange={handleChange}></textarea>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary"><Save size={16} /> Broadcast Notice</button>
      </div>
    </form>
  );
}

function SecuritySettingsView({ currentPassword, onSave }) {
  const [pass, setPass] = useState(currentPassword);
  const [confirmPass, setConfirmPass] = useState(currentPassword);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    if (pass !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }
    onSave(pass);
    alert("Security password changed successfully!");
  };
  
  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="admin-card-header" style={{ marginBottom: '1.5rem', borderBottom: '1px solid hsl(var(--card-border) / 0.5)', paddingBottom: '0.75rem' }}>
        <h3>Change Admin Security Password</h3>
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">New Password *</label>
          <input type="password" className="form-input" required value={pass} onChange={e => setPass(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Confirm Password *</label>
          <input type="password" className="form-input" required value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary"><Save size={16} /> Update Password</button>
      </div>
    </form>
  );
}
