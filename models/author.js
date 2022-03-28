const mongoose =require('mongoose')
const Book=require('./book')
const authorSchmea=new mongoose.Schema({
   name: {
            type:String,
            required:true
         }
})

authorSchmea.pre('remove',function(next){
   Book.find({authod:this.id},(err,books)=>{
      if (err){
         next(err)
      }else if(books.lenght>0){
            next(new Error('This author has books still existing'))
      }
      else{
         next()
      }
   })

})
module.exports=mongoose.model('Author',authorSchmea)
