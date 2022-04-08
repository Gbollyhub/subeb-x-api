const mongoose = require('mongoose');



const publishSchema = new mongoose.Schema(
    {

     publish: {
         type: Boolean,
         required: true
     },

    },
    {
        timestamps: true
    }
)


const user = mongoose.model('publish', publishSchema) ;
module.exports = user ;