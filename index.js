const express = require('express');
const app = express();
const mainRoutes = require('./routes/mainRoutes')
const connectDB = require('./config/db')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.json());
connectDB();

app.use('/api', mainRoutes)  

app.listen(3000,()=>{
    console.log('server running')
});