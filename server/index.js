const express = require("express");
const app = express();
require("dotenv/config");
const mysql = require('mysql');

const authRoute = require("./routes/authRouter");
const grievanceRoute = require("./routes/grievanceRouter"); 
const adminRouter = require('./routes/admin');
const facultyRoute = require('./routes/facultyRouter')

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { default: mongoose } = require("mongoose");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  return res.json("Hi there");
});

app.use('/faculty' , facultyRoute)
app.use("/", authRoute);
app.use("/grievance", grievanceRoute);
app.use('/admin', adminRouter);
app.use('/admin/grievance', grievanceRoute);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test MySQL Connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
    connection.release(); // Release the connection
  }
});


app.listen(5000, () => {
  console.log(`Server is listening on port 5000`);
});