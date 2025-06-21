const nodemailer = require("nodemailer");

class CodeStore {
  constructor() {
    this.store = new Map();
  }

  saveCode(email, code) {
    this.store.set(email, code);
  }

  getCode(email) {
    return this.store.get(email);
  }

  clearCode(email) {
    this.store.delete(email);
  }
}

const codeStore = new CodeStore();

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendCode(email) {
  if (!email || typeof email !== "string") {
    throw new Error("Invalid email.");
  }

  const code = generateCode();
  codeStore.saveCode(email, code);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "doolanyatrips@gmail.com",
      pass: "loeu irzo fbxx iuep",
    },
  });

  const mailOptions = {
    from: "doolanyatrips@gmail.com",
    to: email,
    subject: "Your Verification Code",
    text: `Your verification code is: ${code}`,
  };

  await transporter.sendMail(mailOptions);

  return { message: "✅ Code sent to email." };
}

function verifyCode(email, code) {
  if (!email || !code) {
    return { success: false, message: "Missing email or code" };
  }

  const storedCode = codeStore.getCode(email);
  if (storedCode === code) {
    codeStore.clearCode(email);
    return { success: true, message: "✅ Verification approved" };
  } else {
    return { success: false, message: "❌ Invalid code" };
  }
}

module.exports = { sendCode, verifyCode };
