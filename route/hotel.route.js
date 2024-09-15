const express = require("express")
const { createHotel, getOneHotel, getAllHotels, deleteOneHotel, updateHotel, deleteAllHotels, uploadImg } = require("../controller/Hotel")
const { register, login } = require("../controller/User")
const app = express()
// const cors = require("cors")

// app.use(cors())

const router = express.Router()

router.route('/api/v1/create-hotel').post(createHotel)
router.route('/api/v1/get-one-hotel/:hotelName').get(getOneHotel)
router.route('/api/v1/get-All-Hotel').get(getAllHotels)
router.route('/api/v1/delete-one-hotel/:hotelName').delete(deleteOneHotel)
router.route('/api/v1/delete-All-hotel').delete(deleteAllHotels)
router.route('/api/v1/update-hotel/:hotelName').put(updateHotel)
router.route('/register').post(register)
router.route('/login').post(login)

// router.route('/uploadimg').post(uploadImg)




module.exports = {router}