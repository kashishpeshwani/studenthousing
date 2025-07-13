import LogoutButton from "../components/LogoutButton";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">🛠️ Admin Panel</h1>
      <p className="text-gray-600 mb-6">Welcome {user?.name}</p>
      <LogoutButton />
    </div>
  );
}

export default AdminDashboard;
