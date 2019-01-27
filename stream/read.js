let fs = require('fs');
let ReadStream = require('./readStream');
let rs = new ReadStream('./1.txt',{
    flags:'r',
    mode:0o666,
    encoding:'utf8',
    start:3,
    end:7, // 包括结束
    autoClose:true,
    highWaterMark:3
})

rs.on('open',()=>{
    console.log('打开文件')
})
rs.on('data',function(data){
    console.log(data);
})
rs.on('end',function(){
    console.log('迭代完成');
})
rs.on('close',()=>{
    console.log('关闭文件')
})