/* 对数据库进行增删改查 */

const UserModel = require('../model/User')

// 注册
exports.register =async (data)=>{
    // console.log(data);
    try {
      return await UserModel.create(data)
    } catch (error) {
        console.log(error);
    }
}

// 登录
exports.login =async (email)=>{
    try {
        return await UserModel.findOne({email})
    } catch (error) {
        console.log(error);
    }
}
