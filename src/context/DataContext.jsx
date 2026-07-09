import React, { createContext, useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const DataContext = createContext();

const DEFAULT_DATA = {
  adminPassword: "SaiAcademy2026",
  homepage: {
    heroTitle: "Empowering Minds, Shaping Brighter Futures",
    heroSubtitle: "Jai Sai Academy offers premium academic tuition, languages, and comprehensive skill development programs designed to unlock your child's full potential.",
    heroCtaText: "Apply Now",
    heroImage: "",
    stats: {
      experience: "25+",
      students: "5000+",
      teachers: "500+",
      passRate: "100%"
    },
    strengths: [
      { id: 'str-1', title: "Expert Faculty", desc: "Highly qualified and certified scholars dedicated to shaping your child's academic excellence through proven teaching methodologies." },
      { id: 'str-2', title: "Personalized Focus", desc: "Small batch sizes ensure every student receives the individual attention they require to succeed." },
      { id: 'str-4', title: "Flexibility", desc: "High-quality hybrid options supporting both interactive online and robust offline classrooms." }
    ],
    announcements: [
      { id: 'ann-1', text: "Admissions open for Academic Year 2026-27! Register for early bird discounts." },
      { id: 'ann-2', text: "Dakshin Bharat Hindi Prachar Sabha exam registrations close on 15th August." }
    ]
  },
  programs: [
    {
      id: 'prg-hindi-tuition',
      name: "Hindi Tuition",
      description: "Comprehensive school syllabus tuition tailored for CBSE, ICSE, and State Board curriculums.",
      details: "Our Hindi tuition covers standard-aligned course plans. We focus on grammar (Vyakaran), literature appreciation, composition writing, and improving reading and spelling proficiency. Progress tracking is done through regular evaluations and assessments.",
      duration: "Continuous (Academic Year)",
      fees: "Rs. 1,500/month",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800",
      category: "Academic",
      gallery: [
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      id: 'prg-spoken-hindi',
      name: "Spoken Hindi",
      description: "Build conversational confidence, correct pronunciation, and fluency in Hindi for all ages.",
      details: "Designed for non-native Hindi speakers, professionals, and students who want to speak fluent Hindi. Features dynamic conversational practice, everyday dialogue scenarios, vocabulary enhancement, and interactive debate sessions.",
      duration: "3 Months (36 hours)",
      fees: "Rs. 4,500 total",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
      category: "Languages",
      gallery: [
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      id: 'prg-dakshin-bharat',
      name: "Hindi Certifications by Dakshin Bharat Prachar Sabha",
      description: "Official preparation for standard certifications: Parichaya, Prathamic, Madhyama, Rashtrabhasha, etc.",
      details: "Comprehensive coaching for exams conducted by the Dakshin Bharat Hindi Prachar Sabha. Includes thorough textbook revisions, solving past years' question papers, and simulated mock exams under strict timings to ensure 100% success.",
      duration: "6 Months per grade",
      fees: "Rs. 3,500 per grade",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
      category: "Academic",
      gallery: []
    },
    {
      id: 'prg-cbse-tuition',
      name: "CBSE Core Tuition",
      description: "Rigorous academic coaching for grades 1 to 10 matching CBSE guidelines.",
      details: "Covers Core Subjects (Science, Math, Social Science, and English/Hindi). We prioritize NCERT textbook deep dives, basic concept clarity, detailed homework help, and weekly test series to boost school performance.",
      duration: "Full Year Program",
      fees: "Rs. 2,500/month",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
      category: "Academic",
      gallery: []
    },
    {
      id: 'prg-state-board',
      name: "State Board Tuition",
      description: "Targeted support for State Board syllabus highlighting excellence in board exams.",
      details: "Tailored to meet regional educational frameworks, focusing heavily on textbook syllabus mastery, board exam answer patterns, speed writing development, and targeted revisions of critical scoring sections.",
      duration: "Full Year Program",
      fees: "Rs. 2,000/month",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
      category: "Academic",
      gallery: []
    },
    {
      id: 'prg-mathematics',
      name: "Mathematics Masterclass",
      description: "Strengthening analytical skills, mathematical operations, and formula application.",
      details: "Comprehensive coaching for Math. From elementary arithmetic to advanced algebra, geometry, and calculus. Focuses on logic, shortcut solving techniques, step-by-step presentation, and stress-free problem solving.",
      duration: "Continuous",
      fees: "Rs. 1,800/month",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
      category: "Academic",
      gallery: []
    },
    {
      id: 'prg-physics',
      name: "Physics (Class 9-12)",
      description: "Visualizing concepts of mechanics, electricity, thermodynamics, and optics.",
      details: "Focused tutoring for senior students. Bridges mathematical formulas with physical concepts through simulations, problem-solving practices, and visual experiments to make Physics intuitive and engaging.",
      duration: "Academic Year",
      fees: "Rs. 2,000/month",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
      category: "Academic",
      gallery: []
    },
    {
      id: 'prg-chemistry',
      name: "Chemistry (Class 9-12)",
      description: "Mastering chemical reactions, periodic table concepts, and organic chemistry mechanisms.",
      details: "Interactive learning covering physical, organic, and inorganic chemistry. Focuses on reaction mechanisms, balancing equations, formula derivations, and writing clean, structured board exam answers.",
      duration: "Academic Year",
      fees: "Rs. 2,000/month",
      image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=80&w=800",
      category: "Academic",
      gallery: []
    }
  ],
  skills: [
    {
      id: 'skl-dance',
      name: "Dance & Creative Movement",
      description: "Classical and semi-classical Indian dance forms that build physical grace, expressions, and rhythm.",
      ageGroup: "5 to 16 Years",
      duration: "Ongoing (Bi-weekly classes)",
      delivery: "Offline Only",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800",
      gallery: []
    },
    {
      id: 'skl-drawing',
      name: "Drawing & Fine Arts",
      description: "Pencil sketching, shading, perspective drawing, and charcoal mediums for young artists.",
      ageGroup: "6 Years & Above",
      duration: "6 Months course",
      delivery: "Hybrid",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
      gallery: []
    },
    {
      id: 'skl-painting',
      name: "Canvas Painting",
      description: "Introduction to watercolors, acrylics, color mixing theory, and modern painting textures.",
      ageGroup: "8 Years & Above",
      duration: "4 Months course",
      delivery: "Offline Only",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800",
      gallery: []
    },
    {
      id: 'skl-spoken-english',
      name: "Spoken English & Grammar",
      description: "Enhance vocabulary, grammatical accuracy, public speaking confidence, and phonetics.",
      ageGroup: "7 to 15 Years",
      duration: "3 Months (Fast-track)",
      delivery: "Online & Offline",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800",
      gallery: []
    },
    {
      id: 'skl-soft-skills',
      name: "Soft Skills & Leadership",
      description: "Developing communication confidence, time management, active listening, and team collaboration.",
      ageGroup: "10 to 18 Years",
      duration: "2 Months",
      delivery: "Online Only",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      gallery: []
    },
    {
      id: 'skl-speed-writing',
      name: "Speed & Hand Writing Improvement",
      description: "Improving legibility, cursive styling, and hand coordination for exam writing speed.",
      ageGroup: "5 to 12 Years",
      duration: "1 Month",
      delivery: "Offline Only",
      image: "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?auto=format&fit=crop&q=80&w=800",
      gallery: []
    },
    {
      id: 'skl-music',
      name: 'Vocal Music & Instruments',
      description: 'Classical and contemporary vocal training along with basic keyboard and harmonium classes.',
      ageGroup: '5 Years & Above',
      duration: 'Ongoing',
      delivery: 'Hybrid',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
      gallery: []
    },
    {
      id: 'skl-yoga',
      name: 'Yoga & Meditation',
      description: 'Physical wellness, mental focus, and breathing exercises tailored for growing students.',
      ageGroup: '7 Years & Above',
      duration: 'Ongoing',
      delivery: 'Offline Only',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
      gallery: []
    }
  ],
  faculty: [
    {
      id: 'fac-priya-sharma',
      name: "Mrs. Priya Sharma",
      qualification: "M.A. Hindi | B.Ed | SET Qualified",
      experience: "15 Years Experience",
      subjects: ["Spoken Hindi", "CBSE Hindi Syllabus", "Dakshin Bharat Exams Coaching"],
      languages: ["Hindi", "English", "Tamil"],
      bio: "Mrs. Priya Sharma is a certified Hindi Pandit with over 15 years of teaching experience. She has guided hundreds of students to achieve 100% scores in CBSE board examinations and Dakshin Bharat Sabha credentials.",
      achievements: ["Best Hindi Educator Award 2024", "100% success rate in Rashtrabhasha exams"],
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800",
      displayOrder: 1
    },
    {
      id: 'fac-ramesh-kumar',
      name: "Mr. Ramesh Kumar",
      qualification: "M.Sc. Mathematics | B.Ed",
      experience: "18 Years Experience",
      subjects: ["Algebra", "Geometry", "Advanced Calculus", "CBSE Mathematics"],
      languages: ["English", "Tamil", "Telugu"],
      bio: "Mr. Ramesh makes mathematics fun and engaging by using logical breakdowns and simple methodologies. He is a senior mentor at Jai Sai Academy guiding high school students in competitive maths preparations.",
      achievements: ["Math Olympiad Coach certification", "Distinguished Faculty Honour"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
      displayOrder: 2
    },
    {
      id: 'fac-anitha-nair',
      name: "Dr. Anitha Nair",
      qualification: "Ph.D. in English Literature | B.Ed",
      experience: "12 Years Experience",
      subjects: ["Spoken English", "Soft Skills", "Public Speaking", "Creative Writing"],
      languages: ["English", "Malayalam", "Hindi"],
      bio: "Dr. Anitha specializes in speech therapy, phonetics, and leadership communication. She designs our custom soft-skills syllabus to prepare students for school debates and college interviews.",
      achievements: ["Excellence in Communication Pedagogy Award", "Author of 'English for Young Achievers'"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
      displayOrder: 3
    }
  ],
  achievements: {
    timeline: [
      { id: 't-1', year: "2001", title: "Inception of Jai Sai Academy", description: "Started as a small tuition hub with 15 students in a local room, specializing in Hindi and Mathematics.", image: "" },
      { id: 't-2', year: "2007", title: "Dakshin Bharat Sabha Center Accreditation", description: "Recognized as a premier center for national-level Hindi examinations, crossing 500 active students.", image: "" },
      { id: 't-3', year: "2013", title: "Expansion into Skill Development", description: "Introduced formal programs in classical dance, drawing, speed writing, and spoken english coaching.", image: "" },
      { id: 't-4', year: "2020", title: "Digital Hybrid Transition", description: "Successfully established interactive online classes with virtual whiteboards to connect global students.", image: "" },
      { id: 't-5', year: "2026", title: "Celebrating 25 Years of Excellence", description: "Serving over 5,000 alumni and sustaining a 100% passing average across board exams and sabha tests.", image: "" }
    ],
    awards: [
      { id: 'aw-1', title: "Best Education Academy in South Zone", issuer: "Educational Excellence Council", year: "2024", description: "Awarded for exceptional teaching quality, individual student focus, and language promotion.", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=300" },
      { id: 'aw-2', title: "100% Passing Excellence Badge", issuer: "Dakshin Bharat Hindi Prachar Sabha", year: "2025", description: "Presented to institutions displaying continuous top grade outcomes in regional evaluations.", image: "" }
    ]
  },
  achievers: [
    { id: 'ach-1', name: "Aarav Sharma", exam: "CBSE Class 10 Hindi", score: "99/100", year: "2025", achievement: "Scored perfect points in literature and top ranking in state.", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300" },
    { id: 'ach-2', name: "Sai Pranika", exam: "Rashtrabhasha Exam", score: "First Class with Distinction", year: "2025", achievement: "Secured top-level honors in Sabha exam under Mrs. Priya Sharma's mentorship.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300" },
    { id: 'ach-3', name: "Adithya V.", exam: "CBSE Class 10 Mathematics", score: "100/100", year: "2024", achievement: "Perfect centum scoring student, under Mr. Ramesh Kumar's guidance.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" },
    { id: 'ach-4', name: "Shruti Hegde", exam: "Inter-School Art Competition", score: "1st Place (Gold Medalist)", year: "2025", achievement: "Awarded top honor among 120 competitors in canvas shading & sketching.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300" }
  ],
  gallery: [
    { id: 'gal-1', url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800", category: "Classroom", caption: "Interactive Science coaching session using digital illustrations.", isFeatured: true, isOnHomepage: true },
    { id: 'gal-2', url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800", category: "Graduation", caption: "Annual convocation ceremony for Sabha examination scholars.", isFeatured: true, isOnHomepage: true },
    { id: 'gal-3', url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800", category: "Dance", caption: "Students practicing Classical dance mudras for annual cultural fest.", isFeatured: false, isOnHomepage: true },
    { id: 'gal-4', url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800", category: "Drawing", caption: "Sketching workshop showcasing beautiful student artworks.", isFeatured: false, isOnHomepage: true },
    { id: 'gal-5', url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800", category: "Cultural Events", caption: "Republic Day stage program at the main academy branch.", isFeatured: false, isOnHomepage: false },
    { id: 'gal-6', url: "https://images.unsplash.com/photo-1531844251246-9a1bfaae0d76?auto=format&fit=crop&q=80&w=800", category: "Award Functions", caption: "Honoring our mathematical centum achievers at standard felicitation.", isFeatured: true, isOnHomepage: false }
  ],
  testimonials: [
    { id: 'tst-1', parentName: "Rajesh Sharma", studentName: "Aarav Sharma", photo: "", review: "Jai Sai Academy transformed my son's approach to Hindi language studies. He was struggling with standard grammar, but under Priya Ma'am's patient guidance, he scored 99% in CBSE board exams. Highly recommend!", rating: 5, isFeatured: true },
    { id: 'tst-2', parentName: "Meenakshi V.", studentName: "Adithya V.", photo: "", review: "The maths coaching here is exceptional. Ramesh sir teaches logical breakdowns of algebra and trigonometry that school textbooks skip. My son got a perfect 100/100 core maths result.", rating: 5, isFeatured: true },
    { id: 'tst-3', parentName: "Karthik Subramanian", studentName: "Sai Pranika", photo: "", review: "Amazing language academy. Not only did my child pass all Dakshin Bharat Sabha levels, she also attends the Dance classes here. A highly holistic coaching institution.", rating: 5, isFeatured: true }
  ],
  contact: {
    phone: "+91 9080315139",
    email: "info@jaisaiacademy.com",
    address: "Jai Sai Academy, Plot No. 12, Gandhi Nagar Main Road, Ambattur - 600053",
    googleMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.423985790471!2d80.2520336!3d12.9766943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d6b4129b82b%3A0x6b14f828a2a912bb!2sAdyar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000",
    whatsappNumber: "9080315139",
    workingHours: "Mon - Sat: 9:00 AM - 8:00 PM, Sun: 10:00 AM - 2:00 PM",
    onlineClassesInfo: "Interactive online sessions are available worldwide via Google Meet / Zoom with digital whiteboards and video recordings.",
    socialLinks: {
      facebook: "https://facebook.com/jaisaiacademy",
      instagram: "https://instagram.com/jaisaiacademy",
      youtube: "https://youtube.com/jaisaiacademy",
      twitter: "https://twitter.com/jaisaiacademy"
    }
  },
  popupNotice: {
    enabled: true,
    type: "Admission",
    title: "Admissions Open for 2026-2027!",
    message: "Register now for CBSE Tuition (Grades 1-10), Spoken Hindi, and Sabha certification examinations. Limited batches available.",
    date: "2026-07-08"
  },
  seo: {
    metaTitle: "Jai Sai Academy - Best Hindi Tuition, Languages & Skill Development Center in Ambattur",
    metaDescription: "Welcome to Jai Sai Academy. We offer top-rated CBSE/State Board Tuitions, Hindi language certificates (Dakshin Bharat exams), Spoken English, Dance, and Art programs with a 100% pass guarantee.",
    keywords: "Hindi Tuition, Spoken Hindi, Dakshin Bharat Exams, CBSE Tuition, State Board Tuition, Mathematics, Physics, Chemistry, Dance, Art Academy Ambattur",
    ogImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
  }
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Initial sync load from localStorage as absolute fastest startup fallback
    const saved = localStorage.getItem('jaisai_academy_data');
    if (saved) {
      try {
        let parsed = JSON.parse(saved);
        // Migration patch: Inject Music and Yoga if they don't exist
        if (parsed.skills && !parsed.skills.some(s => s.id === 'skl-music')) {
          parsed.skills.push(DEFAULT_DATA.skills.find(s => s.id === 'skl-music'));
          parsed.skills.push(DEFAULT_DATA.skills.find(s => s.id === 'skl-yoga'));
          localStorage.setItem('jaisai_academy_data', JSON.stringify(parsed));
        }
        
        // Migration patch 2: Strengths update
        if (parsed.homepage && parsed.homepage.strengths) {
          let updated = false;
          const oldLen = parsed.homepage.strengths.length;
          parsed.homepage.strengths = parsed.homepage.strengths.filter(s => s.id !== 'str-3');
          if (parsed.homepage.strengths.length !== oldLen) updated = true;
          
          const expertStr = parsed.homepage.strengths.find(s => s.id === 'str-1');
          if (expertStr && expertStr.title !== "Expert Faculty") {
            expertStr.title = "Expert Faculty";
            updated = true;
          }
          
          if (updated) {
            localStorage.setItem('jaisai_academy_data', JSON.stringify(parsed));
          }
        }
        
        // Migration patch 3: Rename Hindi Certifications program
        if (parsed.programs) {
          let updated = false;
          const hindiProg = parsed.programs.find(p => p.id === 'prg-dakshin-bharat' || p.name.toLowerCase().includes('hindi certifications') || p.name === 'Dakshin Bharat Hindi Exams');
          if (hindiProg && hindiProg.name !== "Hindi Certifications by Dakshin Bharat Prachar Sabha") {
            hindiProg.name = "Hindi Certifications by Dakshin Bharat Prachar Sabha";
            updated = true;
          }
          if (updated) {
            localStorage.setItem('jaisai_academy_data', JSON.stringify(parsed));
          }
        }
        return parsed;
      } catch (e) {
        console.error("Local Storage parsing failed:", e);
      }
    }
    return DEFAULT_DATA;
  });

  const [loading, setLoading] = useState(isFirebaseConfigured);

  // Load from Firebase Firestore on startup if configured
  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    const fetchCloudData = async () => {
      try {
        const docRef = doc(db, 'academy', 'data');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const cloudData = docSnap.data();
          setData(cloudData);
          localStorage.setItem('jaisai_academy_data', JSON.stringify(cloudData));
        } else {
          // Document does not exist in Firestore yet, initialize it
          await setDoc(docRef, DEFAULT_DATA);
          setData(DEFAULT_DATA);
          localStorage.setItem('jaisai_academy_data', JSON.stringify(DEFAULT_DATA));
          console.log("Firestore collection seeded with default configurations.");
        }
      } catch (err) {
        console.error("Failed to load Firebase Firestore cloud data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCloudData();
  }, []);

  // Save changes locally and push to Cloud Firestore if connected
  const pushDataState = async (updatedData) => {
    setData(updatedData);
    localStorage.setItem('jaisai_academy_data', JSON.stringify(updatedData));
    
    // Sync SEO Title directly to browser tab
    if (updatedData.seo && updatedData.seo.metaTitle) {
      document.title = updatedData.seo.metaTitle;
    }

    if (isFirebaseConfigured) {
      try {
        const docRef = doc(db, 'academy', 'data');
        await setDoc(docRef, updatedData);
      } catch (err) {
        console.error("Error writing data state to Firebase Cloud Firestore:", err);
      }
    }
  };

  // State mutation functions (syncing automatically to state and cloud database)
  const updateHomepage = (homepageSettings) => {
    const updated = { ...data, homepage: { ...data.homepage, ...homepageSettings } };
    pushDataState(updated);
  };

  const updateContact = (contactSettings) => {
    const updated = { ...data, contact: { ...data.contact, ...contactSettings } };
    pushDataState(updated);
  };

  const updateSEO = (seoSettings) => {
    const updated = { ...data, seo: { ...data.seo, ...seoSettings } };
    pushDataState(updated);
  };

  const updatePopupNotice = (popupSettings) => {
    const updated = { ...data, popupNotice: { ...data.popupNotice, ...popupSettings } };
    pushDataState(updated);
  };

  const updatePassword = (newPassword) => {
    const updated = { ...data, adminPassword: newPassword };
    pushDataState(updated);
  };

  const saveItem = (section, item) => {
    const list = data[section] || [];
    const index = list.findIndex(i => i.id === item.id);
    let newList;
    if (index > -1) {
      newList = [...list];
      newList[index] = item;
    } else {
      newList = [...list, { ...item, id: item.id || `${section.slice(0, 3)}-${Date.now()}` }];
    }
    const updated = { ...data, [section]: newList };
    pushDataState(updated);
  };

  const deleteItem = (section, id) => {
    const updated = {
      ...data,
      [section]: (data[section] || []).filter(i => i.id !== id)
    };
    pushDataState(updated);
  };

  const saveTimelineEvent = (event) => {
    const timeline = data.achievements.timeline || [];
    const index = timeline.findIndex(e => e.id === event.id);
    let newTimeline;
    if (index > -1) {
      newTimeline = [...timeline];
      newTimeline[index] = event;
    } else {
      newTimeline = [...timeline, { ...event, id: `t-${Date.now()}` }];
    }
    newTimeline.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    
    const updated = {
      ...data,
      achievements: { ...data.achievements, timeline: newTimeline }
    };
    pushDataState(updated);
  };

  const deleteTimelineEvent = (id) => {
    const updated = {
      ...data,
      achievements: {
        ...data.achievements,
        timeline: (data.achievements.timeline || []).filter(e => e.id !== id)
      }
    };
    pushDataState(updated);
  };

  const saveAward = (award) => {
    const awards = data.achievements.awards || [];
    const index = awards.findIndex(a => a.id === award.id);
    let newAwards;
    if (index > -1) {
      newAwards = [...awards];
      newAwards[index] = award;
    } else {
      newAwards = [...awards, { ...award, id: `aw-${Date.now()}` }];
    }
    
    const updated = {
      ...data,
      achievements: { ...data.achievements, awards: newAwards }
    };
    pushDataState(updated);
  };

  const deleteAward = (id) => {
    const updated = {
      ...data,
      achievements: {
        ...data.achievements,
        awards: (data.achievements.awards || []).filter(a => a.id !== id)
      }
    };
    pushDataState(updated);
  };

  const resetAllData = () => {
    if (window.confirm("Are you sure you want to restore the website to its original factory defaults? All custom edits will be lost.")) {
      localStorage.removeItem('jaisai_academy_data');
      if (isFirebaseConfigured) {
        const docRef = doc(db, 'academy', 'data');
        setDoc(docRef, DEFAULT_DATA).then(() => {
          window.location.reload();
        });
      } else {
        setData(DEFAULT_DATA);
        window.location.reload();
      }
    }
  };

  return (
    <DataContext.Provider value={{
      data,
      loading,
      isCloud: isFirebaseConfigured,
      updateHomepage,
      updateContact,
      updateSEO,
      updatePopupNotice,
      updatePassword,
      saveItem,
      deleteItem,
      saveTimelineEvent,
      deleteTimelineEvent,
      saveAward,
      deleteAward,
      resetAllData
    }}>
      {children}
    </DataContext.Provider>
  );
};
