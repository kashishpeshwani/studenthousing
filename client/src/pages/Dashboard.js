import LogoutButton from "../components/LogoutButton";
function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">🎉 Welcome, {user?.name}</h1>
      <p className="mt-2 text-gray-600">Role: {user?.role}</p>
      <LogoutButton/>
    </div>
  );
}

export default Dashboard;
