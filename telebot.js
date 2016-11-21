var TelegramBot = require('node-telegram-bot-api')

var token = 'YOUR_BOT_TOKEN'
var link = 'YOUR_LINK'
var bot = new TelegramBot(token, {polling: true})

var chatIds = []
bot.onText(/\/upload/, function(msg, match) {
	bot.sendMessage(msg.chatId, )
})


var sendMessage = function(uploader, link) {
	chatIds.forEach(chatId => function() {
		if(uploader == '' || uploader == null) { 
			bot.sendMessage(chatId, '저장소에 파일이 업로드되었습니다.\n링크: http://' + link);
		} else {
			bot.sendMessage(chatId, '@' + uploader + ' 님이 파일을 전송하셨습니다.\n링크: ' + link);		
		}
	})
}

module.exports = sendMessage