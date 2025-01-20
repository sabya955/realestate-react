const express = require("express");
const router = express.Router();
const { Pool } = require('pg');

const bodyParser = require('body-parser');

const app = express();

// Parse application/json
app.use(bodyParser.json());
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydatabase',
    password: 'sabyasachi',
    port: 5433,
});
pool.connect((err)=>{
    if(err){
        console.log("Error connecting to database",err)
    }else{
        console.log("Database connected");
        
    }
});
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).send('User not found');
        res.json(result.rows({}));
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.post('/', async (req, res) => {
    const { name, email, phone, message } = req.body;
     try{
            const result = await pool.query('INSERT INTO users (name, email, phone, message) VALUES ($1, $2, $3, $4)',[name,email,phone,message]);
            res.status(201).json({success:result});
        }catch(err){
            console.log(err);
            res.status(500).send("Server Error");
        }
});

module.exports = router;
