const {productService} = require('../../services')
const {hashCouponCode, checkHashCouponCode} = require('../../helpers')
const ErrorHandler = require('../../error/ErrorHandler')

module.exports = {
    getAllProducts: async (req, res) => {
        const products = await productService.getAllProducts();
        res.json({products});
    },

    getProduct: async (req, res) => {
        const params = +req.params.id;

        const product = await productService.getProduct(params);

        res.json({product})
    },

    getDiscount: async (req, res, next) => {
        const productId = +req.params.id;
        const couponCode = req.body.coupon_code;
        const product = await productService.getProduct(productId);


        if (!product){
            return next(new ErrorHandler('Product not exist', 404, 4015))
        }

        const checkCoupon = await checkHashCouponCode(couponCode, product.coupon_code);

        if (!checkCoupon){
            return next(new ErrorHandler('Coupon code is not valid', 404, 4020))
        }

        res.end(`Your sale price is ${product.sale_price}`)
    },

    updateProduct: async (req, res) => {
        const data = req.body;
        const params = +req.params.id;
        const updProd = await productService.updateProduct(params, data)
        res.json({updProd})
    },

    deleteProduct: async (req, res) => {
        const params = +req.params.id;
        const delProd = await productService.deleteProduct(params)
        res.json({delProd})
    },

    createProduct: async (req, res) => {
        console.log(req.body)

        try {
            const product = req.body;

            const hashedCouponCode = await hashCouponCode(product.coupon_code);

            product.coupon_code = hashedCouponCode;

            const newProd = await productService.createProduct(product);
        } catch (e) {
            res.json(e)
        }
        res.end()
    }
};
