require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const depotRoutes = require('./routes/depotRoutes');
const pelangganRoutes = require('./routes/pelangganRoutes');

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST']
}));

// Middleware logger
app.use(logger);


app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'RESTful API Depot Air Minum berhasil berjalan',
        mahasiswa: 'Aulia Syalsabila Ramadhani',
        nim: '2428240155'
    });
});



// Endpoint Depot
app.use('/depot', depotRoutes);

// Endpoint Pelanggan
app.use('/pelanggan', pelangganRoutes);


app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: 'Endpoint tidak ditemukan'
    });
});


app.use(errorHandler);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB berhasil terhubung');

        app.listen(PORT, () => {
            console.log(`Server berjalan di http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Koneksi MongoDB gagal:', error.message);
        process.exit(1);
    });

module.exports = app;
