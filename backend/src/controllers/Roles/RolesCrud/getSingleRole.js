const {Role} = require('../../../models/Role');

const getSingleRole = async(req , res) =>{
try{

const {id} = req.params;

const role = await Role.findById(id);

if (!role) {
     return res.status(404).json({ message: "Role not found" });
}


  return res.status(200).json({
      message: "✅ Role fetched successfully",
      data: role,
    });
}catch(error){
    return res.status(500).json({
        message:error.message
    })
}
}

module.exports= {getSingleRole}