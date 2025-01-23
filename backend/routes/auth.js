const express = require('express');
const router= express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {productPool}= require('./db');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
router.post('/signup',async (req,res)=>{
    const {fullName,email,password,confirmPassword} = req.body;
    if (!fullName || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }
    if(password !== confirmPassword){
        return res.status(400).json({message: 'Passwords do not match'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
   
    try{
        const existingUser  = await productPool.query('SELECT * FROM users WHERE email =$1',[email]);
        if(existingUser.rows.length>0){
            return res.status(400).json({message: 'User already exists'});
        }
        try {
            var result = await productPool.query(
                'INSERT INTO users  (full_name, email, password) VALUES ($1, $2, $3) RETURNING id',
                [fullName, email, hashedPassword]
                
            );
            const token = jwt.sign({ userId: result.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
           return res.status(201).json({ token, message: "User registered successfully" });

        } catch(e){
            return res.status(500).json({message: 'internal server error',error:e.message});
         }
    }catch(err){
        console.log(err);
       return res.status(500).json({message: 'internal server error',error:err.message});  
    }
});

router.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    try{
        const result = await productPool.query('SELECT * FROM users WHERE email = $1',[email]);
        if (result.rows.length === 0){
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const isValidPassword = await bcrypt.compare(password, result.rows[0].password);
        if (!isValidPassword) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: result.rows[0].id },JWT_SECRET, { expiresIn: '1h' });
        const user = result.rows[0]
        return res.status(200).json({ 
            message: 'Login successful', 
            user: { id: user.id, fullName: user.full_name, email: user.email },
           token: token });
    }catch(err){
        console.log(err);
       return res.status(500).json({message: 'internal server error',error:err.message});
    }
})
module.exports = router