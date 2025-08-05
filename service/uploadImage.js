const express = require('express')

const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const router = express.Router()

mongoose.connect('mongodb+srv://demo0618:demo0618@cluster0.riqhps6.mongodb.net/userdb?retryWrites=true&w=majority&appName=Cluster0')

const app = express()

mongoose.connection.on('open', () => {
    console.log('Connected successful');
})

// 上传图片保存的路径
const fullPath = path.join(__dirname, '/static')
console.log(fullPath);

// 创建文档结构对象
const imageSchema = new mongoose.Schema({
    fieldname: String,
    filename: String,
    size: Number,
    mimetype: String
})

// 创建文档模型对象
const imageModel = mongoose.model('image', imageSchema)

// 配置存储位置,存储的文件名
const storage = multer.diskStorage({
    // 存储位置
    destination: function (req, file, cb) {
        cb(null, fullPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) 
    }
})

// 创建文件对象
const fileUpload = multer({ storage })

// 1 上传单张图片
router.post('/upload', fileUpload.single('image'), async (req, res) => {
    // console.log(req.file);
    try {
        await imageModel.create(req.file)
        console.log('success');
    } catch (error) {
        console.log('failed');
    }
    res.send('upload~~')
})

// 2 上传多张
router.post('/uploadImage', fileUpload.array('image',3), async (req, res) => {
    // console.log(req.file);
    try {
        await imageModel.create(req.files)
        console.log('success');
    } catch (error) {
        console.log('failed');
    }
    res.send('upload~~')
})

// app.use(express.static(__dirname + '/static'))

app.use(router)

// 配置静态资源目录

app.listen('8080', () => {
    console.log('server is running');
})