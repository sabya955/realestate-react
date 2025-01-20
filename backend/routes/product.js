const express = require("express");
const router = express.Router();

let products = [
    {
        id:1,
        image:"https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBhcnRtZW50JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
        availability:"For Rent",
        type:"Residential",
        name:"Modern Apartments",
        price:"$ 1500/mo",
        details:"3 bd / 2 ba / 1100 Sq Ft"
    },
    {
        id:2,
        image:"https://images.unsplash.com/photo-1675279200694-8529c73b1fd0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXBhcnRtZW50JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
        availability:"For Sale",
        type:"Residential",
        name:"Family Home",
        price:"$ 175,000",
        details:"4 bd / 3 ba / 2700 Sq Ft"
    },
    {
        id:3,
        image:"https://plus.unsplash.com/premium_photo-1661964014750-963a28aeddea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
        availability:"For Rent",
        type:"Commercial",
        name:"Modern Apartment",
        price:"$ 2000/mo",
        details:"3 bd / 3 ba / 1450 Sq Ft"
    },
    {
        id:4,
        image:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
        availability:"For Sale",
        type:"Commercial",
        name:"Elegant Studio Flat",
        price:"$ 138,000",
        details:"3 bd / 2 ba / 1100 Sq Ft"
    },
]

router.get('/', (req, res) => {
    res.send(products)
})
router.get('/:id', (req, res) => {
    const prod = products.find((u) => u.id === parseInt(req.params.id));
    if (!prod) return res.status(404).send('User not found');
    res.json(prod);
});
router.post = ('/',(req, res) => {
    const {image,availability,name,type,price,details} = req.body;
    const newProduct = { id: Math.random(), image, availability, name, type, price, details };
    products.push(newProduct);
    res.status(201).json(newProduct);
})
module.exports = router;
