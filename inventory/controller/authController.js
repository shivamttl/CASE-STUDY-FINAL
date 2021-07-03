const dataBase = require("../collections");

module.exports.create =  (req, res) => {
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

//get all
module.exports.read =  (req, res) => {
    dataBase.find().then((items) => {
        res.json(items)
    }).catch(err => {
        res.sendStatus(404);
        throw err;
    })
}

//get by id
module.exports.readOne =  (req, res) => {
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
module.exports.update =  (req, res) => {
    dataBase.findByIdAndUpdate(req.params.id, req.body).then((items) => {
        res.send(items);
    }).catch((err) => {
        res.sendStatus(404);
    })
}

//delete by id
module.exports.delete =  (req, res) => {
    dataBase.findByIdAndRemove({ _id: req.params.id }).then(console.log("deleted")).catch((err) => {
        if (err) {
            res.sendStatus(404);
            throw err;
        }
    })
    res.send("deleted");
}


