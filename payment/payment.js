const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const dotenv = require("dotenv");
const cors = require("cors");
const crypto = require("crypto");
const Razorpay = require("razorpay");
dotenv.config();
const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false, })); //to provise all the warnings that we get
app.set("view engine", "ejs");
app.get("/payments", (req, res) => {
  res.render("payment", { key: process.env.KEY_ID });
});
app.post("/api/payment/order", (req, res) => {
  params = req.body;
  instance.orders
    .create(params)
    .then((data) => {
      res.send({ sub: data, status: "success" });
    })
    .catch((error) => {
      res.send({ sub: error, status: "failed" });
    });
});
app.post("/api/payment/verify", (req, res) => {
  body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;   //get either of these 2
  var expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  var response = { status: "failure" };
  if (expectedSignature === req.body.razorpay_signature)
    response = { status: "success" };
  res.send(response);
});

const mongoose = require("mongoose");
const routes = require('./routes/api');
app.use('/payment', routes);

mongoose.connect("mongodb+srv://admin:admin@cluster0.clq6u.mongodb.net/Payment", () => {
  console.log("Payment database connected");
});

const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json")
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// listen for requests
var server = app.listen(process.env.port || 5000, function () {
  console.log('Payment SERVER UP & RUNNING');
});
module.exports = server;
