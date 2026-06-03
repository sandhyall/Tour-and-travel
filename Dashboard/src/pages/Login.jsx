import { useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/auth/login", { email, password });

      login(data.token, {
        name: "Admin User",
        email: email,
        role: "admin",
      });
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-wrap font-sans">
      
      {/* LEFT PANEL: Brand Identity */}
      <div className="flex flex-1 min-w-[300px] flex-col justify-center items-center p-12 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500 blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500 blur-[120px]"></div>
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4 drop-shadow-lg">
            HIMALAYA<span className="text-blue-400">ADMIN</span>
          </h1>
          <div className="h-1.5 w-24 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-300 text-lg md:text-xl font-medium max-w-xs mx-auto">
            Professional Management for Nepal, Bhutan & Tibet Packages.
          </p>
        </div>
        
        <div className="absolute bottom-10 text-slate-500 text-sm font-semibold tracking-widest uppercase">
          Wales Trek & Travel © 2026
        </div>
      </div>

      {/* RIGHT PANEL: Login Form */}
      <div className="flex flex-1 min-w-[300px] justify-center items-center p-6 bg-slate-50">
        <div className="w-full max-w-md">
          <form 
            onSubmit={handleSubmit} 
            className="bg-white p-10 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col gap-6"
          >
            <div className="text-center mb-2">
              <h2 className="text-3xl font-bold text-slate-800">Welcome Back</h2>
              <p className="text-slate-400 mt-2 font-medium">Please enter your admin credentials</p>
            </div>

            <div className="space-y-4">
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                <input
                  type="email"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent text-slate-700 font-medium"
                  placeholder="admin@travel.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
                <input
                  type="password"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent text-slate-700 font-medium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </span>
              ) : "Sign In to Panel"}
            </button>

            <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl text-center">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-tighter">Demo Credentials</p>
              <p className="text-sm text-amber-600 mt-1">admin@travel.com / admin123</p>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}