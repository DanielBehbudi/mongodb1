const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3050;

mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const productSchema = new mongoose.Schema(
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

app.get("/", async (req, res) => {
  const users = await User.find();
  const products = await Product.find();
  res.render("index", { users, products });
});

app.set("view engine", "ejs");
app.listen(port, () => console.log(`Server running on port ${port}`));
