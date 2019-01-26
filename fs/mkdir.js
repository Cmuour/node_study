const fs = require('fs');

function recursiveMkdir(dir){
    let arr = dir.split('/');
    let len = arr.length;
    !function mkdir(index){
        if(index === len+1) return;
        let newArr = arr.slice(0,index).join('/');
        fs.access('./'+newArr,fs.constants.R_OK,(err)=>{
            if (err) {
                fs.mkdir(err.path,0o666,mkdir.bind(null,index+1))
            }else{
                mkdir(index+1);
            }
        })
    }(1)
}
recursiveMkdir('a/b/c')