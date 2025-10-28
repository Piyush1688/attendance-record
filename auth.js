// --- IMPORTS ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

// --- FIREBASE CONFIG ---
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
const auth = getAuth(app);

// --- REGISTER ---
const registerBtn = document.getElementById("registerBtn");
if (registerBtn) {
  registerBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      alert("Registration successful!");
      window.location.href = "dashboard.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

// --- LOGIN ---
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } catch (error) {
      alert("Invalid credentials: " + error.message);
    }
  });
}

// --- LOGOUT (from sidebar) ---
const logoutLink = document.getElementById("logoutLink");
if (logoutLink) {
  logoutLink.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}

// --- PROTECT DASHBOARD ---
onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;

  // Redirect to login if not signed in
  if (!user && (path.endsWith("dashboard.html") || path.endsWith("/"))) {
    window.location.href = "login.html";
  }

  // Redirect to dashboard if signed in and trying to access login/register
  if (user && (path.endsWith("login.html") || path.endsWith("register.html") || path.endsWith("/"))) {
    window.location.href = "dashboard.html";
  }
});


