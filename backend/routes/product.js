const express = require("express");
const router = express.Router();
const {productPool} = require('./db');
const {verifyToken} = require('./util');
router.get('/', verifyToken, async (req, res) => {
    try{
        const result = await productPool.query("SELECT * FROM products");
       return res.json({products: result.rows});
    }catch(err){
        console.log(err);
       return res.status(500).json({message: 'error fetching products'});
}
});
router.get('/:id',verifyToken, async(req, res) => {
    try{
        const {id}= req.params;
        const result = await productPool.query("SELECT id FROM products WHERE id=$1",[id]);
        const product = result.rows[0];
        if (product.length === 0){
            return res.status(404).json({message: 'Product not found'});
        }
        return res.json(product);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Error fetching product'});
    }
    
});
router.post = ('/', verifyToken,async(req, res) => {
    try{
        const {image,availability,name,type,price,details} = req.body;
        const result = await productPool.query("INSERT INTO products (image,availability,name,type,price,details) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",[image,availability,name,type,price,details]);
        return res.status.json(result.rows[0]);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Error adding product'});
    }
    
})
module.exports = router;
