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
        const allTours = Tour.find({}, function(err, tours){
            if(err){
                res.send(err);
            }
       
            res.status(201).json({
                status: "success",
            
                data: {
                    tour: tours
                }
            })
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