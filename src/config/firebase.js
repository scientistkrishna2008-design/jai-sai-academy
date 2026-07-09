import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace these placeholders with your actual keys from the Google Firebase Console!
// Create a web app in Firebase, enable Firestore database, and paste the config here.
const firebaseConfig = {
  apiKey: "AIzaSyDJuJkl9j6VcKiGenRZr3TvYqzx-tfGwuk",
  authDomain: "jsa-2026-sk.firebaseapp.com",
  projectId: "jsa-2026-sk",
  storageBucket: "jsa-2026-sk.firebasestorage.app",
  messagingSenderId: "281770520222",
  appId: "1:281770520222:web:eaa08f4c4f2dfbf509958f"
};

let app;
let db = null;
let isFirebaseConfigured = false;

// Check if keys are set
if (
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY" && 
  firebaseConfig.projectId !== "YOUR_FIREBASE_PROJECT_ID"
) {
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    db = getFirestore(app);
    isFirebaseConfigured = true;
    console.log("Firebase Firestore initialized successfully.");
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
} else {
  console.warn(
    "Firebase keys are set to placeholder. Operating in LOCAL_STORAGE mode fallback. " +
    "Configure your keys in src/config/firebase.js to sync data globally."
  );
}

export { db, isFirebaseConfigured };
