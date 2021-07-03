const mongoose = require("mongoose");
var collection=mongoose.model("Payment", {
    roomNumber: {
        type: Number,
        require: true
    },
    mode: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    }
});
module.exports= collection;