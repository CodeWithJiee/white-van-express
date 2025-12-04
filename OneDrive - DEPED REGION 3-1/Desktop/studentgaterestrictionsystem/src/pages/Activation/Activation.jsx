import { useEffect, useState } from "react";
import { update, ref, get } from "firebase/database";
import { auth, db } from "../../firebase-config";
import "./activation.css";

function Activation() {
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [assignedCampus, setAssignedCampus] = useState("");
  const [college, setCollege] = useState("");
  const [program, setProgram] = useState("");

  // dynamic Firebase data
  const [campuses, setCampuses] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [programs, setPrograms] = useState([]);

  // ✅ Fetch user's role
  useEffect(() => {
    const fetchRole = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userRef = ref(db, `BulSU_SmartGateAccessSystem/Users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setRole(data.role || "");
        }
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };
    fetchRole();
  }, []);

  // ✅ Fetch campuses on load
  useEffect(() => {
    const fetchCampuses = async () => {
      const campusesRef = ref(db, "BulSU_SmartGateAccessSystem/Campuses");
      const snapshot = await get(campusesRef);
      if (snapshot.exists()) {
        setCampuses(Object.keys(snapshot.val())); // ["Main Campus", ...]
      }
    };
    fetchCampuses();
  }, []);

  // ✅ When campus changes → load colleges
  const handleCampusChange = async (e) => {
    const selected = e.target.value;
    setAssignedCampus(selected);
    setCollege("");
    setProgram("");
    setColleges([]);
    setPrograms([]);

    const collegesRef = ref(
      db,
      `BulSU_SmartGateAccessSystem/Campuses/${selected}/colleges`
    );
    const snapshot = await get(collegesRef);
    if (snapshot.exists()) {
      setColleges(Object.keys(snapshot.val())); // ["College of Information and Communications Technology"]
    }
  };

  // ✅ When college changes → load programs
  const handleCollegeChange = async (e) => {
    const selected = e.target.value;
    setCollege(selected);
    setProgram("");
    setPrograms([]);

    const programsRef = ref(
      db,
      `BulSU_SmartGateAccessSystem/Campuses/${assignedCampus}/colleges/${selected}`
    );
    const snapshot = await get(programsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      setPrograms(Object.values(data)); // ["BSIT", "BSIS", ...]
    }
  };

  // ✅ Submit activation
  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("No user logged in");
      return;
    }

    if (!firstName || !lastName || !contactNumber) {
      alert("Please fill in all required fields.");
      return;
    }

    const userRef = ref(db, `BulSU_SmartGateAccessSystem/Users/${user.uid}`);
    const updateData = {
      firstName,
      lastName,
      contactNumber,
      isActivated: true,
    };

    if (role === "Faculty") {
      if (!assignedCampus || !college || !program) {
        alert("Please fill in campus, college, and program.");
        return;
      }
      updateData.assignedCampus = assignedCampus;
      updateData.college = college;
      updateData.program = program;
    } else if (role === "Guard") {
      if (!assignedCampus) {
        alert("Please select assigned campus.");
        return;
      }
      updateData.assignedCampus = assignedCampus;
    }

    try {
      await update(userRef, updateData);
      alert("Account activated successfully!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="activation-page">
      <div className="header">
        <div className="logo">
          <img src="/bulsulogo.svg" alt="BULSU Logo" className="bulsuLogo" />
        </div>
        <h1>Welcome to BULSU</h1>
        <p className="subtitle">Student Gate Restriction System</p>
      </div>

      <div className="activation-container">
        <div className="activation-header">
          <h2>Account Activation</h2>
          <p>Fill up the fields to activate your account.</p>
        </div>

        {/* Common Fields */}
        <div className="input-group1">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="input-group1">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="input-group1">
          <input
            type="text"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>

        {/* Role-Specific Fields */}
        {role === "Faculty" && (
          <>
            {/* Campus */}
            <div className="input-group1">
              <select
                value={assignedCampus}
                onChange={handleCampusChange}
                required
              >
                <option value="">Select Campus</option>
                {campuses.map((campus, index) => (
                  <option key={index} value={campus}>
                    {campus}
                  </option>
                ))}
              </select>
            </div>

            {/* College */}
            <div className="input-group1">
              <select
                value={college}
                onChange={handleCollegeChange}
                required
                disabled={!assignedCampus}
              >
                <option value="">Select College</option>
                {colleges.map((col, index) => (
                  <option key={index} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>

            {/* Program */}
            <div className="input-group1">
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                required
                disabled={!college}
              >
                <option value="">Select Program</option>
                {programs.map((prog, index) => (
                  <option key={index} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {role === "Guard" && (
          <div className="input-group1">
            <select
              value={assignedCampus}
              onChange={(e) => setAssignedCampus(e.target.value)}
              required
            >
              <option value="">Select Assigned Campus</option>
              {campuses.map((campus, index) => (
                <option key={index} value={campus}>
                  {campus}
                </option>
              ))}
            </select>
          </div>
        )}

        <button onClick={handleSubmit} className="activation-btn">
          Submit
        </button>
      </div>

      <p className="footer">BSIT 3H-G2 (GROUP 1) - Final Project in IT305</p>
    </div>
  );
}

export default Activation;
