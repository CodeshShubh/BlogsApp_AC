import express from 'express';
import {dbConnection} from './database.js';
import session from 'express-session';
import UserRoutes from './routes/UserRoutes.js';
import StaticRoutes from './routes/StaticRoutes.js'
import BlogRoutes from './routes/BlogRoutes.js';


// express app intilization
const app = express();

// tempery urls
const url = 'http://localhost:'
const PORT = 8000;
const URI = 'mongodb://localhost:27017/ShubhBlogs'

// database connection
dbConnection(URI);

// middleware to parse data
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// initilized session
app.use(session({
    secret:'dummy key',
    resave:true,
    saveUninitialized:true,
    cookie: {
        secure: false, // for development; remove secure flag in production with HTTPS
        // No maxAge is set so the cookie is a session cookie that expires on browser close
      }
    
}))


// make the auth status available in all views
app.use((req,res,next)=>{
    res.locals.isAuthenticated = !!req.session.userId;
    next()
})

// set view engin to nodejs to get extension
app.set('view engine', 'ejs')

// rendering ejs files 
app.use('/', StaticRoutes)

// user Routes middleWares 
app.use('/user', UserRoutes)

// blogsRoutes
app.use('/blog', BlogRoutes);

app.listen(PORT , ()=>{
    console.log(`server is working on ${url}${PORT}`)
}) 