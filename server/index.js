const express = require("express");
const app = express();
require("dotenv/config");
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
    origin: true,
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


mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log(`Error : ${error}`);
  });


app.listen(5000, () => {
  console.log(`Server is listening on port 5000`);
});