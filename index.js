const express = require("express");
const app = express();
const firstMiddleware = require("./middlewares/firstMiddleware");
const mongoose = require("mongoose");
const routerV1 = require("./routes/v1");

app.use(express.json());
app.use(firstMiddleware);

mongoose
  .connect("mongodb://Mays:maysmlab1@ds363118.mlab.com:63118/atm-db")
  .then(() => console.log("connected to the database ^_^"))
  .catch((err) => console.error("Connection Faild!"));

app.use("/v1", routerV1);
app.use("/", (req, res) => {
  return res.status(400).send({
    msg: "404 Not Found",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to ${port}...`));
