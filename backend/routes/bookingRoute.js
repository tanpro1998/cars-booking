const router = require("express").Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carsModel");
const stripe = require("stripe")(
  "sk_test_51JbgRzDrivpegEIzHQVZVQV1e6pSatsLAG3Zipwcr8jTFsHn2NQEdxxbLSmrnqRQDKdfDCgmJeKehyGEOEQAW2gd00vQ2A1bcr"
);
const { v4: uuidv4 } = require("uuid");
router.post("/bookcar", async (req, res) => {
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
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newBooking = new Booking(req.body);
      await newBooking.save();
      const car = await Car.findOne({ _id: req.body.car });
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

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
