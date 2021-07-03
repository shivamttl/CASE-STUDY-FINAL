const {Router} = require('express');
const authController = require('../controller/authController');

const app = Router();

app.get('/read', authController.read);
app.put('/update/:id', authController.update);
app.get('/read/:id', authController.readOne);
app.post('/create', authController.create);
app.delete('/delete/:id',authController.delete);
module.exports = app;
