import Stripe from "stripe";
import Gig from "../models/gig.model.js";
import Order from "../models/order.model.js";

export const createPaymentIntent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const gig = await Gig.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    price: gig.price,
    sellerId: gig.userId,
    buyerId: req.userId,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();

  return res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

// export const createOrderHandler = async (req, res, next) => {
//   try {
//     const gig = await Gig.findById(req.params.id);

//     if (!gig) return res.status(400).send("Invalid Gig Id");

//     const newOrder = new Order({
//       gigId: gig._id,
//       img: gig.cover,
//       title: gig.title,
//       price: gig.price,
//       sellerId: gig.userId,
//       buyerId: req.userId,
//       payment_intent: "TEMP",
//     });

//     await newOrder.save();

//     return res.status(200).send("Successful");
//   } catch (err) {
//     next(err);
//   }
// };

export const getOrdersHandler = async (req, res, next) => {
  const orders = await Order.find({
    ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
    isCompleted: true,
  });

  return res.status(200).json(orders);
};

export const confirmPayment = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      { payment_intent: req.body.payment_intent },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    return res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};
