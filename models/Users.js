const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
})

const UsersModels = mongoose.model('UsersData', UsersSchema)

module.exports = UsersModels