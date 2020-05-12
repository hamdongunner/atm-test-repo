module.exports = (req, res, next) => {
  console.log("My first middleware!");
  next();
};
