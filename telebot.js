var TelegramBot = require('node-telegram-bot-api')
var confs = require('./confs.js')

var link = confs.link
var bot = new TelegramBot(confs.token, {polling: true})

var chatIds = confs.chatIds
bot.onText(/\/upload/, function(msg, match) {
	bot.sendMessage(msg.chatId, 'http://' + link + 'upload')
})

bot.onText(/\/files/, function(msg, match) {
	bot.sendMessage(msg.chatId, 'http://' + link + 'files')
})


var sendMessage = function(uploader, link) {
	chatIds.forEach(function(element, index, array) {
		if(uploader == '' || uploader == null) { 
			bot.sendMessage(element, '저장소에 파일이 업로드되었습니다.\n링크: http://' + link);
		} else {
			bot.sendMessage(element, '@' + uploader + ' 님이 파일을 전송하셨습니다.\n링크: ' + link);		
		}
	})
}

module.exports = sendMessage