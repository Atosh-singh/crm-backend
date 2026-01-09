const {Role} = require("../../../models/Role");


const getAllRoles = async(req,res)=>{
try{


    const roles = await Role.find().sort({createdAt:-1});

    return res.status(200).json({
        message: "✅ Roles fetched successfully",
        total: roles.length,
        data:roles,
    })
}catch(error){
return res.status(500).json({
    message: error.message
})
}
}

module.exports = {getAllRoles}