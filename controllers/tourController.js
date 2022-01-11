const Tour = require("./../models/tourModel");

exports.createTour = async (req, res) =>{
    try{
        const newTour = await Tour.create(req.body);

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