var express = require('express')
var router = express.Router()
var fileUpload = require('express-fileupload')
var fs = require('fs')

var files = require('../DB/File.js')

router.get('/', function(req, res, next) {
	res.render('upload', {});
})

module.exports = router