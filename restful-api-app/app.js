require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const pesananGalonRoutes = require('./routes/pesananGalonRoutes');
const depotRoutes = require('./routes/depotRoutes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Middleware JSON
app.use(express.json());

// Middleware CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST']
}));

// Halaman utama
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'RESTful API Depot Air Minum Berhasil Berjalan',
        mahasiswa: 'Aulia Syalsabila Ramadhani',
        nim: '2428240155'
    });
});

// Routes Pesanan Galon
app.use('/pesanan-galon', pesananGalonRoutes);

// Routes Depot
app.use('/depot', depotRoutes);

// Error handling 404
app.use(notFound);

// Error handling terpusat
app.use(errorHandler);

// Koneksi MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB berhasil terhubung');

        app.listen(process.env.PORT, () => {
            console.log(
                `Server berjalan di http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((error) => {
        console.error('Koneksi MongoDB gagal:', error.message);
        process.exit(1);
    });
