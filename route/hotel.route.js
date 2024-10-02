const express = require("express")
const { createHotel, getOneHotel, getAllHotels, deleteOneHotel, updateHotel, deleteAllHotels, uploadImg } = require("../controller/Hotel")
const { register, login } = require("../controller/User.Auth")
const { allRegisteredUsers, deleteSingleUser, deleteAllUsers, SingleRegisteredUser } = require("../controller/Admin.controller")
const { isLoggedIn, isAdmin } = require("../middleware/authentication")
const app = express()
// const cors = require("cors")

// app.use(cors())

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/api/v1/create-hotel').post(isLoggedIn, createHotel)
router.route('/api/v1/get-one-hotel/:hotelName').get(isLoggedIn, getOneHotel)
router.route('/api/v1/get-All-Hotel').get(isLoggedIn, getAllHotels)
router.route('/api/v1/delete-one-hotel/:hotelName').delete(isLoggedIn, deleteOneHotel)
router.route('/api/v1/delete-All-hotel').delete(isLoggedIn, deleteAllHotels)
router.route('/api/v1/update-hotel/:hotelName').put(isLoggedIn, updateHotel)
router.route('/admin/AllregisteredUser').get( allRegisteredUsers)
router.route('/admin/SingleregisteredUser/:email').get(isLoggedIn, SingleRegisteredUser)
router.route('/admin/deleteSingleUser/:email').delete(isLoggedIn, deleteSingleUser)
router.route('/admin/deleteAllUser').delete(isLoggedIn, deleteAllUsers)
// router.route('/admin/deleteAllUser').delete(deleteAllUsers)





// router.route('/uploadimg').post(uploadImg)




module.exports = {router}