let fs = require('fs');
let Pause = require('./pause1');
let rs = new Pause('./1.txt',{
    encoding:'utf8',
    highWaterMark:3
})

rs.on('readable',()=>{
    let char = rs.read(1);
    console.log(char);
})