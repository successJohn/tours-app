const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "./config.env"});


const app = require("./app");



const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser : true,

}).then( () =>  console.log("connection successful"));

const port = process.env.PORT || 5000

app.listen(port, () =>{
    console.log(`server listening on port ${port} ...`);
})