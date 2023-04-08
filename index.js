const express = require('express');
require('./db/config')
const User = require('./db/User')
const bcrypt = require('bcrypt')

const cors = require('cors')


const App = express();
const PORT = 5000



App.use(express.json())
App.use(cors())

// get routes
App.get('/', (req, res) => {
    res.send("Hello from server")


})
App.get('/login', (req, res) => {
    res.send("Hello from login")


})
App.get('/join', async (req, res) => {
    res.send("hello")
})
App.get('/signup', (req, res) => {
    res.send("Hello from signup")


})
App.get('/about', (req, res) => {
    res.send("Hello from about")




})

//post routes

App.post('/signup', async (req, res) => {
    try {
        
        const data=req.body
        const HashPwd=await bcrypt.hash(data.password,10)
        debugger
        let newUser = new User({
            name:data.name,
            email:data.email,
            password:HashPwd
        })
        newUser.save()
        res.status(200).send("User Registered Successfull")
        
    } catch (e) {
        res.send(e)
    }
    
})


// App.post('/join', (req, res) => {
//     const user = req.body
//     const length = Object.keys(user).length
//     if (length == 3) {
//         console.log("signup post route runnig")
//         return res.send("this is signup route")
//     }
//     if (length == 2) {
//         console.log("login post route runnig")
//         res.send("this is login route")
//     }



// })



App.listen(PORT, (req, res) => {
    console.log(`sever is started on port ${PORT}`)
})


