import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddTrip from "./pages/AddTrip";
import Trips from "./pages/Trips";
import EditTrip from "./pages/EditTrip";
import AdminBooking from "./pages/AdminBooking";
import AdminCalendar from "./pages/AdminCalendar";
import Test from "./pages/Test";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* <Route path="/" element={<Login />} />

          <Route path="/dashboard" element={
            <PrivateRoute><Dashboard /></PrivateRoute>
          } />

          <Route path="/add-trip" element={
            <PrivateRoute><AddTrip /></PrivateRoute>
          } />

          <Route path="/trips" element={
            <PrivateRoute><Trips /></PrivateRoute>
          } /> */}
 <Route path="/" element={<Dashboard/>}/>
  <Route path="/add-trip" element={<AddTrip/>}/>
   <Route path="/trips" element={<Trips/>}/>
   <Route path="/edit/:id" element={<EditTrip/>} />
   <Route path="/admin-bookings" element={<AdminBooking/>} />
   <Route path="/admin-calendar" element={<AdminCalendar/>} />
  
  <Route path="/test" element={<Test/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;