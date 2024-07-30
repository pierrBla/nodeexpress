const express = require('express');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Load environment variables
const { PORT = 3000 } = process.env;

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.disable('x-powered-by');

// Load routes
const users = require(path.join(__dirname, 'routes', 'usersRoutes'));
users(app);

// Root route
app.get('/', (req, res) => {
    res.send('Ruta raíz del backend');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Aplicación de NodeJS iniciada en el puerto ${PORT}`);
});

module.exports = {
    app,
    server
};
