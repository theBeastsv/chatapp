const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http); // Socket.io integration for real-time chat
const connectDB = require("./dbconfig/db"); // Assuming separate database connection file
const cors = require("cors");
require("dotenv").config();
// Connect to database
connectDB();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

io.on("connection", (socket) => {
  console.log("User connected");
});

const PORT = process.env.PORT || 3030;
http.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
