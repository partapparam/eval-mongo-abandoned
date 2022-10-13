const User = require("../models/user")
const usersRouter = require("express").Router()
const bcrypt = require("bcrypt")
const { update } = require("../models/resident")

/**
 * get all users
 */
usersRouter.get("/all", async (req, res) => {
  try {
    const users = await User.find()
    res.json({ message: "success", data: users })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "error", data: "cannot find users" })
  }
})

// Get user by id
usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.findById(id)
    res.json({ message: "success", data: user })
  } catch {
    // logger.error(error)
    //   TODO = res.status vs res.json
    //   how to check for res.status on client side
    res.status(500).json({ message: "error", data: "cannot find user" })
  }
})

// Create new user
usersRouter.post("/new", async (req, res) => {
  const user = req.body
  const saltRounds = 10
  try {
    const existingUser = await User.findOne(user.username)
    // if the username already exists, return an error
    if (existingUser)
      return res.json({ message: "error", data: "Username already exists" })
    const passwordHash = await bcrypt.hash(user.password, saltRounds)
    const savedUser = await new User(user).save()
    return res.json()
  } catch {
    res.status(500).json({ message: "error", data: "Could not save user" })
  }
})

/**
 * Update User by Id
 * By default, Mongo will send back old record
 * See options in query
 */
usersRouter.put("/update/:id", async (req, res) => {
  const id = req.params.id
  const body = req.body
  const user = {
    name: {
      first: body.first,
      last: body.last,
    },
    email: body.email,
    username: body.username,
    image: body.image,
    jobTitle: body.jobTitle,
  }
  console.log(user, req)

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    })
    console.log(updatedUser)
    return res.json({ message: "success", data: updatedUser })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ message: "error" })
  }
})

module.exports = usersRouter
