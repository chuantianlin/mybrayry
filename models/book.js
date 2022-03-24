const mongoose =require('mongoose')
const bookSchmea=new mongoose.Schema({
   title: {
            type:String,
            required:true
         },
   description: {
            type:String,
         },
   publishDate:{
      type:Date,
      required:true
   },
   pageCount:{
      type:Number,
      required:true
   },
   createdAt:{
         type:Date,
         required:true,
         default:Date.now
   },
   coverImageName:{
      type:String,
      required:true
   },
   auhtor:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref : 'Author '
   }
})



module.exports=mongoose.model('Book',bookSchmea)