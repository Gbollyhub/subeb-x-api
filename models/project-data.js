const mongoose = require('mongoose');



const projectDataSchema = new mongoose.Schema(
    {

     activities: {
         type: String,
         required: true,
         trim: true
     },
     objectives: {
        type: String,
        required: true,
        trim: true
    },
    strategy: {
        type: String,
        required: true,
        trim: true
    },
    target_groups: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: Number,
        required: true,
        trim: true
    },
    output: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    expected_outcome: {
        type: String,
        required: true,
        trim: true
    },
    indicator: {
        type: String,
        required: true,
        trim: true
    },
    unit_cost: {
        type: Number,
        required: true,
        trim: true
    },
    total_cost: {
        type: Number,
        required: true,
        trim: true
    },
    project: {
        type: Number,
        required: true,
        trim: true
    },
    no_of_projects: {
        type: Number,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        trim: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'users'
    },
  
    },
    {
        timestamps: true
    }
)


const user = mongoose.model('projectData', projectDataSchema) ;
module.exports = user ;