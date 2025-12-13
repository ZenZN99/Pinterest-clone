import mongoose from "mongoose";

export interface IImage {
  _id: string
  title: string;
  content: string;
  imageType: string;
  image: string;
  user: mongoose.Schema.Types.ObjectId;
}

const imageSchema = new mongoose.Schema<IImage>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageType: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);
export default Image;
