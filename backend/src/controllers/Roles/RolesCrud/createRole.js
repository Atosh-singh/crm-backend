const {Role} = require('../../../models/Role');

const createRole = async(req, res) =>{
try{
    const {name, permissions, isActive} = require.body;

    if(!name){
        return res.status(400).json({
            message:"Role name is required!"
        })
    }

    const roleExist = await Role.findOne({name: name.toLowerCase()});
    if(roleExist) {
        return res.status(400). json({
            message:"Role already exists"
        })
    }

    const newRole = await Role.create({
        name:name.toLowerCase(),
        permissions:permissions || [],
        isActive:isActive?? true,
    });

    return res.status(201).json({
   message: "✅ Role created successfully",
   data: newRole,
    })

}catch(error){
    return res.status(500).json({message: error.message});
}
}

module.exports = {createRole}