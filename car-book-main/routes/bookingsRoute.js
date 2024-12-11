// const express = require("express");
// const router = express.Router();
// const Booking = require("../models/bookingModel");
// const Car = require("../models/carModel");
// const { v4: uuidv4 } = require("uuid");
// const stripe = require("stripe")(
//   "sk_test_51IYnC0SIR2AbPxU0EiMx1fTwzbZXLbkaOcbc2cXx49528d9TGkQVjUINJfUDAnQMVaBFfBDP5xtcHCkZG1n1V3E800U7qXFmGf"
// );
// router.post("/bookcar", async (req, res) => {
//   const { token } = req.body;
//   try {
//     const customer = await stripe.customers.create({
//       email: token.email,
//       source: token.id,
//     });

//     const payment = await stripe.charges.create(
//       {
//         amount: req.body.totalAmount * 100,
//         currency: "inr",
//         customer: customer.id,
//         receipt_email: token.email
//       },
//       {
//         idempotencyKey: uuidv4(),
        
//       }
//     );

//     if (payment) {
//       req.body.transactionId = payment.source.id;
//       const newbooking = new Booking(req.body);
//       await newbooking.save();
//       const car = await Car.findOne({ _id: req.body.car });
//       console.log(req.body.car);
//       car.bookedTimeSlots.push(req.body.bookedTimeSlots);

//       await car.save();
//       res.send("Your booking is successfull");
//     } else {
//       return res.status(400).json(error);
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json(error);
//   }
// });


// router.get("/getallbookings", async(req, res) => {

//     try {

//         const bookings = await Booking.find().populate('car')
//         res.send(bookings)
        
//     } catch (error) {
//         return res.status(400).json(error);
//     }
  
// });


// module.exports = router;

const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51IYnC0SIR2AbPxU0EiMx1fTwzbZXLbkaOcbc2cXx49528d9TGkQVjUINJfUDAnQMVaBFfBDP5xtcHCkZG1n1V3E800U7qXFmGf"
);

router.post("/bookcar", async (req, res) => {
  const { token, totalAmount, car, bookedTimeSlots } = req.body;
  
  try {
    // Create a Stripe customer
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    // Add description to the Stripe charge for export transactions
    const description = 'Export transaction for car rental booking'; // Modify based on your scenario

    // Create the payment (charge)
    const payment = await stripe.charges.create(
      {
        amount: totalAmount * 100, // totalAmount should be in INR (for instance, Rs. 100 = 10000 paise)
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
        description: description, // Include the description here
      },
      {
        idempotencyKey: uuidv4(), // Ensure idempotency for retries
      }
    );

    // If payment is successful, proceed with booking
    if (payment) {
      req.body.transactionId = payment.source.id; // Store transactionId
      const newBooking = new Booking(req.body); // Create a new booking object
      await newBooking.save(); // Save the booking

      // Find the car being booked and update its booked time slots
      const carToUpdate = await Car.findOne({ _id: car });
      carToUpdate.bookedTimeSlots.push(bookedTimeSlots);
      await carToUpdate.save(); // Save updated car

      res.send("Your booking is successful");
    } else {
      return res.status(400).json({ message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong", error });
  }
});

// Fetch all bookings
router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate('car');
    res.send(bookings);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;

