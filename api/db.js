const mongoose = require("mongoose")

// If there is not connection string, this will exit as error
if (!process.env.MONGO_DB) {
  console.log("No connection string")
  process.exit(1)
}

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", (err) => {
  console.log(err, "Mongodb.js error")
  process.exit(1)
})

db.once("open", () => {
  console.log("Mongo DB is open")
})

// const author = new mo.Person({
//   // the ID field must be created here
//   // _id: new mongoose.Types.ObjectId(),
//   name: "Ian Fleming",
//   age: 50,
// })

// author.save(function (err) {
//   if (err) return console.log(err)
//   // console.log(author)

//   const story1 = new mo.Story({
//     title: "Casino Royale",
//     author: author._id, // assign the _id from the person
//   })
//   // console.log(story1)

//   story1.save(function (err) {
//     if (err) return console.log(err)
//     // that's it!
//   })
// })

// mo.Story.findOne({ title: "Casino Royale" })
//   .populate("author", "name")
//   .exec(function (err, story) {
//     if (err) return console.log(err)
//     console.log("The author is %s", story)
//     // prints "The author is Ian Fleming"
//   })

// mo.Story.findOne({ title: "Casino Royale" }, function (error, story) {
//   if (error) {
//     return console.log(error)
//   }
//   story.author = author
//   console.log(author, "this shows author")
//   console.log(story.author.name, "this also worked") // prints "Ian Fleming"
// })

module.exports = db
