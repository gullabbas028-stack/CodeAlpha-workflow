import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AuthShell from "../../components/auth/AuthShell";
import FormField from "../../components/auth/FormField";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = "Enter your email address.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.password) next.password = "Enter your password.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await login(form.email, form.password);
    setSubmitting(false);
    navigate(from, { replace: true });
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to pick up where your team left off."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/signup" className="text-brand-600 font-medium hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FormField
          label="Email"
          id="email"
          type="email"
          placeholder="you@company.com"
          value={form.email}
          error={errors.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          autoComplete="email"
        />
        <FormField
          label="Password"
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={form.password}
          error={errors.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          autoComplete="current-password"
          right={
            <Link to="/forgot-password" className="text-xs font-medium text-brand-600 hover:underline">
              Forgot password?
            </Link>
          }
        />
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 mb-6 -mt-2"
        >
          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          {showPassword ? "Hide password" : "Show password"}
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-70 transition-colors text-white text-sm font-semibold py-2.5 rounded-lg shadow-card"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {submitting ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-gray-400">
        This is a demo — any email and password combination will work.
      </p>
    </AuthShell>
  );
}
