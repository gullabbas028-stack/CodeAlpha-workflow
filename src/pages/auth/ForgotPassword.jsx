import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, MailCheck } from "lucide-react";
import AuthShell from "../../components/auth/AuthShell";
import FormField from "../../components/auth/FormField";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSent(true);
  };

  if (sent) {
    return (
      <AuthShell
        title="Check your email"
        footer={
          <Link to="/login" className="text-brand-600 font-medium hover:underline">
            Back to log in
          </Link>
        }
      >
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
            <MailCheck size={22} />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            If an account exists for <span className="font-medium text-gray-900">{email}</span>, we've sent a link
            to reset the password. It expires in 30 minutes.
          </p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter the email on your account and we'll send a reset link."
      footer={
        <Link to="/login" className="text-brand-600 font-medium hover:underline">
          Back to log in
        </Link>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FormField
          label="Email"
          id="email"
          type="email"
          placeholder="you@company.com"
          value={email}
          error={error}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-70 transition-colors text-white text-sm font-semibold py-2.5 rounded-lg shadow-card mt-2"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {submitting ? "Sending link..." : "Send reset link"}
        </button>
      </form>
    </AuthShell>
  );
}
