const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  authkey: {
    type: String,
    default: "Not-Generated",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  subscriber: {
    type: Boolean,
    default: false,
  },
  start_date: {
    type: Date,
    default: null,
  },
  end_date: {
    type: Date,
    default: null,
  },
  amount: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;
