const { getConnection } = require("../database/database")
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../../PatagoniaStyleI-Commerce-master/src/uploads/shoes')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const addProduct = async (req = request, res = response) => {
    image = ''
    const { title, price, model, id_brand, gender, id_size, discount, description } = req.body

    const dataProduct = {
        id_brand, id_size, title, description, model, image, price, gender, discount
    }
    try {
        const connection = await getConnection()
        const sql = ('INSERT INTO shoes SET ?')
        const result = await connection.query(sql, dataProduct);
        if (!result) {
            res.status(404).json({
                ok: false,
                msg: 'Ocurrio un error al crear el producto'
            })
        } else {
            res.status(200).json({
                ok: true,
                msg: 'Producto creado con exito'
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Un error ha ocurrido al intentar conectar con el servidor'
        })
    }
}

const getProductsCard = async (req = request, res = response) => {
    try {
        const connection = await getConnection()
        const result = await connection.query('SELECT id_shoes, title,price,id_brand FROM shoes')
        console.log(result)
        if (!result) {
            res.status(404).json({
                ok: false,
                msg: 'Error al cargar las zapatillas'
            });
        }
        res.json(result)
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "No se pudo conectar al servidor getCards"
        });
    }
}

const getProduct = async (req = request, res = response) => {
    const { id_shoes } = req.params
    try {
        const connection = await getConnection()
        const result = await connection.query('SELECT * FROM shoes WHERE id_shoes = ?', id_shoes)
        if (!result) {
            res.status(404).json({
                ok: false,
                msg: "Ocurrio un error al intentar obtener estas zapatillas"
            })
        }
        res.json(result)
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "No se pudo conectar al servidor GetProduct"
        });
    }
}

const getProducts = async (req = request, res = response) => {
    try {
        const connection = await getConnection()
        const result = await connection.query('SELECT * FROM shoes')
        if (!result) {
            res.status(404).json({
                ok: false,
                msg: "Ocurrio un error al intentar obtener estas zapatillas"
            })
        }
        res.json(result)
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "No se pudo conectar al servidor GetProducts"
        });
    }
}


const updateProduct = async (req = request, res = response) => {
    const { id_shoes } = req.params
    const { title, price, image, model, id_brand, gender, id_size, discount, description, } = req.body
    try {
        const connection = await getConnection()
        const result = await connection.query('UPDATE shoes SET title = ?, price = ?, image = ?, model = ?, id_brand = ?, gender = ?, id_size = ?, discount = ?, description = ? WHERE id_shoes = ?'[title, price, image, model, id_brand, gender, id_size, discount, description, id_shoes])
        if (!result) {
            res.status(404).json({
                ok: false,
                msg: "Ocurrio al actualizar el producto"
            })
        } else {
            res.status(200).json({
                ok: true,
                msg: 'todo salio bien, producto actualizado'
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "No se pudo conectar al servidor updateProduct"
        })
    }
}
const deleteProduct = async (req = request, res = response) => {
    const { id_shoes } = req.params
    try {
        const connection = await getConnection()
        const result = await connection.query('DELETE shoes WHERE id_shoes = ?', id_shoes)
        if (!result) {
            res.status(404).json({
                ok: false,
                msg: 'Ocurrio un error al eliminar el producto'
            })
        }
        else {
            res.status(200).json({
                ok: true,
                msg: 'Producto eliminado con exito!'
            })
        }
    } catch {
        return res.status(500).json({
            ok: false,
            msg: 'No se pudo conectar al servidor deleteProduct'
        })
    }
}
module.exports = {
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductsCard,
    getProducts
}