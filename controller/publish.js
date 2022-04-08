const PublishModel = require('../models/publish')


exports.postPublish = async (req, res) => {

    try{
       
        const result = new PublishModel({
            "publish": req.body.publish,
        })

        await result.save()
        res.status(201).send(result)
    }
    catch(e){
        console.log(e)
        res.status(400).send({ error: 'Error creating user'})
    }


}

exports.updatePublish = async (req, res) => {
    const _id = req.body._id
    const updates = Object.keys(req.body)
 
    try{
     // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
 
     const user = await PublishModel.findById(_id)
 
     if(!user){
      return res.status(404).send("Publish does not exist")
     }
 
     updates.forEach((update)=>{
         user[update] = req.body[update]
     })
 
      await user.save()
 
     res.status(200).send({message: "Publish Successful"})
    }
    catch (error){
        return res.status(400).send({error: "Publish Failed"})
    }
 }

exports.getPublish = async (req, res) => {
    try {
        const isdown = await  PublishModel.find()
        res.status(200).send(isdown)
    } catch (error) {
        res.status(500).send({error:"Operation Failed"})
    }

}
