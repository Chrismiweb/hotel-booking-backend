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
    },
    role: {
        type: String,
        default: "user",
        enum : ["user", "agent", "admin"]
    }
})

const userModel = new mongoose.model('user', userschema)

module.exports = userModel