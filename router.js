var express = require('express')
var router = express.Router()

const credential = {
    email:'shibilysuneer@gmail.com',
    password:'shibilysuneer2013'
}

// login user
router.post('/login',(req,res) =>{
    if(req.body.email==credential.email&&req.body.password==credential.password){
        req.session.user=req.body.email;
        res.redirect('/dashboard')
        // res.end("Login Successfull...!")
    }else{
        res.end("invalid username")
    }
})
router.get('/dashboard',(req,res)=>{
       if(!req.session.user){
        res.redirect('/')
       }else{
        res.render("dashboard",{user:credential.name})
       }
})

// route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
           console.log(err) 
           res.send("Error")
           return res.redirect("/")
        }else{
            res.redirect("/")
        }
    })
})

module.exports = router;