var TelegramBot = require('node-telegram-bot-api')
var files = require('./DB/File.js')

var confs = require('./confs.js')

var link = confs.link
var bot = new TelegramBot(confs.token, {polling: true})

var chatIds = confs.chatIds
bot.onText(/\/upload/, function(msg, match) {
	bot.sendMessage(msg.chat.id, 'http://' + link + '/upload')
})

bot.onText(/\/files/, function(msg, match) {
	var str = ''
	files.find({}, function(err, file) {
		file.forEach(f => function() {
			f = f.toObject();
			str += f.name + ' : http://' + link + '/files/' + f.name + '\n';
			str += 'Uploader : ' + f.uploader + '\n\n';
		})
	}).then(function(doc) {
		if(str == '') {
			bot.sendMessage(msg.chat.id, '파일이 없습니다. ');
		} else {
			bot.sendMessage(msg.chat.id, '파일 목록: \n' + str);
		}
	})
})

bot.onText(/\/search (.+)/, function(msg, match) {
	var kwd = match[1];
	var str = ''
	files.find({name : kwd}, function(err, file) {
		file.forEach(f => function() {
			f = f.toObject();
			str += f.name + ' : http://' + link + '/files/' + f.name + '\n';
			str += 'Uploader : ' + f.uploader + '\n\n';
		})
	}).then(function(doc) {
		if(str == '') {
			bot.sendMessage(msg.chat.id, '검색 결과가 없습니다. ');
		} else {
			bot.sendMessage(msg.chat.id, '검색 결과: \n' + str);
		}
	})
})
var sendMessage = function(uploader, link) {
	chatIds.forEach(function(element, index, array) {
		if(uploader == '' || uploader == null) { 
			bot.sendMessage(element, '저장소에 파일이 업로드되었습니다.\n링크: http://' + link);
		} else {
			bot.sendMessage(element, '@' + uploader + ' 님이 파일을 업로드 하였습니다.\n링크: http://' + link);		
		}
	})
}

module.exports = sendMessage