const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
const routes=require('./routes/api');
app.use('/guest',routes);

mongoose.connect("mongodb+srv://admin:admin@cluster0.clq6u.mongodb.net/Guest", () => {
    console.log("Guest database connected");
});

const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger.json")
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

// listen for requests
var server=app.listen(process.env.port || 1000, function(){
    console.log('Guest SERVER UP & RUNNING');
});
module.exports=server;