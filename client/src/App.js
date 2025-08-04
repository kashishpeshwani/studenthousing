import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage";
import Dashboard from "./pages/Dashboard";
import HostDashboard from "./pages/HostDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import HostPage from "./pages/HostPage";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify/:id" element={<VerifyPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/host"
            element={
              <ProtectedRoute>
                <HostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// import React from "react"
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// //import { Button } from "./components/ui/button"
// import HomePage from  "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import VerifyPage from "./pages/VerifyPage"; // for email verification
// import ProtectedRoute from "./components/ProtectedRoute";
// import Dashboard from "./pages/Dashboard";
// import HostDashboard from "./pages/HostDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import HostPage from "./pages/HostPage";
// import StudentDashboard from "./pages/StudentDashboard";




// function App() {
//   return (
    
//       <Router>
//       <div className="p-4">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/verify/:id" element={<VerifyPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/verify/:id" element={<VerifyPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/host" element={<HostPage />} />
//           <Route path="/student-dashboard" element={<StudentDashboard />} />
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />

//           <Route path="/dashboard"
//             element={
//                 <ProtectedRoute>
//                    <Dashboard/>
//                 </ProtectedRoute>
//             }
//             />
//           <Route path="/host"
//             element={
//                 <ProtectedRoute>
//                     <HostDashboard />
//                 </ProtectedRoute>
//              }
//           />
//           <Route path="/admin"
//             element={
//                 <ProtectedRoute>
//                   <Route path="/admin-dashboard" element={<AdminDashboard />} />
//                   {/* <AdminDashboard /> */}
//                 </ProtectedRoute>
//               }
// />
  

//         </Routes>
//       </div>
//     </Router>
//   //    <div>
//   //   <Button variant="outline" className="ml-2">Outline</Button>
//   //   <HomePage />
//   // </div>

//     // <div className="bg-blue-500 text-white p-10 text-2xl">
//     //   ✅ Tailwind is working!
//     // </div>
//   );
// }
// export default App;