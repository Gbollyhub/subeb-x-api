const ProjectDataModel = require('../models/project-data')


exports.RegisterProjectData = async (req, res) => {
    try{
        const isExist = await ProjectDataModel.findOne({ year: req.body.year })
        if(isExist){
            return res.status(403).send({ error: "This Project Summary for this Year already exists"})
        }
        await ProjectDataModel.insertMany(req.body)
            

        res.status(201).send({message: "Successful"})
    }
    catch(e){
        console.log(e)
        res.status(400).send({ error: 'Error creating project data'})
    }

}

exports.getProjectData = async (req, res) => {
    try {
        const isdown = await ProjectDataModel.find({year: req.query.year, project: req.query.project })
        res.status(200).send(isdown)
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }
    
}

exports.getLgeaProjectData = async (req, res) => {
    try {
        const isdown = await ProjectDataModel.find({year: req.query.year, project: req.query.project, location:req.query.location  })
        res.status(200).send(isdown)
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }
    
}

exports.deleteProjects = async (req, res) => {
    try {
        const isdown = await  ProjectDataModel.deleteMany({ year: req.query.year })
        res.status(200).send({message: "Removal Successful"})
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }

}