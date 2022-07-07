require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const ReportModel = require('../models/monitoring-report')
const reportUploadModel = require('../models/report-upload')
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { Blob } = require('buffer') ;
const fs = require('fs');

const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: 'WSSYGSEZ5EA7Z4S6QKPD',
    secretAccessKey: 'w15/uYDXVevhxHARVfAlz1DSbLO37YhDE1sDrY4iRGw'
});

const upload = multer({

    storage: multerS3({
      s3,
      bucket: 'lasubeb/tep-dashboard',
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, `${Date.now().toString()}${file.originalname}`);
      }, 
    }),
  }).array('images');

exports.RegisterReport = async (req, res) => {
    
    try{
        

        upload(req, res, (err) => {
            if (err) {
              console.log(err);
              let error;
              if (err.name === 'MulterError') {
                error = err.code;
              } else {
                error = err;
              }
              return res.status(400).json({ success: false, message: error });
            }
            // const url = req.files.location;
            const responses = [];
          for (let index = 0; index < req.files.length; index++) {
              responses.push(`${req.files[index].location.split('digitaloceanspaces.com')[0]}cdn.digitaloceanspaces.com${
                req.files[index].location.split('digitaloceanspaces.com')[1]
            }`)
            console.log(
                `${req.files[index].location.split('digitaloceanspaces.com')[0]}cdn.digitaloceanspaces.com${
                    req.files[index].location.split('digitaloceanspaces.com')[1]
                }`
              );
          }
       
           
          setTimeout(async () => {
            
            const result = new ReportModel({
                "lgea": req.body.lgea,
                "school_name": req.body.school_name,
                "school_category": req.body.school_category,
                "stages": req.body.stages,
                "project": req.body.project,
                "year": req.body.year,
                "volunteer_id": req.body.volunteer_id,
                "images": responses,
                "expected": req.body.expected
            })
            await result.save();
           res.status(200).json({ message: 'File uploaded successfully.' });
         }, 3000); 
            
          });
      
        
    }
    catch(e){
        console.log(e)
        res.status(400).send({ error: 'Error creating Monitoring Report'})
    }

}

exports.RegisterReport2 = async (req, res) => {
    
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try{
        // const isExist = await ReportModel.findOne({ year: req.body.year })

        // if(isExist){
        //     return res.status(403).send({ error: "Monitoring Report for this Year already exists"})
        // }

const responses = [];
        if(req.body.images.length > 0){
                    
        for(let i = 0; i < req.body.images.length; i++){

            const fileStr = req.body.images[i];

            const uploadResponse = await cloudinary.uploader.upload(fileStr, {

                upload_preset: 'ml_default',
            });
            
           responses.push(uploadResponse.url)
          }
        }
 
        const result = new ReportModel({
            "lgea": req.body.lgea,
            "expected": req.body.expected,
            "completed": req.body.completed,
            "project": req.body.project,
            "year": req.body.year,
            "volunteer_id": req.body.volunteer_id,
            "images": responses
        })
        await result.save();
        res.status(201).send(result)
        
    }
    catch(e){
        console.log(e)
        res.status(400).send({ error: 'Error creating Monitoring Report'})
    }

}


exports.RegisterManyReport = async (req, res) => {
    try{
       
        await ReportModel.insertMany(req.body)
            

        res.status(201).send({message: "Successful"})
    }
    catch(e){
        console.log(e)
        res.status(400).send({ error: 'Error creating Monitoring Report'})
    }

}

exports.getReport = async (req, res) => {
    try {
        const isdown = await ReportModel.find({year: req.body.year}).populate('volunteer_id' , 'first_name last_name');
        res.status(200).send(isdown)
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }
    
}

exports.getReportByUser = async (req, res) => {
    try {
       
        const isdown = await ReportModel.find({"volunteer_id": req.query.userId})
        res.status(200).send(isdown)
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Operation Failed"})
    }
    
}


exports.updateReport = async (req, res) => {

    try{
        

        upload(req, res, async(err) => {
            if (err) {
              console.log(err);
              let error;
              if (err.name === 'MulterError') {
                error = err.code;
              } else {
                error = err;
              }
              return res.status(400).json({ success: false, message: error });
            }
            // const url = req.files.location;
            const responses = [];
          for (let index = 0; index < req.files.length; index++) {
              responses.push(`${req.files[index].location.split('digitaloceanspaces.com')[0]}cdn.digitaloceanspaces.com${
                req.files[index].location.split('digitaloceanspaces.com')[1]
            }`)
            console.log(
                `${req.files[index].location.split('digitaloceanspaces.com')[0]}cdn.digitaloceanspaces.com${
                    req.files[index].location.split('digitaloceanspaces.com')[1]
                }`
              );
          }
          const _id = req.body._id
          const report = await ReportModel.findById(_id)
          if(!report){
              return res.status(404).send("Report does not exist")
             }
           
          setTimeout(async () => {
            report.lgea= req.body.lgea;
            report.school_name= req.body.school_name;
            report.school_category= req.body.school_category;
            report.stages= req.body.stages;
            report.project= req.body.project;
            report.year= req.body.year;
            report.volunteer_id= req.body.volunteer_id;
            report.images= responses.length > 0 ? responses : req.body.old_images;

            await report.save();
           res.status(200).json({ message: 'Updating successfully.' });
         }, 3000); 
            
          });
      
        
    }
    catch(e){
        console.log(e)
        res.status(400).send({ error: 'Error updating Monitoring Report'})
    }
 

}

exports.getComparison = async (req, res) => {
    try {
        const isdown = await ReportModel.find({year: req.query.year, project: req.query.project}).populate('volunteer_id' , 'first_name last_name');
        res.status(200).send(isdown)
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }
    
}

exports.deleteReport = async (req, res) => {
    try {
        const isdown = await  ReportModel.findOneAndDelete({  _id: req.query.id })
        res.status(200).send({message: "Removal Successful"})
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }

}


exports.deleteAllReport = async (req, res) => {
    try {
        const isdown = await  ReportModel.deleteMany({ year: req.query.year })
        res.status(200).send({message: "Removal Successful"})
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }

}


exports.RegisterUploadYear = async (req, res) => {
    try{
        const isExist = await reportUploadModel.findOne({ year: req.body.year })
        console.log(isExist)
        if(isExist){
            return res.status(403).send({ error: "Report for this Year already exists"})
        }

        await reportUploadModel.insertMany(req.body)
            

        res.status(201).send({message: "Successful"})
    }
    catch(e){
        console.log(e)
        res.status(400).send({ error: 'Error creating report'})
    }

}

exports.getUploadYear = async (req, res) => {

    try {
        const isdown = await reportUploadModel.find()
        res.status(200).send(isdown)
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }

}

exports.deleteUploadYear = async (req, res) => {
    try {
        await  reportUploadModel.findOneAndDelete({  _id: req.query.id })
        res.status(200).send({message: "Removal Successful"})
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }

}