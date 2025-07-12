require("dotenv").config();
//dotenv.config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const qRoutes = require("./routes/questions");
const aRoutes = require("./routes/answer");
const voteRoutes = require("./routes/vote");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

app.use("/api/auth", authRoutes);
app.use("/api/questions", qRoutes);
app.use("/api/answers", aRoutes);
app.use("/api/answers", voteRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
