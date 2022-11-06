const {Router} = require('express');
const {check} = require('express-validator');
const { getUsers, addUsers, editUsers, delUser } = require('../controllers/users.controller');
const {validarCampo} = require('../middlewares/validar-campos');


const router = Router();

router.get('/', getUsers);

router.post('/',[ 
    check('username', 'Username es requerido').notEmpty(),
    check('email', 'Debe ser un email válido').isEmail(),
    check('password').isLength({max:7}),
    validarCampo
] ,addUsers);

//router.put('/:id', editUsers);

//router.delete('/:id', delUserS);

module.exports = router;