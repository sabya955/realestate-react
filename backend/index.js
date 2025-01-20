const express = require('express')
const router = express.Router();
const cors = require('cors')
const app = express()
// const {Pool} = require('pg');
app.use(express.json())
app.use(cors())
const crypto = require('crypto'); 
const { log } = require('console')
const apiRoutes = require("./routes/index");
//app.apiRoutes= 
app.use("/api", apiRoutes);
//const authRoutes = require('./routes/auth');
//app.use("./routes/auth", authRoutes);
const PORT = 4000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
// const pool = new Pool({
//     user :'postgres',
//     host:"localhost",
//     database :'mydatabase',
//     password :'sabyasachi',
//     port :5433,
// })
// pool.connect((err)=>{
//     if(err){
//         console.log("Error connecting to database",err)
//     }else{
//         console.log("Database connected");
        
//     }
// });

// app.get('/',async(req,res)=>{
//     try{
//         const result = await pool.query('SELECT * FROM users');
//         res.json(result.rows);
//     }catch(err){
//         console.log(err);
//         res.status(500).send("Server Error");
//     }     
//     pool.end();
// })
// app.post('/api/users',async(req,res)=>{
//     const {name,email,phone,message}=req.body;
//     try{
//         const result = await pool.query('INSERT INTO users (name, email, phone, message) VALUES ($1, $2, $3, $4)',[name,email,phone,message]);
//         res.status(201).json({success:result});
//     }catch(err){
//         console.log(err);
//         res.status(500).send("Server Error");
//     }
// })



/*
app.get('/api/users', (req, res) => {
    res.json(users);
});
app.get('/api/users/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});
app.post('/api/users', (req, res) => {
    const {name, email, phone, message} = req.body;
    console.log("Came to posyt call", req.body);
    const user = { id:crypto.randomUUID(),name:name ,mail:email,phoneNumber:phone,text:message};
    users.push(user);
    console.log(user);
    res.status(201).json(user);
});
app.get ('/api/messages', (req, res) => {
    res.send(users);
});
*/