const express = require("express")
const { createHotel, getOneHotel, getAllHotels, deleteOneHotel, updateHotel } = require("../controller/Hotel")
const { deleteModel } = require("mongoose")
const app = express()

const router = express.Router()

router.route('/api/v1/create-hotel').post(createHotel)
router.route('/api/v1/get-one-hotel/:hotelName').get(getOneHotel)
router.route('/api/v1/get-All-Hotel').get(getAllHotels)
router.route('/api/v1/delete-one-hotel/:hotelName').delete(deleteOneHotel)
router.route('/api/v1/update-hotel/:hotelName').put(updateHotel)


module.exports = {router}