const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../../db");

router.post("/resetPassword", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email and new password are required",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [result] = await db.query("UPDATE users SET password = ? WHERE email = ?", [
      hashedPassword,
      email,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email",
      });
    }

    res.json({
      success: true,
      message: "✅ Password has been reset successfully",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({
      success: false,
      message: "❌ Failed to reset password",
    });
  }
});

module.exports = router;
