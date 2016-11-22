var express = require('express')
var router = express.Router()
var fileUpload = require('express-fileupload')
var fs = require('fs')
var confs = require('../confs.js')
var files = require('../DB/File.js')

var folder_location = confs.folder_location
var bot = require('../telebot.js')

router.post('/', function(req, res, next) {
	var uploadFile;
	files.find({name: req.body.name}, function(err, file) {
		if(file != null && file != '' && file != {}) {
			res.send('The file with same name already exists! try another name.');
			return;
		} else if(!req.files) {
			res.send('No file specified!');
			return;
		} else if(req.body.name == '') {
			res.send('No file name!');
			return;
		} else if(req.body.password == '') {
			res.send('No password specified!');
			return;
		} else {
			uploadFile = req.files.file;
			uploadFile.mv(folder_location + req.body.name, function(err) {
				if(err) {
					res.status(500).send(err);
				}
				else {
					files.create({
						name: req.body.name,
						location: folder_location + req.body.name,
						uploader: req.body.uploader,
						date: new Date(),
						password: req.body.password
					}, function(err, file) {
						if(err) 
							handleError(err);
						else {
							bot(req.body.uploader, confs.link + '/files/' + req.body.name);
							res.redirect('files/');
						}
					})
				}
			})
		}
	})
})


router.get('/:name', function(req, res, next) {
	files.find({name: req.params.name}, function(err, file) {
		file.forEach(f => {
			f = f.toObject();
			if(file != null || file != {} || file != '') {
				fs.readFile(f.location, function(err, data) {
					if(data == null) {
						res.send('No file!');
					} else {
						res.set('Content-Disposition', 'attachment; filename="' + req.params.name + '"');
						res.send(data);
					}
				})
			}
		})
	})
})

router.get('/', function(req, res, next) {
	var html = '';
	var heading = '<tr>\n<th>File Name</th>\n<th>Uploader</th>\n<th>Date</th>\n<th>Delete</th>\n</tr>\n';
	files.find({}, function(err, file) {
		file.forEach(f => {
			f = f.toObject();
			html += '<tr>\n<td><a href="/files/' + f.name + '">' + f.name + '</a></td>\n<td>' + f.uploader + '</td>\n<td>' + f.date.toDateString() + '</td>\n';
			html += '<td><button class="btn btn-default" onclick="delete_file(\'' + f.name + '\')">Delete</button></td></tr>\n';
		})
	}).then(function(doc) {
		res.render('files', {contents: heading + html});
	})
	
	return;
})


router.delete('/:name', function(req, res, next) {
	files.find({name: req.params.name}, function(err, file) {
		var f = file[0].toObject();
		if(f.password == req.body.password) {
			fs.unlink(folder_location + req.params.name, function(err) {
				if(!err) {
					files.find({name: req.params.name}).remove(function(err) {
						if(!err){
							res.send('OK', 200);
						}
					})
				}
			})
		} else {
			res.render('Password does not match!');
		}
	}) 
})
module.exports = router
