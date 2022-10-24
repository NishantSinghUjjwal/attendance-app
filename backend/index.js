const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const UserRoutes = require("./src/routes/users.router");
const SubjectRoutes = require("./src/routes/subjects.router");
const StudentRoutes = require("./src/routes/students.router");
const AttendanceRoutes = require("./src/routes/attendance.router");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", UserRoutes);
app.use("/subject", SubjectRoutes);
app.use("/student", StudentRoutes);
app.use("/attendance", AttendanceRoutes);

app.listen(4000, () => {
  console.log(`Attendance App Server Started on Port 4000...`);
  const url = `mongodb://0.0.0.0:27017/AttendanceDB`;
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(url, connectionParams)
    .then(() => {
      console.log("Connected to database ");
    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`);
    });
});
