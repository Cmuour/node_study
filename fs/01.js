let fs = require('fs');

// fs.open('./111.txt','r',0o666,function(err,fd){
//     if (err) console.log(err);
//     let buff = Buffer.alloc(3);
//     fs.readFileSync()
//     function read(){
//         fs.read(fd,buff,0,3,null,function(error,bytesRead){
//             if (error) console.log(error);
//             if (bytesRead == '0') {
//                 return;
//             }
//            console.log(buff);
//            read();
//         })
//     }
//     read();
// })



fs.open('./333.txt','r+',0o666,function(err,fd) {
    err && console.log(err);
    let buf1 = fs.readFileSync('./111.txt');
    let len = Buffer.byteLength(buf1);
    let index = 0;
    // function write(){
    //     fs.write(fd,buf1,index,3,null,function(error,byteswritten){
    //         index += 3;
    //         if (index == len) {
    //             return;
    //         }
    //         write();
    //     })
    // }
    // write();
    function write2(){
        fs.write(fd,buf1,index,3,index,function(error,byteswritten){
            error && console.log(error);
            index += 3;
            if(index === len) return;
            write2();
        })
    }
    write2()
})