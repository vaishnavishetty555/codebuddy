const {Schema,model}=require('mongoose')

const commentscehmamethod = new Schema({
    text:{
        type:String,
        required:true
    },
    usn:{
        type:String,
    }

},{
    timestamps:true
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

},{
    timestamps:true
})

module.exports = model("questions",questionschemamethod)