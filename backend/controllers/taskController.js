const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

exports.createTask = async (req, res) => {
  const db = getDB();

  const result = await db.collection("tasks").insertOne({
    title: req.body.title,
    description: req.body.description || "",
    user: new ObjectId(req.user.id),
    createdAt: new Date(),
  });

  res.status(201).json(result);
};

exports.getTasks = async (req, res) => {
  const db = getDB();

  const { page = 1, limit = 5, search = "" } = req.query;

  const query =
    req.user.role === "admin"
      ? { title: { $regex: search, $options: "i" } }
      : {
          user: new ObjectId(req.user.id),
          title: { $regex: search, $options: "i" },
        };

  const tasks = await db
    .collection("tasks")
    .find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .toArray();

  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const db = getDB();
  const id = new ObjectId(req.params.id);

  const task = await db.collection("tasks").findOne({ _id: id });

  if (!task) return res.status(404).json({ message: "Task not found" });

  if (
    task.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await db.collection("tasks").updateOne(
    { _id: id },
    { $set: req.body }
  );

  res.json({ message: "Updated" });
};

exports.deleteTask = async (req, res) => {
  const db = getDB();
  const id = new ObjectId(req.params.id);

  const task = await db.collection("tasks").findOne({ _id: id });

  if (!task) return res.status(404).json({ message: "Task not found" });

  if (
    task.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await db.collection("tasks").deleteOne({ _id: id });

  res.json({ message: "Deleted" });
};