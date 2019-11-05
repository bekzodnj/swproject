const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

// init Middleware
app.use(express.json({ extended: false }));

// mapping to main
app.get("/", (req, res) => {
  res.send("API is running");
});

// define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/events", require("./routes/api/events"));

// get deployment port or default
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
