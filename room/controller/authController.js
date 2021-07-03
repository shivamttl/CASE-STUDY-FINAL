const dataBase = require("../collections");

module.exports.create = (req, res) => {
    var data = new dataBase(req.body);
    data.save().then(() => {
        console.log("new data created")
    }).catch((err) => {
        res.sendStatus(404);
        throw err;
    })
    console.log(req.body);
    res.send("data sent")
}
// room report
//total salary
module.exports.roomReport = (req, res) => {
    dataBase.aggregate(
        [
            {
                $group: {
                    _id: "$available", Total: { $sum: "$rate" }
                }
            }
        ],
        function (err, result) {
            if (err) {
                res.sendStatus(404);
                res.send(err);
            } else {
                res.json(result);
            }
        }
    );

}

//available rooms
module.exports.availableRoom = (req, res) => {
    // dataBase.aggregate(
    //     [ { $match : { available : true } } ],
    // function(err, result) {
    //     if (err) {
    //       res.send(err);
    //     } else {
    //       res.json(result);
    //     }
    //   }
    // );
    dataBase.find({ available: true }, function (err, result) {
        if (err) {
            res.sendStatus(404);
            res.send(err);
        } else {
            res.json(result);
        }
    })
}

//occupied rooms
module.exports.occupiedRoom = (req, res) => {
    // dataBase.aggregate(
    //     [ { $match : { available : false } } ],
    // function(err, result) {
    //     if (err) {
    //       res.send(err);
    //     } else {
    //       res.json(result);
    //     }
    //   }
    // );
    dataBase.find({ available: false }, function (err, result) {
        if (err) {
            res.sendStatus(404);
            res.send(err);
        } else {
            res.json(result);
        }
    })
}

//checkin
module.exports.checkIn = (req, res) => {
    dataBase.update({ number: req.params.number }, { $set: { available: false } })
    .then((items) => {
        res.send(items);
    }).catch((err) => {
        res.sendStatus(404);
        console.log(err);
    })
}

//checkout
module.exports.checkOut = (req, res) => {
    dataBase.update({ number: req.params.number }, { $set: { available: true } })
    .then((items) => {
        res.send(items);
    }).catch((err) => {
        res.sendStatus(404);
        console.log(err);
    })
}

//get all
module.exports.read = (req, res) => {
    dataBase.find().then((items) => {
        res.json(items)
    }).catch(err => {
        res.sendStatus(404);
        throw err;
    })
}

//get by id
module.exports.readOne = (req, res) => {
    dataBase.findById(req.params.id).then((data) => {
        if (data) {
            res.json(data)
        } else {
            res.sendStatus(404);
        }
    }).catch((err) => {
        if (err) {
            res.sendStatus(404);
            throw err;
        }
    })
}

//put update
module.exports.update = (req, res) => {
    dataBase.findByIdAndUpdate(req.params.id, req.body).then((items) => {
        res.send(items);
    }).catch((err) => {
        res.sendStatus(404);
    })
}

//delete by id
module.exports.delete = (req, res) => {
    dataBase.findByIdAndRemove({ _id: req.params.id }).then(console.log("deleted")).catch((err) => {
        if (err) {
            res.sendStatus(404);
            throw err;
        }
    })
    res.send("deleted");
}


