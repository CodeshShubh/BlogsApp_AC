import express from 'express';
import Blog from '../models/Blog.js';


const router = express.Router();


router.get('/', async (req, res) => {
    try {
      const blogs = await Blog.find().populate('user', 'name');
      res.render('Home', { Message: null, blogs });
    } catch (err) {
      console.error(err);
      res.render('Home', { Message: 'Error fetching blogs', blogs: [] });
    }
  });
  
  router.get('/login', (req, res) => {
    res.render('Login', { Message: null });
  });
  
  router.get('/signup', (req, res) => {
    res.render('Signup', { Message: null });
  });
  
 

export default router;