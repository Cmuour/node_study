let fs = require('fs');
let WriteStream = require('./writeStream');
let ws = new WriteStream('3.txt',{
    flags:'w',
    encoding:'utf8',
    mode:0o666,
    start:0,
    autoClose:true, // 当流写完之后自动关闭
    highWaterMark:3
});
let n = 9;

ws.on('error',(err)=>{
    console.log(err);
})

function write(){
    let flag = true
    while(flag && n>0) {
        flag = ws.write(n+'');
        n--;
        console.log(flag);
    }
    ws.once('drain',()=>{
        console.log('drain');
        write();
    })
}
write();