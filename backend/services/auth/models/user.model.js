import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUld: {
      type: String,
      unique: true,
    },
    name: String,
    email: String,
    avator: String,
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
