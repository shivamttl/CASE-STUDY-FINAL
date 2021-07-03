const { Router } = require('express');
const authController = require('../controllers/authController');
const { requireAuth1, requireAuth2, requireAuth3 } = require('../middleware/authMiddleware');
const app = Router();
app.post('/login', authController.login_post);
app.get('/logout', authController.logout_get);
//owner
app.get('/showusers', requireAuth3, authController.showusers);
app.get('/showuser/:id', requireAuth3, authController.showuser);
app.post('/createuser', requireAuth3, authController.createuser);
app.delete('/delete/:id', requireAuth3, authController.deleteuser);
app.put('/update/:name', requireAuth3, authController.update);
//staff
app.get('/staff/read', requireAuth3, authController.readStaff);
app.get('/staff/totalSalary', requireAuth3, authController.totalSalary);
app.put('/staff/update/:id', requireAuth3, authController.updateStaff);
app.get('/staff/read/:id', requireAuth3, authController.readOneStaff);
app.post('/staff/create', requireAuth3, authController.createStaff);
app.delete('/staff/delete/:id', requireAuth3, authController.deleteStaff);
//ROOM
app.get('/room/read', requireAuth2, authController.readRoom);
app.get('/room/roomReport', requireAuth2, authController.roomReport);
app.put('/room/update/:id', requireAuth2, authController.updateRoom);
app.get('/room/read/:id', requireAuth2, authController.readOneRoom);
app.post('/room/create', requireAuth2, authController.createRoom);
app.delete('/room/delete/:id', requireAuth2, authController.deleteRoom);
//INVENTORY
app.get('/inventory/read', requireAuth2, authController.readInventory);
app.put('/inventory/update/:id', requireAuth2, authController.updateInventory);
app.get('/inventory/read/:id', requireAuth2, authController.readOneInventory);
app.post('/inventory/create', requireAuth2, authController.createInventory);
app.delete('/inventory/delete/:id', requireAuth2, authController.deleteInventory);
//reception
app.get('/room/availableRoom', requireAuth1, authController.availableRoom);
app.get('/room/occupiedRoom', requireAuth1, authController.occupiedRoom);
app.put('/room/checkIn/:number', requireAuth1, authController.checkIn);
app.put('/room/checkOut/:number', requireAuth1, authController.checkOut);
app.get('/payment/read', requireAuth1, authController.readPayment);
app.put('/payment/update/:id', requireAuth1, authController.updatePayment);
app.get('/payment/read/:id', requireAuth1, authController.readOnePayment);
app.post('/payment/create', requireAuth1, authController.createPayment);
app.delete('/payment/delete/:id', requireAuth1, authController.deletePayment);
//guest
app.get('/guest/read',requireAuth1, authController.readGuest);
app.put('/guest/update/:id',requireAuth1, authController.updateGuest);
app.get('/guest/read/:id',requireAuth1, authController.readOneGuest);
app.post('/guest/create',requireAuth1, authController.createGuest);
app.delete('/guest/delete/:id',requireAuth1,authController.deleteGuest);


module.exports = app;
