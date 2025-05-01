import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const JWT_SECRET =process.env.JWT_SECRET

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res
      .status(201)
      .json({ message: "User created successfully", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
