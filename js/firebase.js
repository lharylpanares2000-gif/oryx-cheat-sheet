// ============= Firebase =============
const firebaseConfig = {
  apiKey: "AIzaSyAyux2Zu-651KTK7w8BowxbV9Hjb6t_2UE",
  authDomain: "oryx-cheat-sheet.firebaseapp.com",
  projectId: "oryx-cheat-sheet",
  storageBucket: "oryx-cheat-sheet.firebasestorage.app",
  messagingSenderId: "449130107014",
  appId: "1:449130107014:web:6539982ce0bdc1fb910107"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const entriesCollection = db.collection('entries');
const suggestionsCollection = db.collection('suggestions');
const AUTHOR_KEY = 'oryx-cheatsheet-author-name';
const ADMIN_KEY = 'oryx-cheatsheet-admin';
const ADMIN_PASSCODE = 'OryxAdmin2026';   // soft gate — change this to your team's passcode
const syncStatusEl = document.getElementById('syncStatus');
