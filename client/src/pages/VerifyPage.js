 import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function VerifyPage() {
  const { id } = useParams();
  const [status, setStatus] = useState("⏳ Verifying...");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/verify/${id}`);
        setStatus("✅ User verified! You can now log in.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);

      } catch (err) {
        setStatus("❌ Verification failed or link expired.");
      }
    };

    verifyUser();
  }, [id]);

 


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow text-xl text-center">
        {status}
      </div>
    </div>
  );
}

export default VerifyPage;
