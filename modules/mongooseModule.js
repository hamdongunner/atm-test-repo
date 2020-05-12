const mongoose = require("mongoose");

const atmSchema = new mongoose.Schema({
  name: String,
  creationDate: { type: Date, default: Date.now },
  haveCash: Boolean,
  working: Boolean,
  country: String,
  city: String,
  address: String,
  loc: {
    typee: String,
    coordinates: [Number],
  },
});

const AtmCollection2 = mongoose.model("AtmCollection2", atmSchema);

module.exports = AtmCollection2;
