/* User-related routes */
// Registration, login, admin

const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { register, login } = require('../controller/UserController');

const router = express.Router()

// Register
router.post('/api/register', async (req, res) => {
    // body   body-parser
    // console.log(req.body);
    const { email, password } = req.body
    const pwd = await bcrypt.hash(password, 10)
    const user = await register({ email, password: pwd })
    // Save user information to database
    res.send(user)
})

// Login
router.post('/api/login', async (req, res) => {
    // Check if user exists
    const { email, password } = req.body
    const user = await login(email)

    // User does not exist
    if (!user) {
        return res.status(404).send('user is not found')
    }

    // Check if password is correct
    const validPwd = await bcrypt.compare(password, user.password)
    // console.log(validPwd);

    // Password incorrect
    if(!validPwd){
        return res.status(401).send('Invalid password')
    }    

    // Generate token string
    const token = jwt.sign({email,password},'token_userdb',{algorithm:'HS256',expiresIn:'30s'})

    // res.send('login')
    res.status(200).json({token})
})

// All non-registration and non-login endpoints require token verification
// Set Authorization:Bearer "token string" in request headers
router.get('/admin',(req,res)=>{
    console.log(req.auth);
    res.send('welcome')
})

module.exports = router