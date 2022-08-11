const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path')
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const animalRoutes = require('./routes/animalRoutes');
const userRoutes = require('./routes/userRoutes');
const {notFound, errorHandler} = require('./middlewares/errorMiddleware');

// Object of the imported package (express)
const app = express();
app.use(express.json());

// Cors - allows requests and access resources from the server from any origin
app.use(cors());

// For the environment variables
dotenv.config();

// For the database connection
connectDB();

// Creating the web server - it listens on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
});

// Routes for the Admin
// Uses the route for adding admins and loggin in
app.use('/api/admins', adminRoutes);

// Routes for the animals' data
app.use('/api/animals', animalRoutes);

// Routes for the users of the mobile app
app.use('/api/users', userRoutes);


// ---------- deployment ----------

__dirname = path.resolve()
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/furryhopeadmin/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'furryhopeadmin', 'build', 'index.html'))
    })
} else {
    // API Calls - GET
    app.get('/', (req, res) => {
        res.send("API IS RUNNING");
    });
}

// ---------- deployment ----------


// For error handling within the server
app.use(notFound);
app.use(errorHandler);