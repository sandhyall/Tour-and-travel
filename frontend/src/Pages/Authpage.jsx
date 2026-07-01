import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";

const MountainIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <polygon points="16,4 30,28 2,28" fill="#10b981" opacity="0.15" />
    <polygon
      points="16,4 30,28 2,28"
      fill="none"
      stroke="#10b981"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <polygon points="10,16 20,28 0,28" fill="#10b981" opacity="0.3" />
    <polygon
      points="10,16 20,28 0,28"
      fill="none"
      stroke="#10b981"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
);

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${
          focused || value
            ? "top-2 text-[10px] font-semibold tracking-widest uppercase text-emerald-400"
            : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ""}
        className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 pt-6 pb-2.5 text-sm text-white outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
      />
    </div>
  );
}

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });
      localStorage.setItem("token", data.token);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Login failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !regFirstName ||
      !regLastName ||
      !regEmail ||
      !regPassword ||
      !regConfirm
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (regPassword !== regConfirm) {
      toast.error("Passwords do not match.");
      return;
    }
    if (regPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/auth/register", {
        firstName: regFirstName,
        lastName: regLastName,
        email: regEmail,
        password: regPassword,
      });
      localStorage.setItem("token", data.token);
      toast.success("Account created! Welcome aboard.");
      navigate("/login");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Registration failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-emerald-950/60" />

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 flex items-center gap-3">
          <MountainIcon />
          <span className="text-white font-bold text-lg tracking-tight">
            Ace Travel
          </span>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-semibold tracking-wider uppercase">
              Adventure awaits
            </span>
          </div>

          <h1 className="text-5xl font-black text-white leading-tight">
            The world's
            <br />
            <span className="text-emerald-400">greatest</span>
            <br />
            expeditions.
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            From Everest base camp to Annapurna circuit — book handcrafted
            trekking experiences with local experts.
          </p>

          <div className="flex gap-8 pt-2">
            {[
              { n: "200+", label: "Expeditions" },
              { n: "50K+", label: "Adventurers" },
              { n: "4.9★", label: "Rating" },
            ].map(({ n, label }) => (
              <div key={label}>
                <p className="text-2xl font-black text-white">{n}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <MountainIcon />
            <span className="text-white font-bold text-lg">Ace Travel</span>
          </div>

          <div className="flex bg-slate-800/50 rounded-2xl p-1 mb-8 border border-slate-700/50">
            {["login", "register"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  mode === m
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-white">Welcome back</h2>
                <p className="text-slate-400 text-sm mt-1">
                  Sign in to manage your bookings
                </p>
              </div>

              <Field
                label="Email address"
                type="email"
                value={loginEmail}
                onChange={setLoginEmail}
                placeholder="you@example.com"
                autoComplete="email"
              />
              <Field
                label="Password"
                type="password"
                value={loginPassword}
                onChange={setLoginPassword}
                placeholder="••••••••"
                autoComplete="current-password"
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Signing in…
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>

              <p className="text-center text-xs text-slate-500 pt-2">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  Create one
                </button>
              </p>
            </form>
          )}

          {mode === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-white">
                  Create account
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Join thousands of adventurers worldwide
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="First name"
                  value={regFirstName}
                  onChange={setRegFirstName}
                  placeholder="John"
                  autoComplete="given-name"
                />
                <Field
                  label="Last name"
                  value={regLastName}
                  onChange={setRegLastName}
                  placeholder="Doe"
                  autoComplete="family-name"
                />
              </div>

              <Field
                label="Email address"
                type="email"
                value={regEmail}
                onChange={setRegEmail}
                placeholder="you@example.com"
                autoComplete="email"
              />
              <Field
                label="Password"
                type="password"
                value={regPassword}
                onChange={setRegPassword}
                placeholder="Min. 6 characters"
                autoComplete="new-password"
              />
              <Field
                label="Confirm password"
                type="password"
                value={regConfirm}
                onChange={setRegConfirm}
                placeholder="Repeat password"
                autoComplete="new-password"
              />

              {regPassword.length > 0 && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => {
                      const strength =
                        regPassword.length >= 12
                          ? 4
                          : regPassword.length >= 8
                            ? 3
                            : regPassword.length >= 6
                              ? 2
                              : 1;
                      return (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                            i <= strength
                              ? strength === 4
                                ? "bg-emerald-400"
                                : strength === 3
                                  ? "bg-amber-400"
                                  : strength === 2
                                    ? "bg-orange-400"
                                    : "bg-red-400"
                              : "bg-slate-700"
                          }`}
                        />
                      );
                    })}
                  </div>
                  <p className="text-xs text-slate-500">
                    {regPassword.length >= 12
                      ? "Strong password"
                      : regPassword.length >= 8
                        ? "Good password"
                        : regPassword.length >= 6
                          ? "Weak — add more characters"
                          : "Too short"}
                  </p>
                </div>
              )}

              {regConfirm.length > 0 && (
                <p
                  className={`text-xs ${
                    regPassword === regConfirm
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {regPassword === regConfirm
                    ? "✓ Passwords match"
                    : "✗ Passwords do not match"}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Creating account…
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-center text-xs text-slate-500 pt-2">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  Sign in
                </button>
              </p>
            </form>
          )}

          {/* footer */}
          <p className="text-center text-xs text-slate-600 mt-10">
            By continuing you agree to our{" "}
            <span className="text-slate-500 hover:text-slate-400 cursor-pointer transition-colors">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-slate-500 hover:text-slate-400 cursor-pointer transition-colors">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
