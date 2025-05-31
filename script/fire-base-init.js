const firebaseConfig = {
  apiKey: "AIzaSyB1YlS0g4RPKjlFMeuDX4c3LdXsTey7FKc",
  authDomain: "acaiteria-4200d.firebaseapp.com",
  projectId: "acaiteria-4200d",
  storageBucket: "acaiteria-4200d.firebasestorage.app",
  messagingSenderId: "1004075332299",
  appId: "1:1004075332299:web:bb1939811f702f91aba14e",
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Inicializa Firestore
const db = firebase.firestore();
