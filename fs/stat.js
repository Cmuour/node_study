const fs = require('fs');
const path = require('path');

fs.readdir('./b',(err,files)=>{
    files.forEach(file=>{
        let dirAddress = path.join('b/' + file);
        fs.stat(dirAddress,(err,type)=>{
            console.log(type);
        });
    })
})