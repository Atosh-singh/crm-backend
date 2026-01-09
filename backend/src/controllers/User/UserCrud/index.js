const {createUser} = require('./createUser');
const {getAllUsers} = require('./getAllUsers') ;
const {getSingleUser} = require('./getSingleUser');
const {updateUser} = require('./updateUser');
const {deleteUser} = require('./deleteUser');

module.exports = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}