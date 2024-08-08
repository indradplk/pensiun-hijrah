const ActivityAdmin = require('../model/ActivityAdmin')

exports.index = async (req, res) => {
    try {
        const getAllAdmin = await ActivityAdmin.findAll({
            attributes: ['id', 'nik', 'log', 'createdAt', 'updatedAt']
        });
        res.json(getAllAdmin);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}