import express from 'express';
import {dbConnection} from './database.js';
import User from './models/UserModel.js';
import bcrypt from 'bcrypt'

const app = express();
const url = 'http://localhost:'
const PORT = 8000;
const URI = 'mongodb://localhost:27017/ShubhBlogs'



dbConnection(URI);

// set view engin to nodejs to get extension
app.set('view engine', 'ejs')



// rendering ejs files 
app.get('/login',(req,res)=>{
    res.render('Login')
})


app.get('/signup',(req,res)=>{
    res.render('Signup')
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.post('/register',async(req,res)=>{
   try {
     const {name, email, password}= req.body;

     if(!name || !email || !password)
        return res.status(400).json({Status:"Failure", Message:'Please Enter all fields'});


    const existUser = await User.findOne({email})

    if(existUser)
        return res.status(400).json({Status: 'Failure' , Message: 'User Already Exist Please Use Other Email'})

       // hasing using bcrypt
       const hashPassword = await bcrypt.hash(password, 10)

       const user = await User.create({name , email , password:hashPassword});
           res.status(201).json({Status: "Success", Message: 'User is Register Succesfully', user})
    
   } catch (error) {
    res.status(500).json({Status:'Failed', Message:'Server error' , error})

   }
})





app.listen(PORT , ()=>{
    console.log(`server is working on ${url}${PORT}`)
})