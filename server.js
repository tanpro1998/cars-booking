import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectDB } from "./mongoDB/Connect.js";
import { carsRouter } from "./routes/carsRoute.js";
import { usersRouter } from "./routes/usersRoute.js";
import { bookingsRouter } from "./routes/bookingRoute.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
ConnectDB();

app.use(cors());
app.use(express.json());

app.use("/api/cars", carsRouter);
app.use("/api/users", usersRouter);
app.use("/api/bookings", bookingsRouter);

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
