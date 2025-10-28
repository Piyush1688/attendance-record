// Replace firebaseConfig with your config (modular v9 style)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBOlzMgjaaugPQYTGE2ICtwNs1envpkqbo",
  authDomain: "attendance-record-a28ff.firebaseapp.com",
  projectId: "attendance-record-a28ff",
  storageBucket: "attendance-record-a28ff.firebasestorage.app",
  messagingSenderId: "880634261655",
  appId: "1:880634261655:web:18048313a4885263f1b9d2",
  measurementId: "G-6YNG6J9Z8B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const students = [
  { name: "Piyush Vyas", roll: 68, status: "Present", classYear: "4", section: "A", totalPresent: 92, totalAbsent: 8, date: "2025-10-11" },
  { name: "Vedanshu Nakade", roll: 80, status: "Present", classYear: "4", section: "A", totalPresent: 88, totalAbsent: 12, date: "2025-10-11" },
  { name: "Ranika Joshi", roll: 40, status: "Absent", classYear: "4", section: "A", totalPresent: 85, totalAbsent: 15, date: "2025-10-11" },
  { name: "Ruchita Kamble", roll: 76, status: "Present", classYear: "4", section: "A", totalPresent: 90, totalAbsent: 10, date: "2025-10-11" }
];

students.forEach(async (student) => {
  try {
    const docRef = await addDoc(collection(db, "attendance"), student);
    console.log("Document added with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document:", e);
  }
});
