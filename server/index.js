// server/index.js
const dotenv =require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const db = require("./db");
const path = require("path");
const fs = require("fs");

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

const singUpRouter = require("./routes/auth/signup");
const loginRouter = require("./routes/auth/login");
const forgotPasswordRouter = require("./routes/auth/forgotPassword");
const verifyCodeRouter = require("./routes/auth/verifyCode");
const resetPasswordRouter = require("./routes/auth/resetPassword");
const contactusRouter = require("./routes/contactus/contactus");
const uploadRouter = require('./routes/upload');
const campingRouter = require("./routes/camping");
const attractionsRouter = require("./routes/attractions");


// Profile routes
const profileRoutes = require('./routes/profile/profile');
const changePasswordRoutes = require('./routes/profile/changePassword');
const uploadProfileImageRoutes = require('./routes/profile/uploadProfileImage');
const editProfileRoutes = require('./routes/profile/editProfile');



app.use("/api/auth", singUpRouter);
app.use("/api/auth", loginRouter);
app.use("/api/auth", forgotPasswordRouter);

app.use("/api/auth", verifyCodeRouter);
app.use("/api/auth", resetPasswordRouter);



app.use("/api/contact", contactusRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/camping", campingRouter);
app.use("/api/attractions", attractionsRouter);

// Mount user profile routes
app.use('/api/users', uploadProfileImageRoutes); // For profile image upload
app.use('/api/users', editProfileRoutes); // For profile updates
app.use('/api/users', changePasswordRoutes); // For password changes

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const profileImagesDir = path.join(uploadsDir, 'profileImages');

if (!fs.existsSync(uploadsDir)) {
  console.log(`Creating uploads directory: ${uploadsDir}`);
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(profileImagesDir)) {
  console.log(`Creating profile images directory: ${profileImagesDir}`);
  fs.mkdirSync(profileImagesDir, { recursive: true });
}


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
