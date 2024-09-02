const express = require("express")
const { createHotel, getOneHotel, getAllHotels, deleteOneHotel, updateHotel, deleteAllHotels } = require("../controller/Hotel")
const { register } = require("../controller/User")
const app = express()

const router = express.Router()

router.route('/api/v1/create-hotel').post(createHotel)
router.route('/api/v1/get-one-hotel/:hotelName').get(getOneHotel)
router.route('/api/v1/get-All-Hotel').get(getAllHotels)
router.route('/api/v1/delete-one-hotel/:hotelName').delete(deleteOneHotel)
router.route('/api/v1/delete-All-hotel').delete(deleteAllHotels)
router.route('/api/v1/update-hotel/:hotelName').put(updateHotel)
router.route('/register').post(register)



module.exports = {router}