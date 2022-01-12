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
        const allTours = Tour.find();
        console.log(allTours);
        res.status(201).json({
            status: "success",
           
            data: {
                tour: allTours
            }
        })
    }catch(err){
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
            msg: err
        })
    }
}