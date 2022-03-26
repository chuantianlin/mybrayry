const express=require('express')
const req = require('express/lib/request')
const router =express.Router()
const Author= require('../models/author')

//All author's Route
router.get('/',async(req,res)=>{
        let searchOptions={}
        if(req.query.name!==''&& req.query.name!=null){
          searchOptions.name= new RegExp(req.query.name,'i')
        }
    try{
        const authors=await Author.find(searchOptions)
        res.render('author/',{
            author:authors,
            searchOptions:req.query
        })
    }catch{

        res.redirect('/')

    }
    
})
router.get('/new',(req,res)=>{
    res.render('author/new',{author:new Author()})
})
//create Author Route
router.post('/',async(req,res)=>{   
    const author=new Author({
        name:req.body.name
    }) 
    try{
            const newAuthor=await author.save()
            //res.redirect(`author/${newAuthor.id}`)
            res.redirect(`author`)

    }
    catch{
        res.render('author/new',{
            author: author,
            errorMessage:'Error creating Author'
            })
            
        }
    })

router.get('/:id',(req,res)=>{
    res.send('Show author'+req.params.id)
})

router.get('/:id/edit',async (req,res)=>{
    const author=await Author.findById(req.params.id)
    try
    {
        res.render('author/edit',{author:author})
    }catch{
        res.redirect('/authors')
    }

    
})

router.put('/:id', (req,res)=>{
    
    res.send('Show author'+req.params.id)
})

router.delete('/:id',(req,res)=>{
    res.send('Delte Author'+req.params.id)
})

module.exports=router