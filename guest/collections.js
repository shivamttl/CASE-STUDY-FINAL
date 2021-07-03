const mongoose = require("mongoose");
var collection = mongoose.model("Guest", {
    roomNumber: {
        type: Number,
        require: true
    },
    guests: {
        type: Number,
        require: true
    },
    personal: {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        identity: {
            type: String,
            require: true
        },
        phone: {
            type: Number,
            require: true
        }
    },
    timeline: {
        timeIn: {
            type: String,
            require: false
        },
        timeOut: {
            type: String,
            require: false
        },
        days: {
            type: Number,
            require: false
        }
    },
    payment: {
        total: {
            type: Number,
            require: false
        },
        paid: {
            type: Number,
            require: false
        },
        balance: {
            type: Number,
            require: false
        }
    }
});
module.exports = collection;