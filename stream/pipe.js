const ReadStream = require('./readStream');
const WriteStream = require('./writeStream');

let rs = new ReadStream('./1.txt',{
    start:5,
    end:8,
    highWaterMark:3
})

let ws = new WriteStream('./2.txt',{
    highWaterMark:3
})

rs.pipe(ws);