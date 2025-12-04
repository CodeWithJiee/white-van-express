// AddUsers.jsx
import React, { useEffect, useState } from "react";
import "./addusers.css";
import { auth, db } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { ref, push, set } from "firebase/database";

function AddUsers() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Guard");
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setAdmin(u);
    });
    return () => unsub();
  }, []);

  async function addTheUser() {
    if (!email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    if (!admin) {
      alert("Only an admin can add Pending users. Please sign in as Admin.");
      return;
    }

    try {
      // WARNING: For demo only. Storing plain text password is insecure.
      const emailKey = email.trim().replace(/\./g, "_");
        await set(ref(db, `/BulSU_SmartGateAccessSystem/PendingUsers/${emailKey}`), {
            email: email.trim(),           // keep original case
            tempPassword: password,
            role,
            isActive: false,
            addedBy: admin.email,
            createdAt: new Date().toLocaleString()
        });


      alert("Pending user added to /pendingUsers. They will be able to log in and create their account.");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Error adding pending user:", err);
      alert("Error: " + err.message);
    }
  }

  return (
    <div className="add-user-container">
      <h2>Add User (Admin)</h2>

      <div className="input-group">
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Guard">Guard</option>
          <option value="Faculty">Faculty</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className="input-group">
        <label>Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter email"
        />
      </div>

      <div className="input-group">
        <label>Temporary Password:</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter temporary password"
          autoComplete="new-password"
        />
      </div>

      <button onClick={addTheUser}>Add User (create pending)</button>
    </div>
  );
}

export default AddUsers;
