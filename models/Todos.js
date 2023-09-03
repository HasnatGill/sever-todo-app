const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdBy: {
        type: Object,
        required: true,
        email: {
            type: String,
            required: true
        },
        uid: {
            type: String,
            required: true
        }
    }
})

const TodoModels = mongoose.model('todos', TodoSchema)

module.exports = TodoModels