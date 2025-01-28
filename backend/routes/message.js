const express = require("express");
const router = express.Router();
const {productPool} = require('./db');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const {verifyToken} = require('./util');
router.get('/',verifyToken, async (req, res) => {
    try {
        const result = await productPool.query('SELECT * FROM message');
       return res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
router.get('/:id',verifyToken, async (req, res) => {
    try {
        const result = await productPool.query('SELECT * FROM message WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).send('User not found');
       return res.json(result.rows({}));
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
router.post('/',verifyToken, async (req, res) => {
    const { name, email, phone, message } = req.body;
     try{
            const result = await productPool.query('INSERT INTO message (name, email, phone, message) VALUES ($1, $2, $3, $4)',[name,email,phone,message]);
           return res.status(201).json({success:result});
        }catch(err){
            console.log(err);
           return res.status(500).send("Server Error");
        }
});

module.exports = router;
