const express = require('express');
const userController = require('../controllers/user-controller.ts')
const router = express.Router()

router.post("/registration", userController.regisration)
router.post("/login", userController.login)
router.get("/refresh", userController.refresh)
router.post("/validToken", userController.validToken)
router.post("/basket",userController.basket)
router.get('/getBasket', userController.getBasket)
router.post("/search", userController.search)
router.get("/getProducts", userController.getProducts)
router.post("/logout", userController.logout)
// app.get("/", (req, res) => {
//     res.send("Hello World!");
//   });
module.exports = router
