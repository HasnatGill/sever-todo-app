const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

// Connect the Sever With Backend
const mongo_URL = "mongodb+srv://hasnat:asdfjkl;@cluster0.cbsq8df.mongodb.net/Todo?retryWrites=true&w=majority"
mongoose.connect(mongo_URL)

// Improt the Models form another folder
const TodoModels = require('./models/Todos')

app.use(cors())
app.use(express.json())

// Create the Post request for add the Todo...

app.post('/createTodo', async (req, res) => {
    let todo = req.body
    const newTodo = TodoModels(todo)
    await newTodo.save()
    res.json(todo)
})

// Create the Get request for read the Todo...

app.get('/readTodo', async (req, res) => {
    const todos = await TodoModels.find()
    res.send(todos)
})

// Create the Get request for Update the Todo...

app.post('/updateTodo', async (req, res) => {
    let upTodo = req.body
    let data = { ...upTodo }
    delete data._id
    await TodoModels.findByIdAndUpdate(upTodo._id, data)
    res.send("Todo Update")
})

// Create the Get request for Detele the Todo...

app.post('/deleteTodo', async (req, res) => {
    let todo = req.body
    await TodoModels.findByIdAndUpdate(todo._id, { status: "unActive" })
    res.send("Todo Deleted")
})

const PROT = 8000

app.listen(PROT, () => {
    console.log("Sever runing on Port :", PROT)
})