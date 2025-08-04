import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

function LocationMarker({ setFormData }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setFormData(prev => ({
        ...prev,
        latitude: lat.toFixed(6),
        longitude: lng.toFixed(6)
      }));
    }
  });
  return null;
}

function HostPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    rent: "",
    latitude: "",
    longitude: ""
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const { latitude, longitude, ...rest } = formData;
      const parsedLat = parseFloat(latitude);
      const parsedLng = parseFloat(longitude);

      if (isNaN(parsedLat) || isNaN(parsedLng)) {
        setMsg("❌ Please select a location on the map.");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/properties/add", {
        ...rest,
        rent: Number(formData.rent),
        latitude: parsedLat,
        longitude: parsedLng
      }, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      });

      setMsg("✅ Property added successfully!");
      setFormData({
        title: "",
        description: "",
        address: "",
        rent: "",
        latitude: "",
        longitude: ""
      });
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      setMsg(err.response?.data?.msg || "❌ Error submitting property.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">🏠 Add Rental Property</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full p-2 border rounded" type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <textarea className="w-full p-2 border rounded" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input className="w-full p-2 border rounded" type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input className="w-full p-2 border rounded" type="number" name="rent" placeholder="Rent (INR)" value={formData.rent} onChange={handleChange} required />

        <div className="h-64">
          <MapContainer center={[18.5204, 73.8567]} zoom={13} className="h-full rounded z-0">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <LocationMarker setFormData={setFormData} />
            {formData.latitude && formData.longitude && (
              <Marker position={[formData.latitude, formData.longitude]} />
            )}
          </MapContainer>
        </div>

        <div className="flex gap-4">
          <input className="w-full p-2 border rounded" type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} readOnly />
          <input className="w-full p-2 border rounded" type="text" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} readOnly />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
          Submit Listing
        </button>
      </form>

      {msg && <p className="mt-4 text-center font-medium">{msg}</p>}
    </div>
  );
}

export default HostPage;

// import React, { useState } from "react";
// import axios from "axios";

// function HostPage() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     address: "",
//     rent: "",
//     latitude: "",
//     longitude: ""
//   });

//   const [msg, setMsg] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");
//       const { latitude, longitude, ...rest } = formData;

//       const parsedLat = parseFloat(latitude);
//       const parsedLng = parseFloat(longitude);

//       if (isNaN(parsedLat) || isNaN(parsedLng)) {
//         setMsg("❌ Please enter valid numeric latitude and longitude.");
//         return;
//       }

//       const res = await axios.post("http://localhost:5000/api/properties/add", {
//         ...rest,
//         rent: Number(formData.rent),
//         latitude: parsedLat,
//         longitude: parsedLng
//       }, {
//         headers: {
//           Authorization: token,
//           "Content-Type": "application/json"
//         }
//       });

//       setMsg("✅ Property added successfully!");
//       setFormData({
//         title: "",
//         description: "",
//         address: "",
//         rent: "",
//         latitude: "",
//         longitude: ""
//       });
//     } catch (err) {
//       console.error("❌ Error:", err.response?.data || err.message);
//       setMsg(err.response?.data?.msg || "❌ Error submitting property.");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">🏠 Add Rental Property</h2>

//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input className="w-full p-2 border rounded" type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
//         <textarea className="w-full p-2 border rounded" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
//         <input className="w-full p-2 border rounded" type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
//         <input className="w-full p-2 border rounded" type="number" name="rent" placeholder="Rent (INR)" value={formData.rent} onChange={handleChange} required />
//         <input className="w-full p-2 border rounded" type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} required />
//         <input className="w-full p-2 border rounded" type="text" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} required />

//         <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
//           Submit Listing
//         </button>
//       </form>

//       {msg && <p className="mt-4 text-center font-medium">{msg}</p>}
//     </div>
//   );
// }

// export default HostPage;



// import React, { useState } from "react";
// import axios from "axios";

// function HostPage() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     address: "",
//     rent: "",
//     latitude: "",
//     longitude: ""
//   });

//   const [msg, setMsg] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.post("http://localhost:5000/api/properties/add", {
//         ...formData,
//         rent: Number(formData.rent),
//         latitude: parseFloat(formData.latitude),
//         longitude: parseFloat(formData.longitude)
//       }, {
//         headers: {
//           Authorization: token,
//           "Content-Type": "application/json"
//         }
//       });

//       setMsg("✅ Property added successfully!");
//       setFormData({
//         title: "",
//         description: "",
//         address: "",
//         rent: "",
//         latitude: "",
//         longitude: ""
//       });
//     } catch (err) {
//   console.error("❌ Error:", err.response?.data || err.message);
//   setMsg(err.response?.data?.msg || "❌ Error submitting property.");
// }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">🏠 Add Rental Property</h2>

//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input className="w-full p-2 border rounded" type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
//         <textarea className="w-full p-2 border rounded" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
//         <input className="w-full p-2 border rounded" type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
//         <input className="w-full p-2 border rounded" type="number" name="rent" placeholder="Rent (INR)" value={formData.rent} onChange={handleChange} required />
//         <input className="w-full p-2 border rounded" type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} required />
//         <input className="w-full p-2 border rounded" type="text" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} required />

//         <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
//           Submit Listing
//         </button>
//       </form>

//       {msg && <p className="mt-4 text-center font-medium">{msg}</p>}
//     </div>
//   );
// }

// export default HostPage;
