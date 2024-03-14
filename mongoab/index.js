import mongoose from "mongoose";
import express from "express";

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Ariprj");
}

main().catch((err) => console.log(err.message));

const userSchema = new mongoose.Schema({
  name: String,
  Email: String,
  mobile: Number,
});

const User = mongoose.model("User", userSchema);

const user2 = new User({
  name: "Daniel",
  Email: "x@y.com",
  mobile: 172904552,
});

const user3 = new User({
  name: "Tairo",
  Email: "t@b.com",
  mobile: 172904552,
});

// const tairos = await User.find({ name: "Tairo" });

// console.log(tairos);

// console.log(await User.find({ _id: `65f2f4d306df5e35cc5173d0` }));

// await User.findByNameAndDelete({ _id: `65f2f4d306df5e35cc5173d0` });

// console.log(await User.find({ _id: `65f2f4d306df5e35cc5173d0` }));

// tairos.map(async (tairo) => {
//   await User.findByIdAndDelete({ _id: `${tairo._id}` });
// });

const daniels = await User.find({ name: "Daniel" });

daniels.map(async (daniel) => {
  await User.findByIdAndDelete({ _id: `${daniel._id}` });
});

console.log(daniels);
