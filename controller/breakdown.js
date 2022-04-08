const BreakdownModel = require('../models/breakdown')


exports.RegisterBreakdown = async (req, res) => {
    try{
        const breakExist = await BreakdownModel.findOne({ year: req.body.year })
        if(breakExist){
            return res.status(403).send({ error: "Breakdown Summary for this Year already exists"})
        }
        await BreakdownModel.insertMany(req.body)
            
        res.status(201).send({message: "Successful"})
    }
    catch(e){
        console.log(e)
        res.status(400).send({ error: 'Error creating breakdown'})
    }

}

exports.getBreakdown = async (req, res) => {
    try {
        const breakdown = await BreakdownModel.find({year: req.query.year})
        res.status(200).send(breakdown)
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }
    
}


exports.deleteBreakdwon = async (req, res) => {
    try {
        const isdown = await  BreakdownModel.deleteMany({ year: req.query.year })
        res.status(200).send({message: "Removal Successful"})
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }

}