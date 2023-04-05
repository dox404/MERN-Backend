const express = require('express');
require('./db/config')
const User = require('./db/User')

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
App.get('/signup', (req, res) => {
    res.send("Hello from signup")


})
App.get('/about', (req, res) => {
    res.send("Hello from about")




})

//post routes

App.post('/signup', async (req, res) => {
    try{
        let user = new User(req.body)
        let result = await user.save()
        // res.send("api is running")
        res.send(result)
        // console.log(req.body)
    }catch(e){
        console.log(e)
    }
    // res.send(req.body)
    // res.send("api is running")
})




App.listen(PORT, (req, res) => {
    console.log(`sever is started on port ${PORT}`)
})


