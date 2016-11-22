var TelegramBot = require('node-telegram-bot-api')
var files = require('./DB/File.js')

var confs = require('./confs.js')

var link = confs.link
var bot = new TelegramBot(confs.token, {polling: true})

var chatIds = confs.chatIds
bot.onText(/\/upload/, function(msg, match) {
	bot.sendMessage(msg.chat.id, 'http://' + link + '/upload', {reply_to_message_id: msg.message_id})
})

bot.onText(/\/files/, function(msg, match) {
	var str = ''
	files.find({}, function(err, file) {
		file.forEach(f => {
			f = f.toObject();
			str += f.name + ' : http://' + link + '/files/' + f.name + '\n';
			str += 'Uploader : ' + f.uploader + '\n\n';
		})
	}).then(function(doc) {
		bot.sendMessage(msg.chat.id, '파일 목록: \n' + str, {reply_to_message_id: msg.message_id});
	})
})

bot.onText(/\/search_file (.+)/, function(msg, match) {
	var kwd = match[1];
	var str = ''
	
	files.find({name : {"$regex" : kwd, "$options" : "i"}}, function(err, file) {
		file.forEach(f => {
			f = f.toObject();
			str += f.name + ' : http://' + link + '/files/' + f.name + '\n';
			if(f.uploader != '' && f.uploader != null) {
				str += 'Uploader : @' + f.uploader + '\n\n';	
			} else {
				str += '\n';
			}
		})
	}).then(function(doc) {
		bot.sendMessage(msg.chat.id, '검색 결과 \n' + str, {reply_to_message_id: msg.message_id});
	})
})

bot.onText(/\/search_file/, function(msg, match) {
	bot.sendMessage(msg.chat.id, '검색 키워드와 함께 입력해주세요.',  {reply_to_message_id: msg.message_id});
})


var sendMessage = function(uploader, link) {
	chatIds.forEach(function(element, index, array) {
		if(uploader == '' || uploader == null) { 
			bot.sendMessage(element, '저장소에 파일이 업로드되었습니다.\n링크: http://' + link, {reply_to_message_id: msg.message_id});
		} else {
			bot.sendMessage(element, '@' + uploader + ' 님이 파일을 업로드 하였습니다.\n링크: http://' + link, {reply_to_message_id: msg.message_id});		
		}
	})
}

module.exports = sendMessage