const {Router} = require('express');
const { getSize, getBrands, getColours} = require('../controllers/admin.controller');
const { checkAuth } = require('../middlewares/auth');
const { checkRoleAuth } = require('../middlewares/checkRoleAuth');

const router = Router();


router.get('/getsizes',getSize)
router.get('/getbrands',getBrands)
router.get('/getcolours',getColours)


module.exports = router;