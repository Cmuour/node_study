const fs = require('fs');
const BUUFER_SIZE = 3;
function copy(src,target){
    fs.open(src,'r',0o666,function(err,readFd){
        fs.open(target,'w',0o666,function(error,writeFd){
            let buff = Buffer.alloc(BUUFER_SIZE);
            !function next(){
                fs.read(readFd,buff,0,BUUFER_SIZE,null,function(err,bytesRead){
                    err && console.log(err);
                    if (bytesRead > 0) {
                        fs.write(writeFd,buff,0,BUUFER_SIZE,null,next)
                    }// }else{
                    //     fs.fsync.call(that,writeFd,function(err){
                    //         fs.close.call(that,function(){
                    //             console.log('关闭');
                    //         })
                    //     })
                    // }
                })
            }();
        })
    })
}

copy('./111.txt','./222.txt');