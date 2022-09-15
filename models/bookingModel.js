import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
  {
    car: { type: mongoose.Schema.Types.ObjectId, ref: "cars" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    bookedTimesSlots: {
      from: { type: String },
      to: { type: String },
    },
    totalHours: { type: Number },
    totalAmount: { type: Number },
    transactionId: { type: String },
    driverRequired: { type: Boolean },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export { Booking };
