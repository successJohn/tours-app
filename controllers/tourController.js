const express = require("express");
const Tour = require("./../models/tourModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.aliasTopTours = (req,res,next)=>{
    req.query.limit = "5";
    req.query.sort = "-ratingsAverage,price";
    req.query.fields = "name,price,ratingsAverage,summary,difficulty"
    next();
}

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
        const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
       
        const tours = await features.query;
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