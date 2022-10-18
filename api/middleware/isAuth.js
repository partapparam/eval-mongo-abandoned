const expressJwt = require("express-jwt")
const publicKey = process.env.JWT_PUBLIC_KEY

// We are assuming that the JWT will come in the header Authorization
const getTokenFromHeader = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    console.log("here we are")
    return req.headers.authorization.split(" ")[1]
  }
}

export default expressJwt({
  secret: publicKey,
  userProperty: "token", // this is where the next middleware can find the encoded data generated in services/auth:generateToken
  algorithms: ["RS256"],
  getToken: getTokenFromHeader,
})
