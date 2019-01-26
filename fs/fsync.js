const fs = require('fs');

fs.open('./222.txt','w',0o666,(err,fd)=>{
    if (err) throw err;
    let buff = Buffer.from('廖家城');
    console.log(buff);
    fs.write(fd,buff,0,3,0,(error,byteswritten)=>{
        fs.fsync(fd,()=>{
            fs.close(fd,()=>{
                console.log('关闭成功');
            })
        })
    })

})

