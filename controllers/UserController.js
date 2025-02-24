import User from '../models/UserModel.js';
import bcrypt from 'bcrypt'



export const UserSignup =  async(req,res)=>{
    try {
      const {name, email, password}= req.body;
 
      if(!name || !email || !password)
         return res.render('signup',{Message: 'Please Enter all fields'} )
     // res.status(400).json({Status:"Failure", Message:'Please Enter all fields'});
 
 
     const existUser = await User.findOne({email})
 
     if(existUser)
         return res.render('signup', {Message: 'User Already Exist Please Use Other Email '})
     //  res.status(400).json({Status: 'Failure' , Message: 'User Already Exist Please Use Other Email'})
 
        // hasing using bcrypt
        const hashPassword = await bcrypt.hash(password, 10)
 
        const user = await User.create({name , email , password:hashPassword});
     //    res.redirect('/login')
     return res.render('login', {Message: 'User is Register Successfully Please Login'})
         //    res.status(201).json({Status: "Success", Message: 'User is Register Succesfully', user})
     
    } catch (error) {
     res.render('signup', {Message: "Server Error. Please Try agin"} )
     // res.status(500).json({Status:'Failed', Message:'Server error' , error})
 
    }
 }


 export const  UserLogin = async(req,res)=>{
    try {
       const {email , password} = req.body;

    if( !email || !password)
       return res.render('login',{Message: 'Please Enter all fields'} );
   // return res.status(400).json({Status:"Failure", Message:'Please Enter all fields'});

     const user = await User.findOne({email});

     if(!user)
       return res.render('login', {Message: 'User not Exist Please Signup First'})
   //   return res.status(404).json({Status: 'Failure' , Message: 'User not Exist Please Signup First'})

     const comparePassword = await bcrypt.compare(password, user.password)

     if(!comparePassword)
       return res.render('login', {Message: 'Password is incorrect'})
       // return res.status(400).json({Status: 'Failure' , Message: 'Password is incorrect'})

       return res.render('home', {Message: 'User Login SuccesFully'})
   //    return res.status(200).json({Status: 'Success', Message: 'Login Success', user})
       
    } catch (error) {
       // return res.status(500).json({Status: 'Failure', Message: 'Sever Error. Try agian Later', error})
   res.render('login', {Message: "Server Error. Please Try agin"} )
       
    }        
}