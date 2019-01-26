function Events(){
	this.events = {};
	this._maxListeners = 10;
}

Events.prototype.setMaxListeners = function(num){
	this._maxListeners = num;
}

Events.prototype.on = Events.prototype.addListener = function(type,listener){
	if (this.events[type]) {
		this.events[type].push(listener);
	}else{
		this.events[type] = [listener];
	}
}

Events.prototype.once = function(type,listener){
	let wrap = (...rest)=>{
		listener.apply(this,rest);
		this.removeListener(type,wrap);
	}
	this.on(type,wrap)
}

Events.prototype.removeListener = function(type,listener){
	if (this.events[type]) {
		this.events[type] = this.events[type].filter( l => l != listener)
	}
}

Events.prototype.removeAllListeners = function(type){
	delete this.events[type];
}

Events.prototype.listeners = function(type){
	return this.events[type];
}

Events.prototype.emit = function(type,...rest){
	this.events[type] && this.events[type].forEach(item=>item.apply(this,rest));

	if (this._maxListeners != 0 && this.events[type].length > this._maxListeners) {
		console.error(`Possible EventEmitter memory leak detected. ${this.events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`)
	}
}


module.exports = Events;