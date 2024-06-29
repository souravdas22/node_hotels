const express = require('express');
const app = express();
const db = require('./db')
const bodyParser = require('body-parser');
app.use(bodyParser.json())
require('dotenv').config();
const PORT = process.env.PORT || 7000;


app.get('/', (req, res) => {
    res.send('Welcome to our hotel')
})

app.listen(PORT, () => console.log('app is listening at 7000'))

//import router files

const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

// use the routers

app.use('/person', personRoutes)
app.use('/menu', menuRoutes)


