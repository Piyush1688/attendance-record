const admin = require("firebase-admin");

// Path to your downloaded service account JSON
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Student data to populate
const students = [
  { name: "Piyush Vyas", roll: 68, status: "Present", classYear: "4", section: "A", totalPresent: 92, totalAbsent: 8, date: "2025-10-11" },
  { name: "Vedanshu Nakade", roll: 80, status: "Present", classYear: "4", section: "A", totalPresent: 88, totalAbsent: 12, date: "2025-10-11" },
  { name: "Ranika Joshi", roll: 40, status: "Absent", classYear: "4", section: "A", totalPresent: 85, totalAbsent: 15, date: "2025-10-11" },
  { name: "Ruchita Kamble", roll: 76, status: "Present", classYear: "4", section: "A", totalPresent: 90, totalAbsent: 10, date: "2025-10-11" }
];

// Add students to Firestore
async function populate() {
  for (const student of students) {
    const docRef = await db.collection("attendance").add(student);
    console.log("Added:", student.name, "ID:", docRef.id);
  }
}

populate().then(() => console.log("All students added!")).catch(console.error);
