let fs = require('fs');

let rs = fs.createReadStream('./a.txt',{
    flags:'r',
    encoding:'utf8',
    highWaterMark:60
});
rs.on('open',function(){
    console.log('打开文件');
})
rs.on('data',function(data){
    console.log(data);
})
rs.on('end',function(){
    console.log('结束');
})
rs.on('close',function(){
    console.log('关闭成功');
})
