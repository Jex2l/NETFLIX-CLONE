const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  payment_id: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model("transaction", TransactionSchema);
Transaction.createIndexes();
module.exports = Transaction;
