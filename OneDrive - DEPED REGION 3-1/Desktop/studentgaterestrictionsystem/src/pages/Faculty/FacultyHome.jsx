import "./facultyhome.css";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, get } from "firebase/database";


    function FacultyHome() {

        const [user, setUser] = useState(null);
    
          useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, async (u) => {
              if (u) {
                setUser(u);
        
                // Fetch first name from Realtime Database
                const userRef = ref(db, `BulSU_SmartGateAccessSystem/Users/${u.uid}`);
                try {
                  const snapshot = await get(userRef);
                  if (snapshot.exists()) {
                    const userData = snapshot.val();
                  } else {
                    console.log("No user data found in database");
                  }
                } catch (error) {
                  console.error("Error fetching user data:", error);
                }
              } 
            });
        
            return () => unsubscribe(); // cleanup listener
          }, []);
        
          function logOut() {
            signOut(auth)
              .then(() => {
                console.log("Signed out successfully");
              })
              .catch((error) => {
                console.error("Error signing out:", error);
              });
          }

        return (
          <>
            <h1>FACULTY</h1>
            <button onClick={logOut}>Sign Out</button>
          </>
        )

};


export default FacultyHome;
