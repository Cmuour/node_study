const EventEmitter = require('events');
const fs = require('fs');

class ReadStream extends EventEmitter{
    constructor(path,options){
        super(path,options);
        this.path = path;
        this.encoding = options.encoding;
        this.flags = options.flags || 'r';
        this.mode = options.mode || 0o666;
        this.autoClose = options.autoClose || true;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.pos = this.start = options.start || 0;
        this.buffer = Buffer.alloc(this.highWaterMark);
        this.end = options.end;
        this.flowing = null;
        this.open();
        this.on('newListener',(type,listener)=>{
            if(type == 'data'){
                this.flowing = true;
                this.read();
            }
        })
    }
    open(){
        fs.open(this.path,this.flags,this.mode,(err,fd)=>{
            if(err) {
                if(this.autoClose){
                    this._destroy();
                    return this.emit('error',err);
                }
            }
            this.fd = fd;
            this.emit('open');
        })
    }
    read(){
        if(typeof this.fd != 'number') {
            return this.once('open',()=> this.read());
        }
        let howMuchToRead = this.end?Math.min(this.end - this.pos + 1,this.highWaterMark ):this.highWaterMark;

        fs.read(this.fd,this.buffer,0,howMuchToRead,this.pos,(err,bytes)=>{
            if(err) {
                if(this.autoClose) {
                    this._destroy();
                    return this.emit('error',err);
                }
            }
            if(bytes){
                let data = this.buffer.slice(0,bytes);
                data = this.encoding?data.toString(this.encoding):data;
                this.pos += bytes;
                this.emit('data',data);
                if(this.end && this.pos > this.end) {
                    return this.endFn();
                }else{
                    if(this.flowing) this.read();
                }
            }else{
                return this.endFn();
            }
        })
    }
    _destroy(){
        fs.close(this.fd,()=>{
            this.emit('close');
        })
    }
    endFn(){
        this.emit('end');
        this._destroy();
    }
    pipe(dest){
        this.on('data',data=>{
            let flag = dest.write(data+'');
            if(!flag){
                this.pause();
            }
        })
        dest.on('drain',()=>{
            this.resume();
        })
    }
    pause(){
        this.flowing = false;
    }
    resume(){
        this.flowing = true;
        this.read();
    }
}

module.exports = ReadStream;