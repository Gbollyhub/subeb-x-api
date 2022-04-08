const LogModel = require('../models//logs')


exports.RegisterLog = async (req, res) => {
    try{
        const log = new LogModel({
            "activities": req.body.activities,
            "user_id": req.body.user_id,
        })
        await log.save()
        res.status(201).send(log)
    }
    catch(e){
        console.log(e)
        res.status(400).send({ error: 'Error creating Logs'})
    }

}



exports.getLogs = async (req, res) => {
    try {
        const isdown = await  LogModel.find().populate('user_id', 'first_name last_name')
        res.status(200).send(isdown)
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }

}


exports.deleteLogs = async (req, res) => {
    try {
        const isdown = await  LogModel.deleteMany()
        res.status(200).send({message: "Removal Successful"})
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }

}


