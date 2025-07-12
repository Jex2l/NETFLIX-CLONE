const mongoose = require("mongoose");
const { Schema } = mongoose;

const LikedItemsSchema = new Schema({
  item_id: {
    type: String,
    required: true,
  },
  liked_by: {
    type: String,
    required: true,
  },
});

const LikedItems = mongoose.model("likeditems", LikedItemsSchema);
LikedItems.createIndexes();
module.exports = LikedItems;
