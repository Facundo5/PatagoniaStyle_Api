const { addProduct, getProduct,getProductsCard, updateProduct,deleteProduct, getProducts} = require('../controllers/product.controller');
const {Router} = require('express');
const { checkAuth } = require('../middlewares/auth');
const { checkRoleAuth } = require('../middlewares/checkRoleAuth');
const upload = require('../utils/multer')
const cloudinary = require('../utils/cloudinary')

const router = Router();


router.get('/getproduct/:id_shoes', getProduct)
router.get('/getproductscards', getProductsCard)
router.get('/admin/viewproducts',checkAuth, checkRoleAuth(['admin']), getProducts);
router.put('/admin/updateproduct/:id',checkAuth, checkRoleAuth(['admin']) , updateProduct);
router.post('/admin/addproduct', checkAuth, checkRoleAuth(['admin']) ,upload.array("image"),addProduct)

module.exports = router;