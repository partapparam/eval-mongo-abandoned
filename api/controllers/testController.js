const testRouter = require("express").Router()
const User = require("../models/User")
const Like = require("../models/Like")
const Address = require("../models/Address")
const Review = require("../models/Review")
const Resident = require("../models/Resident")

// users
testRouter.get("/user/:id", async (req, res) => {
  const id = req.params.id
})
testRouter.post("/user/new", async (req, res) => {
  const user = req.body
  try {
    const savedUser = await new User(user).save()
    if (!savedUser) throw new Error("could not save user")
    res.json({ data: savedUser })
  } catch (error) {
    res.json({ data: error })
  }
})

// Address
testRouter.get("/address/:id", async (req, res) => {
  const addressId = req.params.id
  try {
    const address = await Address.findOne({ id: addressId })
    return res.json({ data: address, message: "success" })
  } catch (error) {
    return res.json({ message: "success", data: error })
  }
})
testRouter.post("/address/new", async (req, res) => {
  const newAddress = req.body
  try {
    const savedAddress = await new Address(newAddress).save()
    return res.json({ message: "success", data: savedAddress })
  } catch (error) {
    return res.json({ message: "error", data: error })
  }
})

// Resident
testRouter.get("/resident/:id", async (req, res) => {
  const residentId = req.params.id
  try {
    const resident = await Resident.findOne({ id: residentId })

    return res.json({ message: "success", data: resident })
  } catch (error) {
    return res.json({ message: "error", data: error })
  }
})

testRouter.post("/resident/new", async (req, res) => {
  const newResident = req.body
  try {
    const savedResident = await new Resident(newResident).save()
    return res.json({ message: "success", data: savedResident })
  } catch (error) {}
})

module.exports = testRouter
