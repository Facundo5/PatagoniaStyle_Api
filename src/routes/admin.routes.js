const {Router} = require('express');
const { getSize, getBrands, getColours} = require('../controllers/admin.controller');
const { checkAuth } = require('../middlewares/auth');
const { checkRoleAuth } = require('../middlewares/checkRoleAuth');

const router = Router();


router.get('/getsizes', checkAuth,checkRoleAuth(['admin']),getSize)
router.get('/getbrands', checkAuth,checkRoleAuth(['admin']),getBrands)
router.get('/getcolours', checkAuth,checkRoleAuth(['admin']),getColours)


module.exports = router;