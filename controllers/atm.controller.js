const validation = require("../utility/validation");
const validate = require("validate.js");
const mongooseModule = require("../modules/mongooseModule");

module.exports.singleGet = async (req, res) => {
  const singleAtm = await mongooseModule.findById(req.params.id);
  if (!singleAtm)
    return res.status(404).send("The ATM with the specific ID is not found!!");
  res.send(singleAtm);
};

module.exports.getAll = async (req, res) => {
  const allAtms = await mongooseModule.find();
  res.send(allAtms);
};

module.exports.addNew = async (req, res) => {
  const check = validate(req.body, validation.addNew());

  if (check) {
    return res.status(400).send(check);
  } else {
    const allAtms = new mongooseModule({
      name: req.body.name,
      haveCash: req.body.haveCash,
      working: req.body.working,
      country: req.body.country,
      city: req.body.city,
      address: req.body.address,
      loc: {
        typee: req.body.loc.type,
        coordinates: req.body.loc.coordinates,
      },
    });
    allAtms.save();
    return res.send(allAtms);
  }
};

module.exports.updatee = async (req, res) => {
  const atm = await mongooseModule.findByIdAndUpdate(
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
};

module.exports.deletee = async (req, res) => {
  const atm = await AtmCollection2.findByIdAndRemove(req.params.id);
  if (!atm)
    return res.status(404).send("The ATM with the specific ID is not found!");
  res.send(atm);
};
