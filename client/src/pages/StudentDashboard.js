import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

function StudentDashboard() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/properties/verified");
        setProperties(res.data);
      } catch (err) {
        console.error("❌ Error fetching properties:", err);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🏘️ Verified Rentals</h2>

      {/* Map */}
      <MapContainer center={[18.5204, 73.8567]} zoom={12} style={{ height: "400px", marginBottom: "1rem" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {properties.map((p) => (
          <Marker key={p._id} position={[p.location.coordinates[1], p.location.coordinates[0]]}>
            <Popup>
              <strong>{p.title}</strong><br />
              ₹{p.rent} - {p.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {properties.map((p) => (
          <div key={p._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p>{p.description}</p>
            <p><strong>₹{p.rent}</strong> /month</p>
            <p className="text-sm text-gray-600">{p.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentDashboard;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import "leaflet-defaulticon-compatibility";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// function StudentDashboard() {
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     const fetchProps = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/properties/verified");
//         setProperties(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching properties:", err);
//       }
//     };

//     fetchProps();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">🏘️ Available Rentals</h2>

//       {/* Map */}
//       <MapContainer center={[18.5204, 73.8567]} zoom={12} style={{ height: "400px", marginBottom: "1rem" }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         {properties.map((prop) => (
//           <Marker key={prop._id} position={[prop.location.coordinates[1], prop.location.coordinates[0]]}>
//             <Popup>
//               <strong>{prop.title}</strong><br />
//               ₹{prop.rent} - {prop.address}
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>

//       {/* Property Cards */}
//       <div className="grid gap-4 md:grid-cols-2">
//         {properties.map((prop) => (
//           <div key={prop._id} className="border p-4 rounded shadow">
//             <h3 className="text-xl font-semibold">{prop.title}</h3>
//             <p>{prop.description}</p>
//             <p><strong>₹{prop.rent}</strong> /month</p>
//             <p className="text-sm text-gray-600">{prop.address}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default StudentDashboard;
