// const mongoose = require("mongoose")
// const { Schema } = mongoose

// // const usersSchema = new mongoose.Schema(
// //   {
// //     username: String,
// //     name: {
// //       first: String,
// //       last: String,
// //     },
// //   },
// //   { strict: false }
// // )

// const personSchema = new Schema(
//   {
//     name: String,
//     age: Number,
//     stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
//   },
//   { timestamps: true }
// )

// const storySchema = new Schema(
//   {
//     author: { type: Schema.Types.ObjectId, ref: "Person" },
//     title: String,
//     fans: [{ type: Schema.Types.ObjectId, ref: "Person" }],
//   },
//   { timestamps: true }
// )

// const Story = mongoose.model("Story", storySchema)
// const Person = mongoose.model("Person", personSchema)

// const author = new Person({
//   // the ID field must be created here
//   // _id: new mongoose.Types.ObjectId(),
//   name: "Ian Fleming",
//   age: 50,
// })

// author.save(function (err) {
//   if (err) return console.log(err)
//   // console.log(author)

//   const story1 = new Story({
//     title: "Casino Royale",
//     author: author._id, // assign the _id from the person
//   })
//   // console.log(story1)

//   story1.save(function (err) {
//     if (err) return console.log(err)
//     // that's it!
//   })
// })
// Story.findOne({ title: "Casino Royale" })
//   .populate("author", "name")
//   .exec(function (err, story) {
//     if (err) return console.log(err)
//     console.log("The author is %s", story)
//     // prints "The author is Ian Fleming"
//   })

// // mo.Story.findOne({ title: "Casino Royale" }, function (error, story) {
// //   if (error) {
// //     return console.log(error)
// //   }
// //   story.author = author
// //   console.log(author, "this shows author")
// //   console.log(story.author.name, "this also worked") // prints "Ian Fleming"
// // })
// module.exports = { Story, Person }
