require("dotenv").config();

const { MongoClient } = require("mongodb");

let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    db = client.db()

    console.log("MongoDB Connected (Native Driver)");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };