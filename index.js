const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose')

const mongo_URL = 'mongodb+srv://hasnat:asdfjkl;@cluster0.cbsq8df.mongodb.net/Todo?retryWrites=true&w=majority'

mongoose.connect(mongo_URL)

const app = express()

const TodoModels = require('./models/Todos')

app.use(cors())
app.use(express.json())

app.post('/createTodo', async (req, res) => {
    let todo = req.body
    const newTodo = TodoModels(todo)
    await newTodo.save()
    res.json(todo)
})

app.get('/readTodo', async (req, res) => {

    const todos = await TodoModels.find()

    res.send(todos)

})

app.post('/updateTodo', async (req, res) => {
    let upTodo = req.body

    let data = { ...upTodo }

    delete data._id

    await TodoModels.findByIdAndUpdate(upTodo._id, data)

    res.send("Todo Update")
})

app.post('/deleteTodo', async (req, res) => {
    let todo = req.body

    await TodoModels.findByIdAndUpdate(todo._id, { status: "unActive" })

    res.send("Todo Deleted")
})

const PROT = 8000

app.listen(PROT, () => {
    console.log("Sever runing on Port :", PROT)
})