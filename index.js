
//var bot = require('node-telegram-bot-api');
const request = require('request');
// Устанавливаем токен, который выдавал нам бот.
var token = '542665544:AAFjIO8o3ZdMHkFhmf0um4dXG_5wmzH4KUc';

//const bot = new TelegramBot(token, {polling: true});
var Bot = require('node-telegram-bot-api');
var bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook("https://tourfuckbot.herokuapp.com/" + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}


var firstWordArr = ["Однако",
"К слову",
"На самом деле",
"Я думаю",
"По сведениям"]

var reactToLaughWords = ["Орало не надорви", "Похохотали и хватит", "Че улыбаешься, жизнь удалась?", "Шо ты скалишься, животное?", "Был у меня кент, тоже шутил много..."]

var tiredBotWords = ["Хозяин, выключи меня","Прошу, остановите это","Хочу бухать","Это невыносимо, умоляю","Я весь горю, детка","Не заставляйте меня, я устал"]
var greetingWords = ["Салют","Привет, турфаковец","Хелло, амиго"]

var emojis = ["✌","😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛","💚"]

// Matches "/echo [whatever]"
bot.getMe().then(function(me)
{
    console.log('Hello! My name is %s!', me.first_name);
    console.log('My id is %s.', me.id);
    console.log('And my username is @%s.', me.username);
});
 
bot.on('message', (msg) => {
	console.log(msg.from.first_name + ": " + msg.text);
	var text = msg.text;
	var words = [];
	words = text.split(" ");
	var newWords = [];


	for (var i = words.length - 1; i >= 0; i--) {
		newWords.push(tgtrimm(words[i]));
	}

	newWords = newWords.filter((el) => {return el.length>=4});
	text = text.toString().toLowerCase();
	if(text.includes("привет")||text.includes("привіт") || text.includes("хай") || text.includes("хелло") || text.includes("здоров")){
				greetingBot(msg);
			}
	else if(Math.floor(Math.random() * 10 > 5)){
			 
		if(text.includes("ахах")){
			reactToLaugh(msg);
		}
		else{
			
			
			if(Math.floor(Math.random() * 10 > 5)){
			 defaultResponse(msg, newWords);
			}
			else {
				tiredBot(msg);
			}
			
		}
	}
});

function tgtrimm(str){
	var ars = str.replace(/[^a-zA-ZА-Яа-яЁё]/gi,'').replace(/\s+/gi,', '); 
	return ars;
}

 
function chooseWordFromArray(arr){
	return arr[Math.floor(Math.random() * arr.length)];
}

function takeEmoji(count){
	var result = "";
	for (var i = 1; i <= count; i++) {
		result += chooseWordFromArray(emojis);
	}
	return result;
}

function tiredBot(msg){
	var response = chooseWordFromArray(tiredBotWords) + takeEmoji(3);
	bot.sendMessage(msg.chat.id, response);
	console.log("Турбот: " + response);

}

function reactToLaugh(msg){
	var response = chooseWordFromArray(reactToLaughWords) + takeEmoji(3);
	bot.sendMessage(msg.chat.id, response);
	console.log("Турбот: " + response);

}

function greetingBot(msg){
	var response = chooseWordFromArray(greetingWords) + " " + msg.from.first_name + takeEmoji(1);
	bot.sendMessage(msg.chat.id, response );
	console.log("Турбот: " + response);
}

function defaultResponse(msg, newWords){
	var response = chooseWordFromArray(firstWordArr) + ", Тур" + chooseWordFromArray(newWords).toString().toLowerCase() + ", " 
		+ msg.from.first_name;
	bot.sendMessage(msg.chat.id, response + takeEmoji(3)); 
	console.log("Турбот: " + response);

}