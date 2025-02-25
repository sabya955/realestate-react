const express = require("express");
const router = express.Router();
const { productPool } = require("./db");
const { verifyToken } = require("./util");
router.get("/", verifyToken, async (req, res) => {
  try {
    var query = "SELECT * FROM products";
    let user = await productPool.query("SELECT * FROM users WHERE id = $1", [req.user.userId]);
    if(user.rows[0].role === "user"){
      query = "SELECT * FROM products WHERE state IN ('published', 'deprecated')"
    }
    const result = await productPool.query(query);
    return res.json({ products: result.rows });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching products" });
  }
});
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productPool.query(
      "SELECT id FROM products WHERE id=$1 AND state IN ('published','deprecated')",
      [id]
    );
    console.log(result);
    const product = result.rows[0];
    console.log(product);
    
    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error fetching product" });
  }
});
router.post 
  ("/",
  verifyToken,
  async (req, res) => {
    try {
      const { image, availability, name, type, price, details } = req.body;
      if (!image || !availability || !name || !type || !price || !details) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const result = await productPool.query(
        "INSERT INTO products (image,availability,name,type,price,details,state) VALUES ($1,$2,$3,$4,$5,$6,'default') RETURNING *",
        [image, availability, name, type, price, details]
      );
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Error adding product" });
    }
  });
  router.put("/updatestate",verifyToken,async(req,res)=>{
    try{
      console.log("is getting",req.body)
      const {id,state}=req.body;
      const validStates = ["default","published","deprecated"]
      if (!validStates.includes(state)) {
        return res.status(400).json({ message: "Invalid state. Choose default, published, or deprecated." });
      }
      const result = await productPool.query(
        "UPDATE products SET state = $1 WHERE id = $2 RETURNING *",
        [state, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json({ message: `Product state updated to ${state}`, product: result.rows[0] });  
    }catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Error updating product state" });
    }
  })

module.exports = router;
