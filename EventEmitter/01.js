let EventEmitter = require('./events');
let util = require('util');

function Bell(){
	EventEmitter.call(this);
}


// Object.setPrototypeOf(Bell.prototype,EventEmitter.prototype)
// Bell.prototype.__proto__ = EventEmitter.prototype
util.inherits(Bell,EventEmitter);

let bell = new Bell();

bell.on('one',function(str1,str2){
	console.log(`hahaha${str1} ${str2}`);
})
bell.on('one',function(str1,str2){
	console.log(`hello world ${str1} ${str2}`);
})
bell.on('one',function(str1,str2){
	console.log(`hello world ${str1} ${str2}`);
})
bell.on('one',function(str1,str2){
	console.log(`hello world ${str1} ${str2}`);
})
bell.on('one',function(str1,str2){
	console.log(`hello world ${str1} ${str2}`);
})
bell.on('one',function(str1,str2){
	console.log(`hello world ${str1} ${str2}`);
})
bell.on('one',function(str1,str2){
	console.log(`hello world ${str1} ${str2}`);
})
bell.on('one',function(str1,str2){
	console.log(`hello world ${str1} ${str2}`);
})
bell.on('one',function(str1,str2){
	console.log(`hello world ${str1} ${str2}`);
})
bell.on('one',function(str1,str2){
	console.log(`hello world ${str1} ${str2}`);
})
bell.on('one',function(str1,str2){
	console.log(`hello world ${str1} ${str2}`);
})
bell.once('one',function(str1,str2){
	console.log(`我只执行一次${str1} ${str2}`);
})

bell.emit('one','111','222');
bell.emit('one','111','222');
