const { User } = require("../../../models/User");

const deleteUser = async (req , res )  =>{
    try{

const {id} = req.params;

const user = await User.findOne({_id:id, removed: false});

if(!user){
    return res.status(404).json({
        message:"User Not found"
    })
}

user.removed= true;
user.enabled = false;
await user.save();

return res.status(200).json({
      message: "✅ User deleted successfully (soft delete)",
    });

    } catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {deleteUser}