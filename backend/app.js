const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const errorHandler = require("./middleware/errorMiddleware");

const app = express(); // ✅ FIRST create app

connectDB();

app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/auth", require("./routes/authRoutes"));


app.use("/api/v1/tasks", require("./routes/taskRoutes"));


require("./docs/swagger")(app);


app.use(errorHandler);

module.exports = app;