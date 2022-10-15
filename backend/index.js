const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const UserRoutes = require("./src/routes/users.router");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", UserRoutes);

app.listen(4000, () => {
  console.log(`Attendance App Server Satrted on Port 4000...`);
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
