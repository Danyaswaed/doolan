// backend/routes/forgotPassword.js
const express = require("express");
const router = express.Router();
const { sendCode } = require("./handleEmail"); // השתמש בקובץ המאוחד שלך

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const result = await sendCode(email);
    res.json({ success: true, message: result.message });
  } catch (error) {
    console.error("Error sending code:", error);
    res.status(500).json({ success: false, message: "❌ Failed to send verification code." });
  }
});

module.exports = router;
