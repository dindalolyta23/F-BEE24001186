const { prisma } = require("../configs/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});
const login = async (data) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
};

// Forgot Password
const forgotPassword = async (email) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("No user found with this email", 404);
    }
    const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    const resetLink = `${process.env.APP_URL}/auth/reset-password?token=${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `<p>You requested a password reset. Click the link below to reset your password:</p> <a href="${resetLink}">${resetLink}</a>`,
    });
    return { message: "Password reset link sent to your email ", token_reset: token };
  } catch (error) {
    console.error("Error during password reset process:", error);
    throw error;
  }
};

// Reset Password
const resetPassword = async (token, newPassword) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    return { message: "Password successfully reset" };
  } catch (error) {
    console.error("Error when resetting password:", error);
    if (error.name === "TokenExpiredError") {
      throw new Error(
        "Token expired. Please request a new password reset link.",
        400
      );
    }
    if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token.", 400);
    }
    throw error;
  }
};

module.exports = { login, forgotPassword, resetPassword};
