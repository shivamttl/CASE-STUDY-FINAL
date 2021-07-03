var nodemailer = require('nodemailer');
const dataBase = require("../collections");
const axios=require("axios");
module.exports.create = (req, res) => {
  var data = new dataBase(req.body);
  var message= JSON.stringify(data);
  data.save().then(() => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hotelcasestudy@gmail.com',
        pass: 'casestudy2021'
      }
    });

    var mailOptions = {
      from: 'hotelcasestudy@gmail.com',
      to: data.personal.email,
      subject: 'Sending Email using Node.js',
      html: `<h1>Hi ${data.personal.name} </h1><h2> Welcome to our hotel </h2> <p>Your Details are :${message} </p> `
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    console.log("new data created");
  }).catch((err) => {
    res.sendStatus(404);
    throw err;
  })
  console.log(req.body);
  res.send("data sent")
}

//get all
module.exports.read = (req, res) => {
  dataBase.find().then((items) => {
    res.json(items)
  }).catch(err => {
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
    res.sendStatus(200);
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


module.exports.availableRoom = (req, res) => {
  axios.get("http://localhost:2000/room/availableRoom").then((response) => {
    var views = response.data;
    res.send(views);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.occupiedRoom = (req, res) => {
  axios.get("http://localhost:2000/room/occupiedRoom").then((response) => {
    var views = response.data;
    res.send(views);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.checkIn = (req, res) => {
  const number = req.params.number;
  axios.put("http://localhost:2000/room/checkIn/" + number, number).then((response) => {
    var views = response.data;
    res.send(views);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
//both ways work same
module.exports.checkOut = (req, res) => {
  axios.put("http://localhost:2000/room/checkOut/" + req.params.number).then((response) => {
    var views = response.data;
    res.send(views);
  }).catch((err) => {
    if (err)
      throw err;
  })
}



