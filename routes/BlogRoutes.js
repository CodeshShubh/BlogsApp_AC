import express from 'express';
import { requireAuth } from '../utils/auth.js';
import { 
  getUserBlogs, 
  showAddBlogForm, 
  addBlog, 
  showEditBlogForm, 
  updateBlog, 
  deleteBlog 
} from '../controllers/BlogController.js';

const router = express.Router();

// Show the logged-in user's blogs along with the "+Add Blog" button
router.get('/myblogs', requireAuth, getUserBlogs);

// Show form to add a new blog
router.get('/addblog', requireAuth, showAddBlogForm);

// Handle adding a new blog
router.post('/addblog', requireAuth, addBlog);

// Show form to edit an existing blog
router.get('/editblog/:id', requireAuth, showEditBlogForm);

// Handle updating the blog
router.post('/editblog/:id', requireAuth, updateBlog);

// Handle deleting the blog
router.post('/deleteblog/:id', requireAuth, deleteBlog);

export default router;
