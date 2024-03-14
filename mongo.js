const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: ["electronics", "clothing", "books"],
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

async function main() {
  const db = await mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB");
  console.log("Connected to MongoDB");
}

async function createUser(username, email) {
  return await User.create({ username, email });
}

async function findUserByUsername(username) {
  return await User.findOne({ username });
}

async function updateUser(userId, newData) {
  return await User.findByIdAndUpdate(userId, newData, { new: true });
}

async function deleteUserById(userId) {
  return await User.findByIdAndDelete(userId);
}

async function createProduct(name, price, category) {
  return await Product.create({ name, price, category });
}

async function findProductsByCategory(category) {
  return await Product.find({ category });
}

async function findProductsByPriceRange(minPrice, maxPrice) {
  return await Product.find({ price: { $gte: minPrice, $lte: maxPrice } });
}

async function averagePriceByCategory(category) {
  return await Product.aggregate([
    { $match: { category } },
    { $group: { _id: null, avgPrice: { $avg: "$price" } } },
  ]);
}

main().catch((err) => console.log(err));
