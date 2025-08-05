/* user相关的路由 */
// 注册，登录，管理员

const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { register, login } = require('../controller/UserController');

const router = express.Router()

// 注册
router.post('/api/register', async (req, res) => {
    // body   body-parser
    // console.log(req.body);
    const { email, password } = req.body
    const pwd = await bcrypt.hash(password, 10)
    const user = await register({ email, password: pwd })
    // 把用户信息维护到数据库
    res.send(user)
})

// 登录
router.post('/api/login', async (req, res) => {
    // 用户是否存在
    const { email, password } = req.body
    const user = await login(email)

    // 用户不存在
    if (!user) {
        return res.status(404).send('user is not found')
    }

    // 密码是否正确
    const validPwd = await bcrypt.compare(password, user.password)
    // console.log(validPwd);

    // 密码错误
    if(!validPwd){
        return res.status(401).send('Invalid password')
    }    

    // 生成token字符串
    const token = jwt.sign({email,password},'token_userdb',{algorithm:'HS256',expiresIn:'30s'})

    // res.send('login')
    res.status(200).json({token})
})

// 非注册和登录接口都要携带token进行验证，验证通过才能访问接口
// 在请求头上设置 Authorization:Bearer "token字符串"
router.get('/admin',(req,res)=>{
    console.log(req.auth);
    res.send('welcome')
})

module.exports = router