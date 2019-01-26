const fs = require('fs');
const EventEmitter = require('events');

class WriteStream extends EventEmitter{
    constructor(path,options){
        super(path,options);
        this.path = path;
        this.flags = options.flags || true;
        this.encoding = options.encoding || 'utf8';
        this.autoClose = options.autoClose;
        this.mode = options.mode || 0o666;
        this.start = options.start || 0;
        this.buffers = [];
        this.pos = this.start; // 文件写入的索引
        this.highWaterMark = options.highWaterMark || 16 * 1024;
        this.writing = false; // 表示内部正在写入数据
        this.length = 0; // 表示缓存区字节的长度

        this.open();
    }
    open(){
        fs.open(this.path,this.flags,this.mode,(err,fd)=>{
            if (err) {
                if(this.autoClose) {
                    this._destroy(); // 销毁流
                }
                this.emit('error',err);
            }
            this.fd = fd;
            this.emit('open');
        })
    }
    write(chunk,encoding,cb){
        chunk = Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk,this.encofing);
        let len = chunk.length;
        // 缓存区的长度加上当前写入的长度
        this.length += len;
        // 判断当前最新的缓存区是否小于最高水平线highWaterMark
        let ret = this.length < this.highWaterMark;
        if(this.writing){ // 表示正在向底层写数据，则当前数据必须放在缓存区里
            this.buffers.push({
                chunk,encoding,cb
            })
        }else{ // 直接调用底层的方法进行写入
            this.writing = true;
            this._write(chunk,encoding,()=>this.cliearBuffer());
        }
        return ret;
    }
    cliearBuffer(){
        // 取出缓存区中的第一个buffer
        let data = this.buffers.shift();
        if(data){
            this._write(data.chunk,data.encoding,()=>this.cliearBuffer())
        }else{
            this.writing = false;
            // 缓存区清空
            this.emit('drain')
        }
    }
    _write(chunk,encoding,cb){
        if(typeof this.fd != 'number') {
            return this.once('open',()=>this._write(chunk,encoding,cb));
        }
        fs.write(this.fd,chunk,0,chunk.length,this.pos,(err,bytesWritten)=>{
            if(err) {
                this._destroy();
                this.emit('error',err);
            }
            this.pos += bytesWritten; // 移动写入的指针
            this.length -= bytesWritten; // 写入多少字节，缓存区就减少多少字节
            cb && cb();
        })
    }
    _destroy(){
        fs.close(this.fd,()=>{
            this.emit('close');
        })
    }
}

module.exports = WriteStream;