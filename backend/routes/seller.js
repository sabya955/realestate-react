const express = require('express');
const router= express.Router();
const {productPool}= require('./db');
const {verifyAdmin} = require('./util');
router.get("/users",verifyAdmin, async(req,res)=>{
    try{
        const result = await productPool.query('SELECT id, full_name AS fullName,email,role FROM  users')
        return res.status(200).json({users:result.rows});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"internal server error",error:err.message})
    }
})
router.post("/updaterole", verifyAdmin, async (req,res)=>{
    const {userId,isSeller }=req.body;

   const role = isSeller ? 'seller':'user'; 
    try{
        const result = await productPool.query('UPDATE users SET role = $1 WHERE id = $2 RETURNING *',[role,userId]);
        return res.status(200).json({message:`user role updated to ${role}`,user:result.rows[0]});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'internal server error',error:err.message});
    }
})
module.exports = router;