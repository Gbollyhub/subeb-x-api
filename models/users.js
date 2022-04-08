const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema(
    {

     first_name: {
         type: String,
         required: true,
         trim: true
     },
     last_name: {
        type: String,
        required: true,
        trim: true
    },
     
     email_address: {
         type: String,
         required: true,
         lowercase: true,
         trim: true,
         validate(value){
             if(!validator.isEmail(value)){
                 throw new Error("Invalid Email Address")
             }
         }
     },
     phone_number: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: Number,
        required: true,
        trim: true
    },
     password:{
        type: String,
        required: true,
        trim:true
     },
     isActive:{
        default: true,
        type: Boolean
     },
     tokens: [
        {
            token: {
                type: String
            }
        }
    ]
    },
    {
        timestamps: true
    }
)

userSchema.virtual('monitoringReport', {
    ref: 'monitoringReport',
    localField: '_id',
    foreignField: 'volunteer_id'
})

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, 'lasubeb2022api!!final')
    user.tokens = user.tokens.concat({token: token})

    await user.save()
    return token
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
     console.log('Middleware running')
    next()
})

const user = mongoose.model('users', userSchema) ;
module.exports = user ;