
const PesananGalon = require('../models/pelangganModels');
const Depot = require('../models/depotModel');

exports.getAllPesanan = async (req, res, next) => {
    try {
        const { status, fields } = req.query;

        const filter = {};

        if (status) {
            filter.status = status.trim();
        }

        const allowedFields = [
            'noPesanan',
            'namaPelanggan',
            'jumlahGalon',
            'status',
            'alamat',
            'depotId',
            'createdAt'
        ];


        let projection = {};

        if (fields) {
            const selectedFields = fields
                .split(',')
                .map(field => field.trim());

 
            const invalidFields = selectedFields.filter(
                field => !allowedFields.includes(field)
            );

            if (invalidFields.length > 0) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Field projection tidak valid',
                    fieldTidakValid: invalidFields
                });
            }

            selectedFields.forEach(field => {
                projection[field] = 1;
            });

            projection._id = 1;
        }

        const data = await PesananGalon.find(
            filter,
            projection
        ).populate('depotId', 'kode nama')
         .sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            message: 'Data pesanan berhasil ditampilkan',
            jumlah: data.length,
            data: data
        });

    } catch (error) {
        next(error);
    }
};


exports.getPesananById = async (req, res, next) => {
    try {
        const data = await PesananGalon.findById(req.params.id)
            .populate('depotId', 'kode nama');

        if (!data) {
            return res.status(404).json({
                status: 'error',
                message: 'Pesanan tidak ditemukan'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Data pesanan ditemukan',
            data: data
        });

    } catch (error) {
        next(error);
    }
};


exports.createPesanan = async (req, res, next) => {
    try {
        const {
            noPesanan,
            namaPelanggan,
            jumlahGalon,
            status,
            alamat,
            depotId
        } = req.body;

        // Memeriksa apakah depot tersedia
        const depot = await Depot.findById(depotId);

        if (!depot) {
            return res.status(400).json({
                status: 'error',
                message: 'Depot tidak ditemukan'
            });
        }

        // Membuat pesanan baru
        const data = await PesananGalon.create({
            noPesanan,
            namaPelanggan,
            jumlahGalon,
            status,
            alamat,
            depotId
        });

        // Menampilkan informasi depot
        const hasil = await data.populate(
            'depotId',
            'kode nama'
        );

        res.status(201).json({
            status: 'success',
            message: 'Pesanan galon berhasil ditambahkan',
            data: hasil
        });

    } catch (error) {
        next(error);
    }
};
