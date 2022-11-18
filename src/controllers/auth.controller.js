const { compare } = require('bcrypt');
const bcrypt = require('bcrypt')
const { getConnection } = require('./../database/database')
const { tokenSign } = require('../middlewares/generateToken')

const userLogin = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT id_user ,password, role, permissions FROM users WHERE email = ?', email);
        if (!result) {
            res.status(404).json({
                ok: false,
                msg: 'El usuario no existe o la contraseña es incorrecta'
            })
        }
        const hashPassword = result[0].password
        const check = await bcrypt.compare(password, hashPassword);
        if (!check) {
            res.satatus(401).json({
                ok: false,
                msg: 'El usuario no existe o la contraseña es incorrecta'
            })
        }
        const id_user = result[0].id_user
        const role = result[0].role
        const permissions = result[0].permissions
        const token = await tokenSign(id_user,role,permissions)
        res.status(200).json({
            ok: true,
            token: token
        })
    } catch (error) {
        res.status(503).json({
            ok: false,
            msg: error
        })
    }
}
module.exports = {
    userLogin
}