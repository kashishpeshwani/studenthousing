import LogoutButton from "../components/LogoutButton";

function HostDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">🏠 Welcome, {user?.name}</h1>
      <p className="text-gray-600 mb-6">Landlord Dashboard</p>
      <LogoutButton />
    </div>
  );
}

export default HostDashboard;
