import express from 'express';
import {dbConnection} from './database.js';
import UserRoutes from './routes/UserRoutes.js';
import StaticRoutes from './routes/StaticRoutes.js'

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

// set view engin to nodejs to get extension
app.set('view engine', 'ejs')

// rendering ejs files 
app.use('/', StaticRoutes)

// user Routes middleWares 
app.use('/user', UserRoutes)

app.listen(PORT , ()=>{
    console.log(`server is working on ${url}${PORT}`)
})