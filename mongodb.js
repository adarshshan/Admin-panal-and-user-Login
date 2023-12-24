const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/work2')
.then(()=>{ 
    console.log('Mongodb is connected...')
})
.catch(()=>{
    console.log("Failed to connect with mongodb...") 
})

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model('collection2',LogInSchema)
module.exports=collection