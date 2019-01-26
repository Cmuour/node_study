const fs = require('fs');

let rs = fs.createReadStream('./1.txt',{
    highWaterMark:3
});

rs.on('readable',()=>{
    let ch = rs.read(1);
    console.log(ch);
    setTimeout(()=>{
        console.log(rs._readableState.length);
    },200)
})
