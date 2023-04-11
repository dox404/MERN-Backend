const express = require('express');
require('./db/config')
const User = require('./models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')


const App = express();
const PORT = 5000



App.use(express.json())
App.use(cors())
App.use(express.urlencoded({ extended: false }))

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


App.post('/login',async(req,res)=>{
    const data=req.body
    try {

        //getting the password and email from the login portal from the user
        const email = data.email
        const password =data.password

        //GETTING THE FULL DETAILS OF THE USER USING THE EMAIL
        const user = await User.findOne({ email: email })
        if (bcrypt.compareSync(password, user.password)) {
            const token = await user.generateAuthToken()
            res.cookie("jwt", token, {

                httpOnly: true,

                expires: new Date(Date.now() + 3600000)
            })
            // console.log(user)
            res.send(user)
        } else{
            res.status(400).send('passwords are not matching')
        }
    } catch (error) {
        res.status(400).send("user is not registersed")
        console.log(error)
    }
})




App.listen(PORT, (req, res) => {
    console.log(`sever is started on port ${PORT}`)
})


