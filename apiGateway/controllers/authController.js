var nodemailer = require('nodemailer');
const dataBase = require("../models/User");
const jwt = require('jsonwebtoken');
const axios = require("axios");
const { response } = require("express");
// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    //err.errors will find errors property inside err message
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 1000 * 60 * 60; //milliseconds
const createToken = (id, role) => {
  // return jwt.sign({ id }, 'hotel management', { //id is payload next is secret
  //   expiresIn: maxAge
  // });
  if (role == "reception") {
    return jwt.sign({ id }, 'reception', { //id is payload next is secret
      expiresIn: maxAge
    });
  } else {
    if (role == "manager") {
      return jwt.sign({ id }, 'manager', { //id is payload next is secret
        expiresIn: maxAge
      });
    } else {
      if (role == "owner") {
        return jwt.sign({ id }, 'owner', { //id is payload next is secret
          expiresIn: maxAge
        });
      }
    }
  }

};


//showusers and createuser are for swagger only
module.exports.showusers = (req, res) => {
  dataBase.find().then((items) => {
    res.json(items)
  }).catch(err => {
    res.sendStatus(404);
    throw err;
  })
}
module.exports.showuser = (req, res) => {
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

module.exports.deleteuser = (req, res) => {
  dataBase.findByIdAndRemove({ _id: req.params.id }).then(console.log("deleted")).catch((err) => {
    if (err) {
      res.sendStatus(404);
      throw err;
    }
  })
  res.send("deleted");
}

module.exports.createuser = async (req, res) => {
  const { email, password, role } = req.body; //req.body contains data passed by user
  try {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hotelcasestudy@gmail.com',
        pass: 'casestudy2021'
      }
    });
    var mailOptions = {
      from: 'hotelcasestudy@gmail.com',
      to: email,
      subject: 'Sending Email using Node.js',
      // text: `sent ${email}  ${role}  ${password} from nodejs.`,
      html: `<h1>Hi ${email} </h1><h2> Welcome as ${role}</h2> <p>Your Password:${password} </p> `
    };
    const user = await dataBase.create({ email, password, role });
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.sendStatus(404);
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    console.log("new data created");
    res.status(201);
    res.send("user created");
  }
  catch (err) {
    res.sendStatus(404);
    const errors = handleErrors(err);
    res.status(404);
    res.send(errors.email);
    res.send(errors.password);

  }

}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await dataBase.login(email, password); //cheching email and password in database
    const token = createToken(user._id, user.role);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
    res.status(200);
    if (user.role == 'reception') {
      res.send('/reception'); //forward to reception\
    }
    else if (user.role == 'manager') {
      res.send('/manager'); //forward to manager\
    }
    else if (user.role == 'owner') {
      res.send('/owner'); //forward to owner\
    }
  }
  catch (err) {
    const errors = handleErrors(err);// to display at html
    res.status(404);
    console.log(errors.email);
    console.log(errors.password);
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.send('LOGGED OUT      LOGIN AGAIN');
}
module.exports.update = (req, res) => {
  dataBase.findByIdAndUpdate(req.params.name, req.body).then((items) => {
    res.send(items);
  }).catch((err) => {
    res.sendStatus(404);
    console.log(err);
  })
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
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.readRoom = (req, res) => {
  axios.get("http://localhost:2000/room/read").then((response) => {
    var views = response.data;
    res.send(views);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.roomReport = (req, res) => {
  axios.get("http://localhost:2000/room/roomReport").then((response) => {
    var views = response.data;
    res.send(views);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.readOneRoom = (req, res) => {
  axios.get("http://localhost:2000/room/read/" + req.params.id).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.updateRoom = (req, res) => {
  axios.put("http://localhost:2000/room/update/" + req.params.id, req.body).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.createRoom = (req, res) => {
  axios.post("http://localhost:2000/room/create", req.body).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.deleteRoom = (req, res) => {
  axios.delete("http://localhost:2000/room/delete/"+ req.params.id).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}


//inventory

module.exports.readInventory = (req, res) => {
  axios.get("http://localhost:3000/inventory/read").then((response) => {
    var views = response.data;
    res.send(views);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.readOneInventory = (req, res) => {
  axios.get("http://localhost:3000/inventory/read/" + req.params.id).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.updateInventory = (req, res) => {
  axios.put("http://localhost:3000/inventory/update/" + req.params.id, req.body).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.createInventory = (req, res) => {
  axios.post("http://localhost:3000/inventory/create", req.body).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.deleteInventory = (req, res) => {
  axios.delete("http://localhost:3000/inventory/delete/"+ req.params.id).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}

// staff


module.exports.readStaff = (req, res) => {
  axios.get("http://localhost:4000/staff/read").then((response) => {
    var views = response.data;
    res.send(views);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.totalSalary = (req, res) => {
  axios.get("http://localhost:4000/staff/totalSalary").then((response) => {
    var views = response.data;
    res.send(views);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.readOneStaff = (req, res) => {
  axios.get("http://localhost:4000/staff/read/" + req.params.id).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.updateStaff = (req, res) => {
  axios.put("http://localhost:4000/staff/update/" + req.params.id, req.body).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.createStaff = (req, res) => {
  axios.post("http://localhost:4000/staff/create", req.body).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.deleteStaff = (req, res) => {
  axios.delete("http://localhost:4000/staff/delete/"+ req.params.id).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}


//payment

module.exports.readPayment = (req, res) => {
  axios.get("http://localhost:5000/payment/read").then((response) => {
    var views = response.data;
    res.send(views);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.readOnePayment = (req, res) => {
  axios.get("http://localhost:5000/payment/read/" + req.params.id).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.updatePayment = (req, res) => {
  axios.put("http://localhost:5000/payment/update/" + req.params.id, req.body).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.createPayment = (req, res) => {
  axios.post("http://localhost:5000/payment/create", req.body).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.deletePayment = (req, res) => {
  axios.delete("http://localhost:5000/payment/delete/"+ req.params.id).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}


//guest


module.exports.readGuest = (req, res) => {
  axios.get("http://localhost:1000/guest/read").then((response) => {
    var views = response.data;
    res.send(views);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.readOneGuest = (req, res) => {
  axios.get("http://localhost:1000/guest/read/" + req.params.id).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.updateGuest = (req, res) => {
  axios.put("http://localhost:1000/guest/update/" + req.params.id, req.body).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.createGuest = (req, res) => {
  axios.post("http://localhost:1000/guest/create", req.body).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}
module.exports.deleteGuest = (req, res) => {
  axios.delete("http://localhost:1000/guest/delete/"+ req.params.id).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    if (err)
      throw err;
  })
}