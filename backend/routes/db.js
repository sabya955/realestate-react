
const {Pool}=require("pg");
const productPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'product',
    password: 'sabyasachi',
    port: 5433,
})
const authPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'author',
    password: 'sabyasachi',
    port: 5433,
});
const userPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydatabase',
    password: 'sabyasachi',
    port: 5433,

})
 


module.exports = {productPool,authPool,userPool};
