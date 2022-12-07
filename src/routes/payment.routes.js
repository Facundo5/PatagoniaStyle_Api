const Router = require('express');
const { generateLink } = require('../controllers/payment.controller');

const router = Router();

router.get('/payment', generateLink);

module.exports = router;