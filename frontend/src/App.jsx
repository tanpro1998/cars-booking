import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import BookingCar from "./pages/BookingCar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBookings from "./pages/UserBookings";
import AddCar from "./pages/AddCar";
import "antd/dist/antd.min.css";
import Admin from "./pages/Admin";
import EditCar from "./pages/EditCar";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.isAdmin;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {user ? (
            <Route path="/booking/:carid" element={<BookingCar />} />
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
          {user ? (
            <Route path="/userbookings" element={<UserBookings />} />
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
          {user && isAdmin ? (
            <Route path="/addcar" element={<AddCar />} />
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
          {user && isAdmin ? (
            <Route path="/admin" element={<Admin />} />
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
          {user && isAdmin ? (
            <Route path="/editcar/:carid" element={<EditCar />} />
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
          {!user ? (
            <Route path="/login" element={<Login />} />
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
