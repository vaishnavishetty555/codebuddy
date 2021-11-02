const {Schema,model}=require('mongoose')

const profileschema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    usn:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    }

})

module.exports = model("profile",profileschema)