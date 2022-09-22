const mongoose = require("mongoose")

/**
 * toJSON Transform function will allow us to edit the JSON object that is sent back, removing fields and changing the _id to id
 */

const usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, message: "Username is required" },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
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
 */
usersSchema.path("email").validate(async (email) => {
  const emailCount = await mongoose.models.users.countDocuments({ email })
  return !emailCount
}, "Email already exists")

const User = mongoose.model("User", usersSchema)

module.exports = User
