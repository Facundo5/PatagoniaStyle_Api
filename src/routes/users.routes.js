const {Router} = require('express');
const {check} = require('express-validator');
const { getUsers, addUsers, editUsers, delUser, getUser} = require('../controllers/users.controller');
const { checkAuth } = require('../middlewares/auth');
const { checkRoleAuth } = require('../middlewares/checkRoleAuth');
const {validarCampo} = require('../middlewares/validar-campos');


const router = Router();

router.get('/admin/users', checkAuth, checkRoleAuth(['admin']),getUsers);
router.put('/admin/users/:id', checkAuth, checkRoleAuth(['admin']),editUsers);

router.post('/register',[ 
    check('name', 'El nombre es requerido').notEmpty(),
    check('email', 'Debe ser un email válido').isEmail(),
    check('password').isLength({max:7}),
    validarCampo
] ,addUsers);

//router.put('/:id', editUsers);

//router.delete('/:id', delUserS);

module.exports = router;