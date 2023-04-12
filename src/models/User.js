
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
   
})
userSchema.methods.generateAuthToken=async function(){
    try {
        // console.log(this._id)
        let token=jwt.sign({_id:this._id},"MYNAMEISMUKTARULHOQUE",{
            expiresIn:15
        })
        // console.log(token)

        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token

    } catch (error) {
        console.log("error")
        console.log(error)
    }
}
module.exports=new mongoose.model("users",userSchema)