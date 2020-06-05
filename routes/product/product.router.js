const {Router} = require('express');

const productRouter = Router();

const {productController} = require('../../controllers');
const checkProductValidity = require('../../middlewares/product/checkProductValidity');


productRouter.post('/', checkProductValidity, productController.createProduct);

productRouter.get('/', productController.getAllProducts);

productRouter.get('/:id', productController.getProduct);

productRouter.post('/sale/:id', productController.getDiscount);

productRouter.put('/:id', productController.updateProduct);

productRouter.delete('/:id', productController.deleteProduct);


module.exports = productRouter;
