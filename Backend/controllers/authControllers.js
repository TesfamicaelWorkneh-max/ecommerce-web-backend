import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { sendEmail } from "../utils/sendEmail.js";
import dotenv from "dotenv";
dotenv.config();

// Use bcrypt only if needed elsewhere (you imported before).
// const bcrypt = import if needed in other functions

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const BASE_URL = process.env.CLIENT_ORIGIN;

// Helper to generate JWT token (access)
const generateAccessToken = (id, role, expires = "30m") => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: expires });
};

// Helper to create verification token
const createVerifyToken = () => crypto.randomBytes(32).toString("hex");

// -------------------- REGISTER --------------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(409).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email,
      password,
      role: "user",
      isVerified: false,
    });

    // create verification token
    const verifyToken = createVerifyToken();
    user.verifyToken = verifyToken;
    user.verifyTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24h
    await user.save();

    const verifyUrl = `${BASE_URL}/verify/${verifyToken}`;
    const html = `
      <p>Hello ${user.name},</p>
      <p>Thanks for registering. Please verify your email:</p>
      <a href="${verifyUrl}">Verify Email</a>
      <p>This link expires in 24 hours.</p>
    `;

    await sendEmail({ to: email, subject: "Verify your email", html });

    return res.status(201).json({
      message: "User registered. Verification email sent.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// -------------------- VERIFY EMAIL --------------------
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verifyToken = null;
    user.verifyTokenExpires = null;

    await user.save();

    return res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// -------------------- RESEND VERIFICATION --------------------
export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified)
      return res.status(400).json({ message: "User already verified" });

    const verifyToken = createVerifyToken();
    user.verifyToken = verifyToken;
    user.verifyTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const verifyUrl = `${BASE_URL}/verify/${verifyToken}`;
    const html = `
      <p>Hello ${user.name},</p>
      <p>Please verify your email:</p>
      <a href="${verifyUrl}">Verify Email</a>
      <p>This link expires in 24 hours.</p>
    `;

    await sendEmail({
      to: email,
      subject: "Verify your email (resend)",
      html,
    });

    return res.json({ message: "Verification email resent" });
  } catch (err) {
    console.error("RESEND VERIFY ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// // -------------------- LOGIN --------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("LOGIN REQUEST BODY:", req.body);

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email }).select(
      "+password +refreshToken"
    ); // include fields if schema hides them
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.isVerified)
      return res.status(403).json({ message: "Email not verified." });

    if (user.isBlocked)
      return res
        .status(403)
        .json({ message: "User is blocked. Contact admin." });

    const passwordMatch = await user.matchPassword(password);
    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate tokens
    const accessToken = generateAccessToken(user._id, user.role, "30m");
    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    // Send refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // return a simple user object + access token
    return res.json({
      message: "Login successful",
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    const resetUrl = `${BASE_URL}/reset-password/${resetToken}`;

    // Send email (nodemailer configured)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" target="_blank">${resetUrl}</a>
      `,
    });

    return res.json({ message: "Reset link sent to your email." });
  } catch (err) {
    console.error("FORGOT ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Token expired or invalid" });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.json({ message: "Password reset successful!" });
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// -------------------- REFRESH TOKEN --------------------
// GET /api/auth/refresh-token  (or POST — keep GET if your router uses GET)
export const refreshToken = async (req, res) => {
  try {
    // token can come from cookie, body, or header
    const token =
      (req.cookies && req.cookies.refreshToken) ||
      req.body?.refreshToken ||
      req.headers["x-refresh-token"];

    if (!token) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // verify token
    jwt.verify(token, REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        console.error("REFRESH VERIFY ERROR:", err);
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const user = await User.findById(decoded.id).select("+refreshToken");
      if (!user) return res.status(404).json({ message: "User not found" });

      // Compare token stored in DB (simple rotation strategy)
      if (!user.refreshToken || user.refreshToken !== token) {
        return res.status(403).json({ message: "Refresh token mismatch" });
      }

      // Generate new access token
      const accessToken = generateAccessToken(user._id, user.role, "30m");

      return res.json({ accessToken });
    });
  } catch (err) {
    console.error("REFRESH ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// -------------------- LOGOUT --------------------
export const logoutUser = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;

    if (token) {
      // Remove refresh token from DB (best-effort)
      await User.updateOne(
        { refreshToken: token },
        { $unset: { refreshToken: 1 } }
      );
    }

    // Clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("LOGOUT ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
