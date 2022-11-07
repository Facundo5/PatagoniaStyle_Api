const { Router } = require('express');
const { userLogin } = require('./../controllers/auth.controller');


const router = Router();

router.post('/login', userLogin);

module.exports = router;