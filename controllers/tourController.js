const express = require("express");
const Tour = require("./../models/tourModel");

exports.createTour = async (req, res) =>{
    try{
        const newTour = await Tour.create(req.body);
        console.log(newTour);

        res.status(201).json({
            status: "success",
            data:{
                tour: newTour
            }
        })
    }catch(err){
        res.status(400).json({
            status: "fail",
            msg: err
        })
    }
} 

exports.getAllTours = async(req, res) =>{
    try{
       // FILTERING

        const queryObj = {...req.query};
         
        //1b.advanced filtering for comparison query selectors

        let queryStr = JSON.stringify(queryObj);

        // appending operator "$" to selectors gt, lt, gte and lte

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        

        let data = Tour.find(JSON.parse(queryStr));


        // SORTING

        if(req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ");
            console.log(sortBy);
            data = data.sort(sortBy);
        }else{
            data.sort("-createdAt");
        }
         // Execute query
        const tours = await data;

        // send response
        res.status(200).json({
                   status: "success",
                   length: tours.length,
                   data: {
                       tours 
                   }
               })
    } catch(err){
        res.status(400).json({
            status: "fail",
            msg: err
        })
    }
}

exports.getTour = async (req, res)=>{
 try {
        const tour =  await Tour.findById(req.params.id);
        res.status(201).json({
            status: "success",
            data:{
                tour
            }
        })
    } catch (error) {
            res.status(400).json({
            status: "fail",
            msg: error
        })
    }
} 



exports.updateTour = async(req,res) =>{
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
           runValidators: true
        })
        
 
        res.status(200 ).json({
            status: "success",
            data:{
                tour
            }
        })
    }catch(err){
        res.status(400).json({
            status: "fail",
            msg: err
        })
    }
}


exports.deleteTour = async(req, res) =>{
    try{
     await Tour.findByIdAndDelete(req.params.id)
        res.status(204 ).json({
            status: "success",
            data: null
        })
    }catch(err){
        res.status(400).json({
            status: "fail",
            msg: err
        })
    }
}