import { useState } from "react";
import { 
  getAuth, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { auth, db } from "../../firebase-config"; // ✅ Make sure this exports both auth and db

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser() {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    const rawEmail = email.trim().toLowerCase(); // ensure consistent email format
    const emailKey = rawEmail.replace(/\./g, "_");

    try {
      // 1️⃣ Check if pending user exists in RTDB
      const pendingSnap = await get(ref(db, `/BulSU_SmartGateAccessSystem/PendingUsers/${emailKey}`));

      if (pendingSnap.exists()) {
        const pdata = pendingSnap.val();

        if (pdata.tempPassword !== password) {
          alert("Incorrect password.");
          return;
        }

        // Remove pending record
        await remove(ref(db, `/BulSU_SmartGateAccessSystem/PendingUsers/${emailKey}`));

        // Create Firebase Auth user
        const userCredential = await createUserWithEmailAndPassword(auth, rawEmail, password);
        const uid = userCredential.user.uid;

        // Add to permanent user records
        await set(ref(db, `/BulSU_SmartGateAccessSystem/Users/${uid}`), {
          email: rawEmail,
          role: pdata.role,
          isActivated: false,
          contactNumber: "",
          lastName: "",
          addedBy: pdata.addedBy || "Unknown",
        });

        console.log("Account created! Proceeding to activation...");
        navigate("/activation");
        return;
      }

      // 2️⃣ If no pending record → try Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, rawEmail, password);
      alert("Login successful.");
      console.log("User:", userCredential.user.email);
      navigate("/dashboard");

    } catch (err) {
      console.error("Login error:", err.code, err.message);
      if (err.code === "auth/user-not-found") {
        alert("User not found.");
      } else if (err.code === "auth/wrong-password") {
        alert("Incorrect password.");
      } else if (err.code === "auth/invalid-email") {
        alert("Invalid email format.");
      } else {
        alert("Login failed. Please try again.");
      }
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      alert("Please enter your email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      alert(`Password reset link has been sent to ${email}. Please check your inbox.`);
    } catch (error) {
      console.error("Error sending reset email:", error.code);
      if (error.code === "auth/user-not-found") {
        alert("No account found with that email.");
      } else if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address.");
      } else {
        alert("Failed to send password reset email. Try again later.");
      }
    }
  }

  return (
    <div className="login-page">
      <div className="header1">
        <div className="logo">
          <img src="/bulsulogo.svg" alt="BULSU Logo" className="bulsuLogo" />
        </div>
        <h1>Welcome to BULSU</h1>
        <p className="subtitle">Student Gate Restriction System</p>
      </div>

      <div className="login-container">
        <div className="login-header1">
          <h2>Login Here</h2>
          <p>Sign in to access your account</p>
        </div>

        <div className="input-group">
          <i className="fa fa-user"></i>
          <input 
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="input-group">
          <i className="fa fa-lock"></i>
          <input 
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        <a className="forgot-password" onClick={handleForgotPassword}>
          Forgot Password?
        </a>

        <button onClick={loginUser} className="login-btn">Log In</button>
      </div>

      <p className="footer1">BSIT 3H-G2 (GROUP 1) - Final Project in IT305</p>
    </div>
  );
}

export default Login;
