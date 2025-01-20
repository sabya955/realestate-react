const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const productRouter = require('./product');
const Auth = require('./auth');
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/auth', Auth);
module.exports = router;