const fs = require("fs")
const mongoose =  require ("mongoose");
const dotenv = require("dotenv");
const Tour = require("./../models/tourModel");


dotenv.config({path:"./config.env"});

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser : true,

}).then( () =>  console.log("connection successful"));



// Read json file

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,"utf-8"));

// Import Data into Database
const importData = async() =>{
    try {
        await Tour.create(tours);
        console.log("Data Successfully loaded");
       
    } catch (error) {
        console.log(error);
    }
    process.exit();
}

//Delete all data from db

const deleteData  = async() =>{
    try {
        await Tour.deleteMany()
        console.log("Data Successfully deleted");
       
    } catch (error) {
        console.log(error);
    }
    process.exit();
}

if(process.argv[2] === "--import"){
    importData();
}else if(process.argv[2] === "--delete"){
    deleteData();
}
console.log(process.argv);