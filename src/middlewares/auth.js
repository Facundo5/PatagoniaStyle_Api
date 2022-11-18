const { verifyToken } = require('../middlewares/generateToken')
//Verificamos si el usuario tiene un token generado (Sesion iniciada)
const checkAuth = async (req = request, res = response, next) => {
    console.log('ESTAMOS POR INICIAR EL TRY del checkAuth')
    try {
        //En el header solicitamos el TOKEN 
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ').pop()
        console.log(token)
        //Verificamos si el token es valido
        const tokenData = await verifyToken(token)
        console.log(tokenData)
        //Si el TOKEN esta firmado de forma correcta, lo dejamos ingresar
        if(tokenData.id) {
            next()
        } else {
            //Si el token es invalido le damos un error para que no pueda ingresar
            res.status(409)
            res.send({error: 'No tenes una sesion activa'})
        }
        //Si el usuario no tiene TOKEN rechazamos su peticion
    } catch (e){
        console.log(e)
        res.status(409)
        res.send({error: 'No tenes una sesion activa'})
    }
}
module.exports = {
    checkAuth
}