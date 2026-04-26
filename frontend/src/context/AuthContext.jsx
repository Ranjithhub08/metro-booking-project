import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
const API_URL = `http://${window.location.hostname}:5001/api`;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("metro_user_token");
    const savedUser = localStorage.getItem("metro_user");
    if (saved && savedUser) {
      const u = JSON.parse(savedUser);
      setUser(u);
      fetchBookings(u.id);
    } else {
      // Auto-login as a Guest for immediate access
      const guest = { id: 1, username: "Guest", city: "hyderabad" };
      setUser(guest);
      fetchBookings(1);
    }
    setLoading(false);
  }, []);

  const fetchBookings = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/bookings/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setBookingHistory(data);
      }
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  const login = async (username, password) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("metro_user_token", data.token);
        localStorage.setItem("metro_user", JSON.stringify(data.user));
        fetchBookings(data.user.id);
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err) {
      return { success: false, error: "Connection error" };
    }
  };

  const signup = async (username, password) => {
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // Automatically login after signup
        return login(username, password);
      }
      return { success: false, error: data.error };
    } catch (err) {
      return { success: false, error: "Connection error" };
    }
  };

  const logout = () => {
    setUser(null);
    setBookingHistory([]);
    localStorage.removeItem("metro_user");
    localStorage.removeItem("metro_user_token");
  };

  const setCity = async (cityId) => {
    if (!user) return;
    try {
      const res = await fetch(`${API_URL}/user/city`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, city: cityId }),
      });
      if (res.ok) {
        const updated = { ...user, city: cityId };
        setUser(updated);
        localStorage.setItem("metro_user", JSON.stringify(updated));
      }
    } catch (err) {
      console.error("Failed to update city:", err);
    }
  };

  const saveBooking = async (booking) => {
    if (!user) return;
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...booking, userId: user.id }),
      });
      if (res.ok) {
        setBookingHistory(prev => [booking, ...prev].slice(0, 20));
      }
    } catch (err) {
      console.error("Failed to save booking:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, setCity, bookingHistory, saveBooking, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);