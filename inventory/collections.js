const mongoose = require("mongoose");
var collection=mongoose.model("Inventory", {
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    roomNumber:{
        type: Number,
        require: true
    }
});
module.exports= collection;