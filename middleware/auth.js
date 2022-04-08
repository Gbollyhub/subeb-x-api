const UserModel = require('../models/users')
const jwt = require('jsonwebtoken')

exports.Auth = async (req, res, next) => {

    try{
            const token = req.header('Authorization').replace('Bearer ', '')
            const verifytoken = jwt.verify(token, 'lasubeb2022api!!final')
            const user = await UserModel.findOne({"_id": verifytoken._id, "tokens.token": token})
            if(!user){
                throw new Error()
            }
           req.token = token
           req.user = user
           next()
        }
        catch(e){
            console.log(e)
            res.status(401).send({ error: 'Please login to continue'})
        }
   

    

}