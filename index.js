const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const app = express()

// Connect the Sever With Backend
const mongo_URL = "mongodb+srv://hasnat:asdfjkl;@cluster0.cbsq8df.mongodb.net/Todo?retryWrites=true&w=majority"
mongoose.connect(mongo_URL)

// Improt the Models form another folder
const TodoModels = require('./models/Todos')
const UsersModels = require('./models/Users')

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

// Create the Post request for register user...

app.post('/register', async (req, res) => {
    try {
        let { email, userName, password, uid } = req.body;

        const existEmail = await UsersModels.findOne({ email: email });
        const newPassword = await bcrypt.hash(password, 10)

        const user = { email, userName, password: newPassword, uid };

        if (existEmail) {
            res.status(500).json('This email is already exists');
        } else {
            const newUser = await UsersModels(user);
            const token = jwt.sign(
                {
                    name: user.userName,
                    email: user.email,
                },
                'secret123'
            )

            res.json({ token, uid });
            await newUser.save();
        }
    } catch (error) {
        res.status(404).json('Invalid Credentials');
        console.log(error);
    }
})

app.post('/login', async (req, res) => {
    try {
        const user = await UsersModels.findOne({ email: req.body.email, });
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

        const token = jwt.sign({ email: user.email, }, 'secret123')

        if (isPasswordValid === true && user) {
            res.json({ token, uid: user.uid });
        } else {
            res.status(404).json({ message: 'Please enter your correct email & password' });
        }
    } catch (error) {
        res.status(404).json({ message: 'Please enter your correct email & password' });
    }
})

const PROT = 8000

app.listen(PROT, () => {
    console.log("Sever runing on Port :", PROT)
})