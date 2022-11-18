const { Router } = require('express');
const { tokenSign } = require('../middlewares/generateToken');
const { userLogin } = require('./../controllers/auth.controller');


const router = Router();

router.post('/login',userLogin);

module.exports = router;