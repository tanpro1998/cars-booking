import mongoose from "mongoose"
const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    bookedTimesSlots: [
      {
        from: { type: String },
        to: { type: String },
      },
    ],
    rentPerHour: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Cars = mongoose.model("Cars", carSchema);

export {Cars}