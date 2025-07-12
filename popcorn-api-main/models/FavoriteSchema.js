const mongoose = require("mongoose");
const { Schema } = mongoose;

const FavoriteItemSchema = new Schema({
  item_id: {
    type: String,
    required: true,
  },
  favorite_of: {
    type: String,
    required: true,
  },
});

const FavoriteItem = mongoose.model("favoriteitems", FavoriteItemSchema);
FavoriteItem.createIndexes();
module.exports = FavoriteItem;
