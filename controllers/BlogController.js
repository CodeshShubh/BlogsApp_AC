import Blog from '../models/Blog.js';

export const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.session.userId });
    res.render('Blogbtn', { Message: null, blogs });
  } catch (err) {
    console.error(err);
    res.render('Blogbtn', { Message: 'Error fetching your blogs', blogs: [] });
  }
};

export const showAddBlogForm = (req, res) => {
  res.render('Blog', { Message: null });
};

export const addBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const blog = new Blog({ title, content, author, user: req.session.userId });
    await blog.save();
    res.redirect('/blog/myblogs');
  } catch (err) {
    console.error(err);
    res.render('Blog', { Message: 'Error adding blog' });
  }
};

export const showEditBlogForm = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.redirect('/blog/myblogs');
    res.render('BlogEdit', { Message: null, blog });
  } catch (err) {
    console.error(err);
    res.redirect('/blog/myblogs');
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    await Blog.findByIdAndUpdate(req.params.id, { title, content, author });
    res.redirect('/blog/myblogs');
  } catch (err) {
    console.error(err);
    res.redirect('/blog/myblogs');
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/blog/myblogs');
  } catch (err) {
    console.error(err);
    res.redirect('/blog/myblogs');
  }
};
