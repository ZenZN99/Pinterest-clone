import mongoose from "mongoose";

 export interface IUser {
  _id: string;
  fullname: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  cover: string;
  bio: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    role: {
      type: String,
      enum: ["Admin","user"],
      default: "user",
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dgagbheuj/image/upload/v1763194734/avatar-default-image_yc4xy4.jpg",
    },
    cover: {
      type: String,
      default:
        "https://res.cloudinary.com/dgagbheuj/image/upload/v1763194811/cover-default-image_uunwq6.jpg",
    },
    bio: {
      type: String,
      default: "Welcome to pinterest clone Website!",
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;