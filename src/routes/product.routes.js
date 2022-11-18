const { addProduct, getProduct,getProductsCard, updateProduct,deleteProduct, getProducts} = require('../controllers/product.controller');
const {Router} = require('express');
const { checkAuth } = require('../middlewares/auth');
const { checkRoleAuth } = require('../middlewares/checkRoleAuth');
const multer  = require('multer')
const upload = multer({ dest: './uploads/shoes' })

const router = Router();


router.get('/getproducts/:id', getProduct)
router.get('/admin/viewproducts',checkAuth, checkRoleAuth(['admin']), getProducts);
router.put('/admin/updateproduct/:id',checkAuth, checkRoleAuth(['admin']) , updateProduct);
router.post('/admin/addproduct', checkAuth, checkRoleAuth(['admin']) ,addProduct, upload.array('photos', 5), function (req, res, next) {
    photos.originalname
    res.send(req.files)
    res.send(req.body)
});

module.exports = router;