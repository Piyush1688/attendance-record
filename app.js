// --- FIREBASE SETUP ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

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

// --- HELPER: Current Date ---
document.getElementById("current-date").textContent = new Date().toLocaleDateString();

// --- FETCH DATA FROM FIRESTORE ---
async function fetchAttendance() {
  const snapshot = await getDocs(collection(db, "attendance"));
  const data = snapshot.docs.map(doc => doc.data());
  console.log("Fetched data:", data);
  renderDashboard(data);
}

// --- RENDER DASHBOARD ---
function renderDashboard(data) {
  // Summary
  const total = data.length;
  const present = data.filter(s => s.status === "Present").length;
  const absent = total - present;
  const avgPercent = (
    data.reduce((acc, s) => acc + (s.totalPresent / (s.totalPresent + s.totalAbsent)) * 100, 0) / total
  ).toFixed(1);

  const cards = [
    { title: "Total Students", value: total },
    { title: "Present Today", value: present },
    { title: "Absent Today", value: absent },
    { title: "Average Attendance %", value: avgPercent + "%" }
  ];

  const container = document.getElementById("summary-cards");
  container.innerHTML = "";
  cards.forEach(card => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `<h2>${card.title}</h2><p>${card.value}</p>`;
    container.appendChild(div);
  });

  // Table
  const tbody = document.querySelector("#attendance-table tbody");
  tbody.innerHTML = "";
  data.forEach(s => {
    const percent = ((s.totalPresent / (s.totalPresent + s.totalAbsent)) * 100).toFixed(1);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.name}</td>
      <td>${s.status}</td>
      <td>${s.totalPresent}</td>
      <td>${s.totalAbsent}</td>
      <td>${percent}%</td>
    `;
    tbody.appendChild(tr);
  });

  // Charts
  renderCharts(data, present, absent);
}

// --- CHARTS ---
function renderCharts(data, presentCount, absentCount) {
  const lineCtx = document.getElementById("lineChart").getContext("2d");
  const pieCtx = document.getElementById("pieChart").getContext("2d");

  const trendLabels = data.map(s => s.name);
  const trendData = data.map(s =>
    ((s.totalPresent / (s.totalPresent + s.totalAbsent)) * 100).toFixed(1)
  );

  // Line Chart
  new Chart(lineCtx, {
    type: "bar",
    data: {
      labels: trendLabels,
      datasets: [
        {
          label: "Attendance %",
          data: trendData,
          backgroundColor: "rgba(78,115,223,0.6)",
        },
      ],
    },
    options: { responsive: true, scales: { y: { min: 0, max: 100 } } },
  });

  // Pie Chart
  new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: ["Present", "Absent"],
      datasets: [
        {
          data: [presentCount, absentCount],
          backgroundColor: ["#4e73df", "#e74a3b"],
        },
      ],
    },
    options: { responsive: true },
  });
}

// --- START ---
fetchAttendance();
