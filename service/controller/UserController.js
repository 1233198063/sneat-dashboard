/* Database CRUD operations */

const UserModel = require('../model/User')

// Register
exports.register =async (data)=>{
    // console.log(data);
    try {
      return await UserModel.create(data)
    } catch (error) {
        console.log(error);
    }
}

// Login
exports.login =async (email)=>{
    try {
        return await UserModel.findOne({email})
    } catch (error) {
        console.log(error);
    }
}
