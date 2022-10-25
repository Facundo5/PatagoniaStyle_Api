const {Router} = require('express');
const { getCards } = require('./../controllers/tienda.controller')

const router = Router();

router.get('/tienda');

module.exports = router;