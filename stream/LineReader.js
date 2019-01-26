const fs = require('fs');
const EventEmitter = require('events');
const util = require('util');
const RETURN = 0x0A;
const NEW_LINE = 0x0D;

function LineReader(path){
    EventEmitter.call(this);
    this._reader = fs.createReadStream(path);
    this.on('newListener',(type,listener)=>{
        if(type == 'newLine') {
            let buffers = [];
            this._reader.on('readable',()=>{
                let char;   
                while (null != (char = this._reader.read(1))) {
                    switch (char[0]) {
                        case NEW_LINE:
                            this.emit('newLine',Buffer.from(buffers));
                            buffers.length = 0;
                            break;
                        case RETURN:
                            this.emit('newLine',Buffer.from(buffers));
                            buffers.length = 0;

                            let nChar = this._reader.read(1);
                            if(nChar[0] != NEW_LINE) {
                                buffers.push(nChar[0]);
                            }
                            break;
                        default:
                            buffers.push(char[0]);
                            break;
                    }
                }
            })
            this._reader.on('end',()=>{
                this.emit('newLine',Buffer.from(buffers));
                this.emit('end');
            })
        }
    })
}

util.inherits(LineReader,EventEmitter);

module.exports = LineReader;