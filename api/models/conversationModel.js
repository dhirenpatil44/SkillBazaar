import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  sellerId: {
    type: String,
    required: true,
  },
  buyerId: {
    type: String,
    required: true,
  },
  readByBuyer: {
    type: Boolean,
    required: true,
  },
  readBySeller: {
    type: Boolean,
    required: true,
  },
  lastMessage: {
    type: String,
    required: false,
  },
}, {
  timestamps: true
})

export default mongoose.model("Conversation", conversationSchema)