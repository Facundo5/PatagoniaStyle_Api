const { getConnection } = require("../database/database")
const cloudinary = require('../utils/cloudinary')
const addProduct = async (req = request, res = response) => {

    const { title, price, model, id_brand, gender, id_size, discount, description, statuse } = req.body
    try {
        const uploader = async (path) => await cloudinary.uploads(path, 'Images');
        console.log('paso el upload')
        if (req.method === 'POST') {
            console.log("emtro en el req de metodo")
            var urls = []
            const files = req.files;
            console.log(files)
            console.log("antes del for")
            for (const file of files) {
                console.log("dentro del for")
                const { path } = file;
                console.log('antes del uploader')
                const newPath = await uploader(path);
                urls.push(newPath)
            }
            var dataurl = []
            dataurl = urls[0].res + "#" + urls[1].res + "#" + urls[2].res + "#" + urls[3].res + "#" + urls[4].res
            console.log(dataurl)
            const newProduct = await {
                id_brand,
                id_size,
                title,
                description,
                model,
                price,
                gender,
                discount,
                statuse,
                dataurl
            };
            console.log(newProduct)
            console.log("saliendo del newprodyct")
            const connection = await getConnection();
            const sql = ('INSERT INTO shoes SET ?')
            const result = await connection.query(sql, [newProduct]);
            if (!result) {
                res.status(404).json({
                    ok: false,
                    msg: 'Ocurrio un error al crear el producto'
                })
            }
            else {
                res.status(200).json({
                    ok: true,
                    msg: 'Imagen subida con exito',
                    data: urls
                });
            }
        } else {
            res.status(405).json({
                err: `${req.method} metodo no`
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error.message,
            msg: 'error en addproduct'
        })
    }
}

const getProductsCard = async (req = request, res = response) => {
    try {
        const connection = await getConnection()
        const result = await connection.query('SELECT id_shoes, title,price,id_brand,dataurl, id_shoes FROM shoes')
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
    const {id_shoes} = req.params;
    console.log(id_shoes)
    try {
        const connection = await getConnection()
        const result = await connection.query('SELECT * FROM shoes WHERE id_shoes = ?', [id_shoes])
        const id_brand = result[0].id_brand
        const brand = await connection.query('SELECT name_brand FROM brands WHERE id_brand = ?', [id_brand])
        result[0].id_brand = brand
        var str = result[0].dataurl
        const url = str.split('#')
        result[0].dataurl = url
        if (!result) {
            res.status(404).json({
                ok: false,
                msg: "Ocurrio un error al intentar obtener estas zapatillas"
            })
        }
        res.json(result[0])
        console.log('envio el json')
        console.log(result[0])
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
        var str = result[0].dataurl
        const url = str.split('#',1)
        result[0].dataurl = url
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