import express from 'express';

const router = express.Router();


router.get('/login',(req,res)=>{
    res.render('Login', { Message: null })
})
.get('/signup',(req,res)=>{
    res.render('Signup', { Message: null })
})
.get('/home',(req,res)=>{
    res.render('Home', {Message: null})
})

 

export default router;