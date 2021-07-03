const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());  // used to parse json object passed by user to be used in code.(req object)
app.use(cookieParser());

const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger.json")
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

  mongoose.connect("mongodb+srv://admin:admin@cluster0.clq6u.mongodb.net/JWT", () => {
    console.log("database connected");
});

var server=app.listen(process.env.port || 7000, function(){
    console.log('SERVER UP & RUNNING');
});
module.exports=server;

app.use(authRoutes);

