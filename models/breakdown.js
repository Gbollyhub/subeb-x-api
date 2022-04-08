const mongoose = require('mongoose');



const breakdownSchema = new mongoose.Schema(
    {

     component: {
         type: String,
         required: true,
         trim: true
     },
     area_of_intervention: {
        type: String,
        required: true,
        trim: true
    },
     
     no_of_projects: {
        type: Number,
        required: true,
        trim: true
     },
     expected_outcome: {
        type: String,
        required: true,
        trim: true
    },
    actual_amount: {
        type: Number,
        required: true,
        trim: true
    },
     percentage:{
        type: Number,
        required: true,
        trim:true
     },
     year:{
        type: Number,
        required: true,
        trim:true
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


const user = mongoose.model('breakdown', breakdownSchema) ;
module.exports = user ;