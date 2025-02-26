import express from 'express';
import { UserLogin, UserSignup } from '../controllers/UserController.js';
import session from 'express-session';

const router = express.Router();


router.post('/register',UserSignup)
.post('/login', UserLogin )



router.post('/logout', (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.error(err);
            return res.redirect('/')
        }
        res.clearCookie('connect.sid')
        res.redirect('/')
    })
})



export default router;