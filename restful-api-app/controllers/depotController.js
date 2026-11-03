
const Depot = require('../models/depotModel');


exports.getAllDepot = async (req, res, next) => {
    try {
        const data = await Depot.find();

        res.status(200).json({
            status: 'success',
            message: 'Data depot berhasil ditampilkan',
            jumlah: data.length,
            data: data
        });

    } catch (error) {
        next(error);
    }
};


exports.createDepot = async (req, res, next) => {
    try {
        const { kode, nama } = req.body;

        const data = await Depot.create({
            kode,
            nama
        });

        res.status(201).json({
            status: 'success',
            message: 'Depot berhasil ditambahkan',
            data: data
        });

    } catch (error) {
        next(error);
    }
};
