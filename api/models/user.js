const mongoose = require("mongoose")

/**
 * toJSON Transform function will allow us to edit the JSON object that is sent back, removing fields and changing the _id to id
 */

const usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, message: "Username is required" },
    name: {
      first: {
        type: String,
        required: true,
        message: "first name is required",
      },
      last: { type: String, required: true, message: "last name is required" },
    },
    email: { type: String, required: true, message: "Email is required" },
    passwordHash: {
      type: String,
      required: true,
      message: "password is required",
    },
    image: String,
    jobTitle: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
      },
    },
  }
)
/**
 * Validates unique email
 * TODO validate that it is an email as well
 */
usersSchema.path("email").validate(async (email) => {
  const emailCount = await User.countDocuments({
    email: email,
  })
  return !emailCount
}, "Email already exists")

const User = mongoose.model("User", usersSchema)

module.exports = User
