const UserModel = require('../models/users')
const bcrypt = require('bcrypt')
const { resolveMx } = require('dns')

exports.Register = async (req, res) => {
    try{
        const userExist = await UserModel.findOne({ email_address: req.body.email_address })
        if(userExist){
            return res.status(403).send({ error: "Email already exists"})
        }
        const user = new UserModel({
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email_address": req.body.email_address,
            "phone_number": req.body.phone_number,
            "password": req.body.password,
            "role": req.body.role
        })
        await user.save()
        res.status(201).send(user)
    }
    catch(e){
        console.log(e)
        res.status(400).send({ error: 'Error creating user'})
    }

}

exports.Login = async (req, res) => {
    console.log(req.body)
    try {
        const user = await UserModel.findOne({ email_address: req.body.email_address })

        if(!user){
            return res.status(401).json({
                error: 'User with that email does not exist. Please signup.'
            });
        }

        if(user.isActive == false){
            return res.status(401).json({
                error: 'Account has been suspended, kindly contact the admin'
            });
        }

        const checkpassword = await bcrypt.compare(req.body.password, user.password)

        if(!checkpassword){
            return res.status(401).json({
                error: 'Email and password do not match'
            });
        }

        const token = await user.generateToken()

        res.send({ user, token: token})
        
    }
    catch(e){
        res.status(400).send({ error: 'Invalid Credentials'})
    }

}

exports.getProfile = async (req, res) => {
    res.send(req.user)
}


exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        res.send(users)
    } catch (error) {
        res.status(400).send({error: error})
    }
   
}


 
 exports.updateUser = async (req, res) => {
    const _id = req.body._id
    const updates = Object.keys(req.body)
 
    try{
     // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
 
     const user = await UserModel.findById(_id)
 
     if(!user){
      return res.status(404).send("User does not exist")
     }
 
     updates.forEach((update)=>{
         user[update] = req.body[update]
     })
 
      await user.save()
 
     res.status(200).send({message: "Update Successful"})
    }
    catch (error){
        return res.status(400).send({error: "Update Failed"})
    }
 }

 exports.Logout = async (req, res) => {
    try{
         req.user.tokens = req.user.tokens.filter( (token) => {
             return token.token !== req.token
         })
 
         await req.user.save()
          res.send({ "message": "Logout Succesfully"})
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
 }