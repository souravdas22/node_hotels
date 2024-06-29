const mongoose = require('mongoose')

//Define the MongoDb connection URL
const mongoUrl = "mongodb://localhost:27017/hotels";

//Setup MongoDB connection
mongoose.connect(mongoUrl)

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

//Define event listeners for database connection

db.on('connected', () => {
    console.log('Connected to MongoDB server')
})
db.on('error', (err) => {
    console.log('MongoDB connection error')
})
db.on('disconnected', () => {
    console.log('MongoDB Disconnected')
})

module.exports = db;