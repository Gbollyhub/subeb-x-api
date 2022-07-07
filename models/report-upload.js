const mongoose = require('mongoose');



const reportUploadSchema = new mongoose.Schema(
    {
     year: {
        type: Number,
        required: true,
        trim: true
    },

  
    },
    {
        timestamps: true
    }
)


const user = mongoose.model('reportUpload', reportUploadSchema) ;
module.exports = user ;