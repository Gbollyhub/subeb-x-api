const AllocationModel = require('../models/allocation')


exports.RegisterAllocation = async (req, res) => {
    try{
        const isExist = await AllocationModel.findOne({ year: req.body.year })
        console.log(isExist)
        if(isExist){
            return res.status(403).send({ error: "Allocation for this Year already exists"})
        }

        await AllocationModel.insertMany(req.body)
            

        res.status(201).send({message: "Successful"})
    }
    catch(e){
        console.log(e)
        res.status(400).send({ error: 'Error creating allocation'})
    }

}

exports.getAllocationByYear = async (req, res) => {
    try {
        const isdown = await AllocationModel.find({year: req.query.year})
        res.status(200).send(isdown)
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }

}

exports.getAllocation = async (req, res) => {
    try {
        const isdown = await  AllocationModel.find()
        res.status(200).send(isdown)
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }

}


exports.deleteAllocation = async (req, res) => {
    try {
        const isdown = await  AllocationModel.deleteMany({ year: req.query.year })
        res.status(200).send({message: "Removal Successful"})
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }

}