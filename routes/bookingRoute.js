import express from "express";
const bookingsRouter = express.Router();
import {Booking} from "../models/bookingModel.js";
import { Cars } from "../models/carsModel.js";
import Stripe from "stripe";

const stripe = Stripe(
  "sk_test_51JbgRzDrivpegEIzHQVZVQV1e6pSatsLAG3Zipwcr8jTFsHn2NQEdxxbLSmrnqRQDKdfDCgmJeKehyGEOEQAW2gd00vQ2A1bcr"
);
import { v4 } from "uuid";
bookingsRouter.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: v4(),
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newBooking = new Booking(req.body);
      await newBooking.save();
      const car = await Cars.findOne({ _id: req.body.car });
      car.bookedTimesSlots.push(req.body.bookedTimesSlots);
      await car.save();
      res.send("Booking Successful");
    } else {
      return res.status(400).json(err);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
});

bookingsRouter.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    return res.status(400).json(err);
  }
});

export { bookingsRouter };
