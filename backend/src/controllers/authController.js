const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

const validatePasswordRule = (password) => {
  if (!password) return "Password is required";

  if (password.length < 8 || password.length > 16) {
    return "Password length must be between 8 and 16 characters";
  }

  if (!/^[A-Z]/.test(password)) {
    return "Password must start with a capital letter";
  }

  if (!/^[A-Za-z0-9@#$%&]+$/.test(password)) {
    return "Only letters, numbers, and @ # $ % & are allowed";
  }

  const specialChars = password.match(/[@#$%&]/g) || [];
  if (specialChars.length < 1 || specialChars.length > 3) {
    return "Password must contain 1 to 3 special characters from @ # $ % &";
  }

  return "";
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const passwordError = validatePasswordRule(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    const normalizedEmail = email.toLowerCase();
    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

    if (normalizedEmail === adminEmail) {
      return res.status(403).json({
        message: "This email is reserved for admin and cannot be registered publicly",
      });
    }

    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user),
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, adminPassKey } = req.body;

    const normalizedEmail = email.toLowerCase();
    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
    const adminPassKeyFromEnv = process.env.ADMIN_PASS_KEY;

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "User account is inactive" });
    }

    const isMatch = await bcrypt.compare(password || "", user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (normalizedEmail === adminEmail || user.role === "admin") {
      if (!adminPassKey) {
        return res.status(400).json({ message: "Admin pass key is required" });
      }

      if (adminPassKey !== adminPassKeyFromEnv) {
        return res.status(401).json({ message: "Invalid admin pass key" });
      }

      if (normalizedEmail === adminEmail && user.role !== "admin") {
        user.role = "admin";
        await user.save();
      }
    }

    res.json({
      message: "Login success",
      token: generateToken(user),
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail(
      user.email,
      "Reset Your Password",
      `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Library Management System</h2>
          <p>Hello ${user.name},</p>
          <p>You requested to reset your password.</p>
          <p>Click the button below to reset your password:</p>
          <a 
            href="${resetLink}" 
            style="
              display:inline-block;
              padding:12px 20px;
              background:#0f4c81;
              color:#ffffff;
              text-decoration:none;
              border-radius:6px;
              font-weight:bold;
            "
          >
            Reset Password
          </a>
          <p style="margin-top:16px;">This link will expire in 15 minutes.</p>
        </div>
      `
    );

    res.json({ message: "Reset link sent to registered email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const passwordError = validatePasswordRule(newPassword);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset link" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = "";
    user.resetPasswordTokenExpiry = null;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};