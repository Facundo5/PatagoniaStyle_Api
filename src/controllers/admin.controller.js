const { getConnection } = require('./../database/database')


const getSize = async (req = request, res = response) => {
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM size');
        if (!result) {
            res.status(404).json({
                ok: false,
                msg: 'No se pudo traer los talles'
            })
        } else {
            res.json(result);
        }
    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Error al conectar con el servidor'
        })
    }
}
const getBrands = async (req = request, res = response) => {
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM brands');
        if (!result) {
            res.status(404).json({
                ok: false,
                msg: 'No se pudo traer los talles'
            })
        } else {
            res.json(result);
        }
    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Error al conectar con el servidor'
        })
    }
}
const getColours = async (req = request, res = response)=> {
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM colour');
        if(!result) {
            res.statis(404).json({
                ok:false, 
                msg:'No se puede traer los colores'
            })
        } else {
            res.json(result);
        }
    } catch {
        res.status(500).json({
            ok:false,
            msg:'Error en el servidor'
        })
    }
}

module.exports = {
    getSize,
    getBrands,
    getColours
}