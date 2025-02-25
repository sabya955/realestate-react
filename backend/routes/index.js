const express = require('express');
const router = express.Router();
const userRouter = require('./message');
const productRouter = require('./product');
const Auth = require('./auth');
const sellerRouter = require('./seller');
const likeRouter = require('./like')
router.use('/message', userRouter);
router.use('/products', productRouter);
router.use('/auth', Auth);
router.use('/seller',sellerRouter);
router.use('/like',likeRouter);
module.exports = router;