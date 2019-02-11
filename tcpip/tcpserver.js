let net = require('net');

let server = net.createServer(function(socket){
    console.log('客户端已经连接');
    console.log(socket.address());
    socket.on('data',function(data){
        console.log('接收到客户端发过来的数据：',data);
    })
})

server.listen(5050,function(){
    console.log(server.address());
    console.log('服务器启动成功');
})