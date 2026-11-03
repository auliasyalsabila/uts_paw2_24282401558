
const mongoose = require('mongoose');

const depotSchema = new mongoose.Schema({
    kode: {
        type: String,
        required: [true, 'Kode depot wajib diisi'],
        unique: true,
        trim: true
    },

    nama: {
        type: String,
        required: [true, 'Nama depot wajib diisi'],
        trim: true
    }
});

// Membuat Model Depot
const Depot = mongoose.model('Depot', depotSchema);

module.exports = Depot;
