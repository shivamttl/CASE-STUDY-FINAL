
const dataBase = require("../collections");

// test data
// {
//     "name": "shiva",
//     "empid": 007,
//     "role": "owner",
//     "designation": "owner",
//     "salary": 10000,
//     "age": 24,
//     "username": "username",
//     "password": "password"
// }
//post (create)
module.exports.create =  (req, res) => {
    // var newData = {
    //     name: req.body.name,
    //     empid: req.body.empid,
    //     designation: req.body.designation,
    //     salary: req.body.salary,
    //     age: req.body.age,
    // }
    // use newData in place of req.body
    var data = new dataBase(req.body);
    data.save().then(() => {
        console.log("new data created")
    }).catch((err) => {
        res.sendStatus(404);
    })
    console.log(req.body);
    res.send("data sent");
}
//total salary
module.exports.totalSalary =  (req, res) => {
    dataBase.aggregate(
        [
          {
            $group: {
              _id: "$designation",  Total_Salary: {$sum: "$salary"}
            }
          }
        ],
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.json(result);
          }
        }
      );

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

// //delete all
// app.delete('/inventory', (req, res) => {
//     dataBase.remove().then(() => {
//         console.log("removed all");
//         res.send("deleted all");
//     }).catch(err => {
//         throw err;
//     })
// })
