import React, { useEffect, useState } from "react";
import axios from "axios";


function AdminDashboard() {
  const [properties, setProperties] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchUnverified = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/properties/unverified", {
        headers: { Authorization: token },
      });

      setProperties(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setMsg("❌ Failed to load unverified listings");
    }
  };

  const handleVerify = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.patch(`http://localhost:5000/api/properties/verify/${id}`, {}, {
        headers: { Authorization: token },
      });

      setMsg("✅ Property verified");
      setProperties(prev => prev.filter(prop => prop._id !== id));
    } catch (err) {
      console.error("Verify error:", err);
      setMsg("❌ Failed to verify property");
    }
  };

  useEffect(() => {
    fetchUnverified();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">🛠️ Admin Property Approval</h1>

      {msg && <p className="mb-4">{msg}</p>}

      {properties.length === 0 ? (
        <p>No pending properties</p>
      ) : (
        <div className="grid gap-4">
          {properties.map((prop) => (
            <div key={prop._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{prop.title}</h2>
              <p className="text-sm text-gray-600">{prop.description}</p>
              <p><strong>Address:</strong> {prop.address}</p>
              <p><strong>Rent:</strong> ₹{prop.rent}</p>
              <p><strong>Posted by:</strong> {prop.postedBy?.name} ({prop.postedBy?.email})</p>
              <button
                onClick={() => handleVerify(prop._id)}
                className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
              >
                ✅ Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;


// import LogoutButton from "../components/LogoutButton";

// function AdminDashboard() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-2">🛠️ Admin Panel</h1>
//       <p className="text-gray-600 mb-6">Welcome {user?.name}</p>
//       <LogoutButton />
//     </div>
//   );
// }

// export default AdminDashboard;
