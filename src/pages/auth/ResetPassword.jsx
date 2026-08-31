import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2 } from "lucide-react";
import AuthShell from "../../components/auth/AuthShell";
import FormField from "../../components/auth/FormField";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.password) next.password = "Choose a new password.";
    else if (form.password.length < 8) next.password = "Use at least 8 characters.";
    if (form.confirm !== form.password) next.confirm = "Passwords don't match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setDone(true);
  };

  if (done) {
    return (
      <AuthShell title="Password updated">
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
            <CheckCircle2 size={22} />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            Your password has been reset. You can now log in with your new password.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-brand-500 hover:bg-brand-600 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-card"
          >
            Go to log in
          </button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Set a new password"
      subtitle="Choose something you haven't used before."
      footer={
        <Link to="/login" className="text-brand-600 font-medium hover:underline">
          Back to log in
        </Link>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FormField
          label="New password"
          id="password"
          type="password"
          placeholder="At least 8 characters"
          value={form.password}
          error={errors.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          autoComplete="new-password"
        />
        <FormField
          label="Confirm new password"
          id="confirm"
          type="password"
          placeholder="Re-enter your new password"
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
          {submitting ? "Updating..." : "Update password"}
        </button>
      </form>
    </AuthShell>
  );
}
