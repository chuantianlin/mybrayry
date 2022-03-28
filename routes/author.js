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
            res.redirect(`/author/${newAuthor.id}`)
           

    }
    catch{
        res.render('author/new',{
            author: author,
            errorMessage:'Error creating Author'
            })
            
        }
    })

    router.get('/:id',async (req,res)=>{

        try{
                const author= await Author.findById(req.params.id)
                const books= await books.find({author:author.id}).linit(6).exec()
                res.render('author/show',{author:author,booksByauthor:books})

        }
        catch{
                res.redirect('/')
        }
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

router.get('/:id', async (req,res)=>{
    
    const author=new Author({
        name:req.body.name
    }) 
    try{
          author=await Author.findById(req.params.id)
          await author.save()
          res.redirect(`/author/${newAuthor.id}`)
        

    }
    catch{
        res.render('author/new',{
            author: author,
            errorMessage:'Error creating Author'
            })
            
        }
    })

router.put('/:id',async (req,res)=>{
   let author
    try{ 
          author=await Author.findById(req.params.id)
          author.name=req.body.name
          author.save()
          res.redirect(`/author/${author.id}`)

    }
    catch{
        if(author==null){
            res.redirect('/')
        }
        else
            {
            res.render('author/edit',{
            author: author,
            errorMessage:'Error updating Author'
            })
         } 
        }
})

router.delete('/:id',async (req,res)=>{
    let author
    try{ 
       
          author=await Author.findById(req.params.id)
          author.remove()
          res.redirect('/author')

    }
    catch{
        if(author==null){
            res.redirect('/')
        }
        else
            {
                res.redirect(`/author/${authod.id}`)
            }
         
        }
})

module.exports=router