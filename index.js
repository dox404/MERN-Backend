const express= require('express');


const App=express();
const PORT=5000



App.get('/',(req,res)=>{
res.send("Hello from server")


})
App.listen(PORT,(req,res)=>{
    console.log(`sever is started on port ${PORT}`)
})


