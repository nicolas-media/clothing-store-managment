import React, { useState, useEffect } from "react";
import BarcodeScanner from "./BarcodeScanner";
import StockManagement from "./StockManagement";
import UserManagement from "./UserManagement";

const App = () => {
  const [user, setUser] = useState(null); // State for the logged-in user

  // Load the user information from local storage when the component mounts
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  // Handle user login
  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Handle user logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div>
      {/* Display the barcode scanner component if the user is logged in */}
      {user && <BarcodeScanner />}

      {/* Display the stock management component if the user is an admin */}
      {user && user.isAdmin && <StockManagement />}

      {/* Display the user management component if the user is an admin */}
      {user && user.isAdmin && (
        <UserManagement onLogin={handleLogin} onLogout={handleLogout} />
      )}

      {/* Display the login form if the user is not logged in */}
      {!user && (
        <UserManagement onLogin={handleLogin} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
