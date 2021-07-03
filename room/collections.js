const mongoose =require("mongoose");
var collection=mongoose.model("Room",{
    type: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    rate: {
        type: Number,
        require: true
    },   
    size: {
        type: Number,
        require: true
    },
    available: {
        type: Boolean,
        require: false,
        default: true
    }
});
module.exports= collection;