const express = require("express");
const router = express.Router();
const {userPool} = require('./db');

const bodyParser = require('body-parser');

const app = express();

// Parse application/json
app.use(bodyParser.json());

router.get('/', async (req, res) => {
    try {
        const result = await userPool.query('SELECT * FROM users');
       return res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await userPool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).send('User not found');
       return res.json(result.rows({}));
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.post('/', async (req, res) => {
    const { name, email, phone, message } = req.body;
     try{
            const result = await userPool.query('INSERT INTO users (name, email, phone, message) VALUES ($1, $2, $3, $4)',[name,email,phone,message]);
           return res.status(201).json({success:result});
        }catch(err){
            console.log(err);
           return res.status(500).send("Server Error");
        }
});

module.exports = router;
