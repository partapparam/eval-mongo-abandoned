const mongoose = require("mongoose")
const { Schema } = mongoose

const likesSchema = new mongoose.Schema(
  {
    like: { type: Boolean, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    review: {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
      },
    },
  }
)

const Like = mongoose.model("Like", likesSchema)
module.exports = Like
