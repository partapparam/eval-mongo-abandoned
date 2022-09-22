const mongoose = require("mongoose")
const Resident = require("./resident")

/**
 * toJSON.tranform - perform a transformation of the resulting object based on some criteria, say to remove some sensitive information or return a custom object
 * document =  The mongoose document which is being converted
 * returnedObject = The plain object representation which has been converted
 */

const addressesSchema = new mongoose.Schema(
  {
    streetAddress: String,
    zipcode: { type: Number, min: [5, "Zip code must be five digits"] },
    addressType: String,
    unitNumber: String,
    currentResident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
    },
    pastResidents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resident",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      },
    },
  }
)

const Address = mongoose.model("Address", addressesSchema)
module.exports = Address
