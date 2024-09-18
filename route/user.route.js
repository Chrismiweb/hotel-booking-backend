const express = require('express')
const { register } = require('../controller/User.Auth')
const app = express()
const router = express.Router()

// router.route('/register').post(register)


module.exports = {router}

