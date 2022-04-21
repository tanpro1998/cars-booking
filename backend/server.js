import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectDB } from "./mongoDB/Connect.js";
import { carsRouter } from "./routes/carsRoute.js";
import { usersRouter } from "./routes/usersRoute.js";
import { bookingsRouter } from "./routes/bookingRoute.js";
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
ConnectDB();

app.use(cors());
app.use(express.json());

app.use("/api/cars", carsRouter);
app.use("/api/users", usersRouter);
app.use("/api/bookings", bookingsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
