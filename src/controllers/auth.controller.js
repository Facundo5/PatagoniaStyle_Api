const { compare } = require('bcrypt');
const { getConnection } = require('./../database/database')
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


const userLogin = async (req = request, res = response) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
        console.log('entro en el try')
        const connection = await getConnection();
        const result = await connection.query('SELECT email, password name FROM users WHERE email = ?', email);
        console.log(result)
        console.log('paso la conexion')

        if (!result) {
            res.status(404).json({
                ok: false,
                msg: 'El usuario no existe o la contraseña es incorrecta'
            })
        }
        const hashPassword = result.password
        console.log(password)
        console.log(hashPassword)
        const check = await bcrypt.compare(password, hashPassword);
        console.log(check)
        if (!check) {
            res.satatus(401).json({
                ok: false,
                msg: 'El usuario no existe o la contraseña es incorrectAA'
            })
        }
        else {
            console.log('entro en el else')
            const name = result.name
            const token = jwt.sign({ name: name }, process.env.JWT_TOKEN, {
                expiresIn: process.env.JWT_TIME_EXPIRE
            })
            console.log('TOKEN:' + token + '' + 'Para el usuario:', name)

            const cookiesOptions = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie('jwt', token, cookiesOptions)
        }
    } catch (error) {
        res.status(503).json({
            ok:false,
            msg: error
        })
    }
}

const isAuthenticated = async (req, res, next) => {
    
}


module.exports = {
    userLogin
}