
const mongoose = require('mongoose');

// Embedded Schema Alamat
const alamatSchema = new mongoose.Schema({
    jalan: {
        type: String,
        required: [true, 'Jalan wajib diisi'],
        trim: true
    },

    rt: {
        type: String,
        required: [true, 'RT wajib diisi'],
        trim: true
    }
}, {
    _id: false
});

// Schema Pesanan Galon
const pesananGalonSchema = new mongoose.Schema({
    noPesanan: {
        type: String,
        required: [true, 'Nomor pesanan wajib diisi'],
        unique: true,
        trim: true
    },

    namaPelanggan: {
        type: String,
        required: [true, 'Nama pelanggan wajib diisi'],
        trim: true
    },

    jumlahGalon: {
        type: Number,
        required: [true, 'Jumlah galon wajib diisi'],
        min: [1, 'Jumlah galon minimal 1']
    },

    status: {
        type: String,
        required: [true, 'Status wajib diisi'],
        trim: true,
        enum: ['baru', 'diantar', 'selesai']
    },

    // Embedded Document
    alamat: {
        type: alamatSchema,
        required: [true, 'Alamat wajib diisi']
    },

    // Referencing ke Model Depot
    depotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Depot',
        required: [true, 'Depot wajib dipilih']
    },

    // Waktu data dibuat otomatis
    createdAt: {
        type: Date,
        default: Date.now
    }

});

// Membuat Model PesananGalon
const PesananGalon = mongoose.model(
    'PesananGalon',
    pesananGalonSchema
);

module.exports = PesananGalon;