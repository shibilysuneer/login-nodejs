const express =require('express');
const app = express();
const port = process.env.PORT||7000;
const path = require("path")
const session = require('express-session')
const nocache = require("nocache");
const bodyparser = require('body-parser')
const {v4:uuidv4} = require('uuid')
const router = require('./router')




app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine','ejs')

// load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))
app.use(nocache());



app.use(session({
      secret:'secret',
      resave:false,
      saveUninitialized:true
}))

app.use('/',router)

//home route
app.get('/',(req,res) => {
      // res.render('base',{titl:"Login"})
      if(!req.session.user){
            res.render('base',{title:'Login'})
      }else{
            res.render('dashboard')
      }
})
app.listen(port,()=>{console.log("Lostening to the server on http://localhost:7000")})
