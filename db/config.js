const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/user-data").then(() => console.log('Connected to the Database!'))