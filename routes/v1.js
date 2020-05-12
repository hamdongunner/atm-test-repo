const express = require("express");
const router = express.Router();
const atmController = require("../controllers/atm.controller");

router.get("/", atmController.getAll);

router.get("/api/singleAtm/:id", atmController.singleGet);

router.post("/api/Newatm", atmController.addNew);

router.put("/updateAtm/:id", atmController.updatee);

router.delete("/deleteAtm/:id", atmController.deletee);

module.exports = router;
