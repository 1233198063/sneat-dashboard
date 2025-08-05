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

// Path for saving uploaded images
const fullPath = path.join(__dirname, '/static')
console.log(fullPath);

// Create document schema object
const imageSchema = new mongoose.Schema({
    fieldname: String,
    filename: String,
    size: Number,
    mimetype: String
})

// Create document model object
const imageModel = mongoose.model('image', imageSchema)

// Configure storage location and filename
const storage = multer.diskStorage({
    // Storage location
    destination: function (req, file, cb) {
        cb(null, fullPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) 
    }
})

// Create file object
const fileUpload = multer({ storage })

// 1. Upload single image
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

// 2. Upload multiple images
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

// Configure static resource directory

app.listen('8080', () => {
    console.log('server is running');
})