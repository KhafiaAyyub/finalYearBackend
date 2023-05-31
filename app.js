const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const facultyrouter = require("./router/faculty")

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use("/faculty",facultyrouter);



// Database connection
mongoose.connect("mongodb+srv://finalyear:finalyear@cluster0.jc1rrup.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
