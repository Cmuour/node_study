let buf1 = Buffer.from('廖');
let buf2 = Buffer.from('家');
let buf3 = Buffer.from('城');

Buffer.concat2 = function(arr,total){
    if(arr.length == 1) return arr[0];

    (total == undefined) && (total = arr.reduce((init,val)=>{ return init + val.length },0));

    let  i = 0, buflen = Buffer.alloc(total);

    for (let buf of arr) {
        for (let b of buf) {
            if ( i > total ) {
                return buflen;
            }else{
                buflen[i++] = b;
            }
        }
    }
    return buflen;
}

let newbuf = Buffer.concat2([buf1,buf2,buf3]);
console.log(newbuf.toString());
console.log(Buffer.isBuffer(newbuf));
console.log(Buffer.poolSize);