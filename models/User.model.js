const {mongoose} = require('mongoose')


const userschema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const userModel = new mongoose.model('user', userschema)

module.exports = userModel