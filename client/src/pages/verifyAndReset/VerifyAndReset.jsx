import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { verifyCode, resetPassword } from "../../services/api";
import styles from "./verifyAndReset.module.css";

export default function VerifyAndReset() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !code) {
      setError("Please enter your email and verification code.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await verifyCode({ email, code });
      if (res.data.success) {
        setVerified(true);
        setMessage("The code has been verified, you can now enter a new password✅ .");
      } else {
        setError(res.data.message || "Incorrect code❌");
      }
    } catch (err) {
      setError("Authentication failed, please try again.");
      console.error("Verification error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!password || !confirmPassword) {
      setError("Please enter and verify the new password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password does not match❌.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await resetPassword({ email, newPassword: password });
      if (res.data.success) {
        setMessage(res.data.message || "Password successfully reset!✅");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(res.data.message || " Reset failed❌");
      }
    } catch (err) {
      setError("Error resetting password.");
      console.error("Password reset error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>אימות ואיפוס סיסמה</h2>
      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!verified ? (
        <form onSubmit={handleVerifyCode} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <input
            type="text"
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify Code"}
          </button>
          <Link to="/forgotPassword" className={styles.link}>
          Didn't receive a code? Request again          </Link>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className={styles.form}>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              className={styles.passwordInput}
            />
            <span 
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className={styles.passwordContainer}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="6"
              className={styles.passwordInput}
            />
            <span 
              className={styles.passwordToggle}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Reset password..." : "Password reset"}
          </button>
        </form>
      )}
    </div>
  );
}
