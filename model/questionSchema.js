const {Schema,model}=require('mongoose')

const commentscehmamethod = new Schema({
    text:{
        type:String,
        required:true
    },
    usn:{
        type:String,
    }

})

const questionschemamethod =new Schema({
    question:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true
    },
    usn:{
        type:String
    },
    comment:{
        type: [commentscehmamethod]
    }

})

module.exports = model("profile",profileschema)