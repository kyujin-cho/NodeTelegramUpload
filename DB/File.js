var mongoose = require('mongoose')
var Schema = mongoose.Schema

var File = new Schema({
	name: String,
	location: String,
	uploader: String,
	date: {type: Date, default: Date.now},
	password: String
})

module.exports = mongoose.model('File', File)