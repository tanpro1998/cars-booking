const router = require("express").Router();
const Cars = require("../models/carsModel");

router.get("/getallcars", async (req, res) => {
  try {
    const cars = await Cars.find();
    res.status(200).json(cars);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post("/addcar", async (req, res) => {
  try {
    const addNewCar = new Cars(req.body);
    await addNewCar.save();
    res.send("Add Car Successful");
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post("/editcar", async (req, res) => {
  try {
    const car = await Cars.findOne({ _id: req.body._id });
    car.name = req.body.name;
    car.image = req.body.image;
    car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;

    await car.save();

    res.send("Edit Car Successful");
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post("/deletecar", async (req, res) => {
  try {
    await Cars.findOneAndDelete({ _id: req.body.carid });

    res.send("Delete Car Successful");
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
