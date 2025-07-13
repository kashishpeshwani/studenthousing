import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
      Logout
    </Button>
  );
}

export default LogoutButton;
