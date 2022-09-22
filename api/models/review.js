const mongoose = require("mongoose")
const { Schema } = mongoose

/**
 * trim: true will call JS trim() function
 */
const reviewsSchema = new Schema(
  {
    text: { type: String, trim: true, maxLength: 200 },
    friendly: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
      message: "Friendly rating is required",
    },
    hospitable: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
      message: "Hospitable rating is required",
    },
    payment: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
      message: "Prompt Payment rating is required",
    },
    respectful: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
      message: "Respectful rating is required",
    },
    expectations: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
      message: "Expectations rating is required",
    },
    visitType: String,
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      },
    },
  }
)

const Review = mongoose.model("Review", reviewsSchema)
module.exports = Review
