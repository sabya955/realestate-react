const express = require("express");
const router = express.Router();
const { productPool } = require("./db");
const { verifyToken  } = require("./util");
router.post("/", verifyToken, async (req, res) => {
  console.log("received", req.body);
  
  try {
    const { product_id } = req.body;
    let user = await productPool.query("SELECT * FROM users WHERE id = $1", [req.user.userId]);
    const user_id = user.rows[0].id;
    console.log("User: " + user_id);
    if (!product_id) {
      return res.status(400).json({ message: "product_id is required" });
    }
    const checkLike = await productPool.query(
      "SELECT * FROM likes WHERE user_id = $1 AND product_id = $2",
      [user_id, product_id]
    );
    if(checkLike.rows.length>0){
        await productPool.query(
            'DELETE FROM likes WHERE user_id = $1 AND product_id = $2',[user_id, product_id]
        );
        return res.json ({message:"product unliked"})
    }else{
        await productPool.query(
            'INSERT INTO likes (user_id,product_id) VALUES($1,$2)',[user_id,product_id]
        );
        return res.json({message: "product liked"});
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error adding like" });
  }
});
router.get("/",verifyToken, async (req,res)=>{
    try{
      let user = await productPool.query("SELECT * FROM users WHERE id = $1", [req.user.userId]);
      const user_id = user.rows[0].id;
        const result = await productPool.query(
          "SELECT product_id FROM likes WHERE user_id = $1",
          [user_id]
        );
        return res.json({likes:result.rows.map(row => row.product_id)});

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Error fetching likes"})
    }
})
module.exports = router;
