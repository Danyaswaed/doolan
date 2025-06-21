const express = require("express");
const router = express.Router();
const { verifyCode } = require("./handleEmail");

router.post("/verifyCode", async (req, res) => {
  const { email, code } = req.body;
  console.log("Verification request received:", { email, code });

  if (!email || !code) {
    return res.status(400).json({ 
      success: false, 
      message: "Email and verification code are required" 
    });
  }

  try {
    const result = await verifyCode(email, code);
    console.log("Verification result:", result);
    res.status(result.success ? 200 : 401).json(result);
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during verification"
    });
  }
});

module.exports = router;
