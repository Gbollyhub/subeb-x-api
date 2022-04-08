const mongoose = require('mongoose');



const reportSchema = new mongoose.Schema(
    {

     lgea: {
         type: Number,
         required: true,
         trim: true
     },
     expected: {
        type: Number,
        required: true,
        trim: true
    },
    completed: {
        type: Number,
        required: true,
        trim: true
    },
    project: {
        type: Number,
        required: true,
        trim: true
    },
     year: {
        type: Number,
        required: true,
        trim: true
    },
    volunteer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'users'
    },
    images:[{
        type: String
    }]
  
    },
    {
        timestamps: true
    }
)


const user = mongoose.model('monitoringReport', reportSchema) ;
module.exports = user ;