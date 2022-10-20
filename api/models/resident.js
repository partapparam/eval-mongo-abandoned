const mongoose = require("mongoose")

/**
 * Many to Many Relationship with ADDRESS model.
 *
 * toJSON.transform is used to edit JSON object we get
 */

const residentsSchema = new mongoose.Schema(
  {
    residentName: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    current: Boolean,
    address: { type: mongoose.Types.ObjectId, ref: "address" },
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

const Resident = mongoose.model("Resident", residentsSchema)
module.exports = Resident
