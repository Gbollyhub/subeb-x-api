const mongoose = require('mongoose');



const allocationSchema = new mongoose.Schema(
    {

     allocation: {
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


const user = mongoose.model('allocation', allocationSchema) ;
module.exports = user ;