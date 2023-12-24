const express = require('express')
const adminRouter = express.Router()
const collection = require('./mongodb')
const controller = require('./controller/adminController')


adminRouter.get('/admin', controller.adminLoginPage);
adminRouter.post('/logi', controller.adminLoginPost);
adminRouter.get('/home',controller.homePage);
adminRouter.get('/add',controller.addUserPage)
adminRouter.post('/add',controller.addUserPost)
adminRouter.get('/admin_logout', controller.adminLogout);
adminRouter.get('/edit/:id', controller.editUserPage);
adminRouter.post('/update/:id', controller.updatePost);
adminRouter.delete('/delete/:id', controller.deleteUser);
adminRouter.post('/search', controller.Search);

module.exports = adminRouter