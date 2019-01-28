const fs = require('fs');
const EventEmitter = require('events');

class Pause extends EventEmitter{
    constructor(path,options){
        super(path,options);
        this.path = path;
        this.encoding = options.encoding;
        this.flags = options.flags || 'r';
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.mode = options.mode || 0o666;
        this.autoClose = true;
        this.pos = this.start = options.start || 0;
        this.buffer = Buffer.alloc(this.highWaterMark);
        this.buffers = [];  // 缓存区
        this.length = 0;
        this.end = options.end;
        this.flowing = null;
        this.open();
        this.on('newListener',(type,listener)=>{
            if(type == 'readable') {

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
            this.read(0);
        })
    }
    read(n){
        let ret = Buffer.alloc(n);
        let buff;
        if( 0 < n < this.length ) {
            let index = 0,b;
            while(null != (b = this.buffers.shift())){
                console.log(b);
                for(let i = 0; i < b.length; i++) {
                    ret[index++] = b[i];
                    if(index == n) {    // 填充完毕
                        buff = b.slice(index);
                        this.buffers.unshift(buff);
                        this.length -= n;
                        break;
                    }
                }
            }
        }
        if(this.length < this.highWaterMark) {
            fs.read(this.fd,this.buffer,0,this.highWaterMark,null,(err,bytesRead)=>{
                if(err) {
                    if(this.autoClose){
                        this._destroy();
                        return this.emit('error',err);
                    }
                }
                if(bytesRead){
                    let b = this.buffer.slice(0,bytesRead);
                    this.buffers.push(b);
                    this.length += bytesRead;
                    this.emit('readable');
                }else{
                    this.emit('end');
                }
            })
        }
        return this.encoding?ret.toString():ret;
    }
    _destroy(){
        fs.close(this.fd,()=>{
            this.emit('close');
        })
    }
}

module.exports = Pause;