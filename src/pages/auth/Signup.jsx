import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AuthShell from "../../components/auth/AuthShell";
import FormField from "../../components/auth/FormField";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Enter your full name.";
    if (!form.email.trim()) next.email = "Enter your email address.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.password) next.password = "Choose a password.";
    else if (form.password.length < 8) next.password = "Use at least 8 characters.";
    if (form.confirm !== form.password) next.confirm = "Passwords don't match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await signup(form.name, form.email, form.password);
    setSubmitting(false);
    navigate("/dashboard", { replace: true });
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Set up your workspace in under a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-brand-600 font-medium hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FormField
          label="Full name"
          id="name"
          placeholder="Jane Cooper"
          value={form.name}
          error={errors.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          autoComplete="name"
        />
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
          type="password"
          placeholder="At least 8 characters"
          value={form.password}
          error={errors.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          autoComplete="new-password"
        />
        <FormField
          label="Confirm password"
          id="confirm"
          type="password"
          placeholder="Re-enter your password"
          value={form.confirm}
          error={errors.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          autoComplete="new-password"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-70 transition-colors text-white text-sm font-semibold py-2.5 rounded-lg shadow-card mt-2"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {submitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-gray-400">
        By continuing you agree to the Terms of Service and Privacy Policy.
      </p>
    </AuthShell>
  );
}
