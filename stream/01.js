
let reader = require('./LineReader');

let line = new reader('./1.txt');

line.on('newLine',(data)=>{
    console.log(data);
})

line.emit('newLine');
