import express from 'express';
import { UserLogin, UserSignup } from '../controllers/UserController.js';

const router = express.Router();


router.post('/register',UserSignup)
.post('/login', UserLogin )





export default router;