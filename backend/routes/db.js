
const {Pool}=require("pg");
const productPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'product',
    password: 'sabyasachi',
    port: 5433,
})
module.exports = {productPool};
