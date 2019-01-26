const fs = require('fs');
const path = require('path');

// fs.unlink() 删除文件
// fs.rmdir() 删除文件夹  非空文件夹删除不了
// fs.readdir() 获取该目录下的所有文件
// fs.readdir('./a',function(err,chunk) {
//     console.log(chunk);
// })

// function recursiveRmdir(dir) {
//     let targetDir = __dirname + '\\' + dir;
//     let stat = fs.lstatSync(targetDir);
//     // 如果要删除的不是一个文件夹 则进入if语句 直接删除文件，然后return
//     if (!stat.isDirectory()) {
//         fs.unlink(targetDir,(err)=>{
//             if (err) throw err;
//         });
//         return;
//     }
//     // 如果是一个文件夹 判断是否是一个空文件夹 如果是空文件夹则直接删除
//     let direct = fs.readdirSync(targetDir);
//     if (direct.length === 0) {
//         fs.rmdir(targetDir,(err)=>{});
//         return;
//     }

//     // 如果不是一个空文件夹  则使用递归函数把文件夹里的文件都删除
    
//     !function next(dirAddress,chunk){
//         for(let i = 0; i < chunk.length; i++ ) {
//             let file = dirAddress + '\\' +chunk[i]; // 文件路径
//             let fileType = fs.lstatSync(file);
//             let flag = fileType.isDirectory();  // 判断文件是否是一个文件夹

//             if (flag === false) {
//                 fs.unlink(file, (err)=>{ if (err) throw err; });
//             }else{
//                 let direct = fs.readdirSync(file);  // 判断文件里头是否有文件
//                 if(direct.length === 0) {
//                     fs.rmdir(file,(err)=>{ if(err) throw err; });
//                 }
//                 next(file,direct);
//             }
//         }
//         fs.rmdir(dirAddress,(err)=>{ if(err) throw err; });
//     }(targetDir,direct);
    
// }

// recursiveRmdir('a');



function recursiveRmdir(dir,callback) {
    // let stat = fs.lstatSync(targetDir);
    // // 如果要删除的不是一个文件夹 则进入if语句 直接删除文件，然后return
    // if (!stat.isDirectory()) {
    //     fs.unlink(targetDir,(err)=>{
    //         if (err) throw err;
    //     });
    //     return;
    // }
    // // 如果是一个文件夹 判断是否是一个空文件夹 如果是空文件夹则直接删除
    // let direct = fs.readdirSync(targetDir);
    // if (direct.length === 0) {
    //     fs.rmdir(targetDir,(err)=>{});
    //     return;
    // }

    // 如果不是一个空文件夹  则使用递归函数把文件夹里的文件都删除
    fs.readdir(dir,(err,chunk)=>{
        !function next(index){
            if (index >= chunk.length) return callback();
            let fileAddress = path.join(dir,chunk[index]);
            fs.stat(fileAddress,(err,stat)=>{
                if (stat.isDirectory()){
                    console.log(fileAddress);
                    recursiveRmdir(fileAddress,()=>next(index+1));
                }else{
                    fs.unlink(fileAddress,(err)=>{ if(err) throw err; })
                    next(index+1);
                }
               
            })
           
        }(0);
    })
    // fs.rmdir('./'+dir,(err)=>{ if(err) throw err; })
}

recursiveRmdir('b',()=>{ console.log('迭代完毕') });