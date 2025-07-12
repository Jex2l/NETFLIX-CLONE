const express = require("express");
const getuser = require("../middleware/getuser");
const Movies = require("../models/MoviesSchema");
const User = require("../models/UserSchema");
const Razorpay = require("razorpay");
const config = require("../config.json");
const { v4: uuidv4 } = require("uuid");
const Transaction = require("../models/TransactionSchema");
const app = express();
const router = express.Router();

var instance = new Razorpay({
  key_id: `${config.payment.key}`,
  key_secret: `${config.payment.secret}`,
});
router.post("/pay", getuser, async (req, res) => {
  try {
    user_id = req.user.id;
    var options = {
      amount: req.body.amt, // amount in the smallest currency unit
      currency: "INR",
      receipt: uuidv4(),
    };
    instance.orders.create(options, function (err, order) {
      res.send(order);
    });
  } catch (error) {
    res.send(error);
  }
});

router.post("/gettransactions", getuser, async (req, res) => {
  try {
    const user_id = req.user.id;
    const user = await User.findById(user_id);
    const username = user.username;
    console.log(username);
    Transaction.find({ username: username }, (err, docs) => {
      res.send(docs);
    });
  } catch (error) {
    res.send(error);
  }
});

const getEndDate = (startDate, plan) => {
  let year = startDate.getFullYear();
  let month = startDate.getMonth() + plan + 1;
  let date = startDate.getDate();
  if (month > 12) {
    month = month - 12;
    year = year + 1;
  }
  let endDate = new Date(`${year}-${month}-${date}`);
  return endDate;
};

router.post("/addTransaction", getuser, async (req, res) => {
  try {
    const user_id = req.user.id;
    let startDate = new Date();
    let endDate;
    if (req.body.amt === 499) {
      endDate = getEndDate(startDate, 6);
    } else {
      endDate = getEndDate(startDate, 12);
    }
    const user = await User.findById(user_id);
    if (user.subscriber) {
      return res.json({ error: "You already have a plan" });
    }
    const trans = await Transaction.create({
      username: user.username,
      order_id: req.body.razorpay_order_id,
      payment_id: req.body.razorpay_payment_id,
      signature: req.body.razorpay_signature,
      amount: req.body.amt,
      date: startDate,
    });
    trans.save();
    user instanceof User;
    user.subscriber = true;
    user.start_date = startDate;
    user.end_date = endDate;
    user.amount = req.body.amt;
    user.save();
    res.json({ msg: "Payment Successfull" });
  } catch (error) {
    res.send(error);
  }
});

router.post("/marksubscriberfalse", getuser, async (req, res) => {
  try {
    const user_id = req.user.id;
    const user = await User.findById(user_id);
    user instanceof User;
    user.subscriber = false;
    user.save();
    res.json({ msg: "Your subscription in ended" });
  } catch (error) {
    res.send(error);
  }
});

router.post("/verify", (req, res) => {
  let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

  var crypto = require("crypto");
  var expectedSignature = crypto
    .createHmac("sha256", config.payment.secret)
    .update(body.toString())
    .digest("hex");
  var response = { signatureIsValid: "false" };
  if (expectedSignature === req.body.razorpay_signature)
    response = { signatureIsValid: "true" };
  res.send(response);
});

module.exports = router;
