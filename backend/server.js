const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
const ConnectDB = require("./mongoDB/Connect");

const carsRoute = require("./routes/carsRoute");
const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingRoute");
const path = require("path");

dotenv.config();
ConnectDB();

app.use(express.json());

app.use("/api/cars", carsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Running");
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
