const mongoose =require('mongoose')
const authorSchmea=new mongoose.Schema({
   name: {
            type:String,
            required:true
         }
})


module.exports=mongoose.model('Author',authorSchmea)
