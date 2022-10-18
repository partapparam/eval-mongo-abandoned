const jwt = require("jsonwebtoken")
const secretKey = process.env.JWT_SECRET_KEY
const authRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

/**
 * Validates that a user exists
 */
const validate = async (email) => {
  return await User.findOne({ email })
}

/**
 * Create JWT Token
 */
const createToken = (user) => {
  return jwt.sign({ id: user.id }, secretKey, {
    algorithm: "RS256",
    expiresIn: 12000,
    subject: "Login Details",
  })
}

/**
 * Sign up
 * Create JWT Token, send back to client along with Saved User
 */
authRouter.post("/signup", async (req, res) => {
  const user = req.body
  const saltRounds = 10
  try {
    const existingUser = await validate(user.email)
    if (existingUser) {
      throw new Error("The user already exists, please login with email")
    }
    user.passwordHash = await bcrypt.hash(user.password, saltRounds)
    const savedUser = await new User(user).save()
    const token = createToken(user)
    return res.json({ message: "success", data: savedUser, token: token })
  } catch (error) {
    console.log("signup error")
    console.log(error._message, error.message)
    res.status(500).json({ message: "error", data: error.message })
  }
})

/**
 * Login existing user or return error
 * If Success, return user and JWT Token
 */
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await validate(email)
    if (!user) {
      throw new Error("Please enter correct Email")
    }
    const result = await bcrypt.compare(password, user.passwordHash)
    if (!result) {
      throw new Error("Please enter correct Password.")
    }
    const token = createToken(user)
    return res
      .status(200)
      .json({ message: "success", data: token, expiresIn: 12000 })
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({ message: error.message })
  }
})

/**
 * Forgot Password
 * TODO
 */

module.exports = authRouter
