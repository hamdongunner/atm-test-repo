const express = require("express");
const app = express();
const validate = require("validate.js");
const Joi = require("joi");

app.use(express.json());

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://Mays:maysmlab1@ds363118.mlab.com:63118/atm-db")
  .then(() => console.log("connected to the database ^_^"))
  .catch((err) => console.error("Connection Faild!"));

const atmSchema = new mongoose.Schema({
  name: String,
  creationDate: { type: Date, default: Date.now },
  haveCash: Boolean,
  working: Boolean,
  country: String,
  city: String,
  address: String,
  loc: {
    type: String,
    coordinates: [Number],
  },
});

const AtmCollection2 = mongoose.model("AtmCollection2", atmSchema);

app.get("/api/singleAtm/:id", async (req, res) => {
  const singleAtm = await AtmCollection2.findById(req.params.id);
  if (!singleAtm)
    return res.status(404).send("The ATM with the specific ID is not found!!");
  res.send(singleAtm);
});

app.get("/api/atms", async (req, res) => {
  const allAtms = await AtmCollection2.find();
  res.send(allAtms);
});

app.post("/api/Newatm", async (req, res) => {
  const constraints = {
    name: {
      presence: true,
      length: {
        minimum: 3,
        message: "must be at least 6 characters",
      },
      format: {
        pattern: "[a-z0-9]+",
        flags: "i",
        message: "can only contain a-z and 0-9",
      },
    },
    country: {
      inclusion: {
        within: { Iraq: "IQ", Egypt: "EG", Emirates: "AE" },
        message: "^We're not providing services to %{value}",
      },
    },
  };
  const check = validate(req.body.name, constraints);
  console.log(check);

  if (check.error) {
    res.status(400).send(res.check.error);
    return;
  } else {
    const allAtms = new AtmCollection2({
      name: req.body.name,
      haveCash: req.body.haveCash,
      working: req.body.working,
      country: req.body.country,
      city: req.body.city,
      address: req.body.address,
      loc: {
        type: req.body.type,
        coordinates: [req.body.latitude, req.body.longitude],
      },
    });
    allAtms.save();
    res.send(allAtms);
  }
});

app.put("/updateAtm/:id", async (req, res) => {
  const atm = await AtmCollection2.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      haveCash: req.body.haveCash,
      working: req.body.working,
      country: req.body.country,
      city: req.body.city,
      address: req.body.address,
    },
    { new: true }
  );

  if (!atm)
    return res.status(404).send("The ATM with the specific ID is not found!");
  res.send(atm);
});

app.delete("/deleteAtm/:id", async (req, res) => {
  const atm = await AtmCollection2.findByIdAndRemove(req.params.id);
  if (!atm)
    return res.status(404).send("The ATM with the specific ID is not found!");
  res.send(atm);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to ${port}...`));
