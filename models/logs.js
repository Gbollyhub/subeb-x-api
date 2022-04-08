const mongoose = require('mongoose');



const logSchema = new mongoose.Schema(
    {

     activities: {
        type: Map,
        of: String
     },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: 'users'
    },
  
    },
    {
        timestamps: true
    }
)


const user = mongoose.model('logs', logSchema) ;
module.exports = user ;