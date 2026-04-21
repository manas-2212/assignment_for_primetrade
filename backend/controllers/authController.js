const { getDB } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

exports.register = async (req, res) => {
  const db = getDB();
  const { name, email, password } = req.body;

  const existing = await db.collection("users").findOne({ email });
  if (existing)
    return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const result = await db.collection("users").insertOne({
    name,
    email,
    password: hashed,
    role: "user",
  });

  res.status(201).json({
    token: generateToken({ _id: result.insertedId, role: "user" }),
  });
};

exports.login = async (req, res) => {
  const db = getDB();
  const { email, password } = req.body;

  const user = await db.collection("users").findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({
    token: generateToken(user),
  });
};