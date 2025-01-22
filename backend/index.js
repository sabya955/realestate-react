const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const apiRoutes = require("./routes/index");
app.use("/api", apiRoutes);
const PORT = 4000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
