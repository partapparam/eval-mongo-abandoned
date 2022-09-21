const mongoose = require("mongoose")
const { Schema } = mongoose

// const usersSchema = new mongoose.Schema(
//   {
//     username: String,
//     name: {
//       first: String,
//       last: String,
//     },
//   },
//   { strict: false }
// )

const personSchema = new Schema(
  {
    name: String,
    age: Number,
    stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
  },
  { timestamps: true }
)

const storySchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "Person" },
    title: String,
    fans: [{ type: Schema.Types.ObjectId, ref: "Person" }],
  },
  { timestamps: true }
)

const Story = mongoose.model("Story", storySchema)
const Person = mongoose.model("Person", personSchema)
module.exports = { Story, Person }
