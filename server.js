if(process.env.NODE_ENV !== 'production'){ require('dotenv').config() }

const express=require('express')
const app=express()
const expressLayouts= require('express-ejs-layouts')

const indexRouter=require('./routes/index')
const authorRouter=require('./routes/author')
const bodyParser=require('body-parser')



const mongoose=require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db=mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.log('Connetion to Mongoose'))


// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layout/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/',indexRouter)
app.use('/author',authorRouter)
app.listen(process.env.PORT||3000)
