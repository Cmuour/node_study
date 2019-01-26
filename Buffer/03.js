
let buf2 = Buffer.from('廖');
console.log(0xe5bb96.toString(2));

let buf1 = Buffer.from('廖');
console.log(buf1);
console.log(0xe5.toString(8));
console.log(01000.toString());

let buf3 = Buffer.from('廖');
let buf4 = Buffer.from('家');
let arr1 = [buf3,buf4];
console.log(arr1.sort(Buffer.compare));

console.log(buf3[0]);

let buf5 = Buffer.from('buffer');
console.log(buf5);
buf5[0] = 0x61;
console.log(buf5);
console.log(buf5[0].toString(2).padStart(8,'0'));
console.log((81).toString(8));
console.log(Buffer.isEncoding('ascii'));


const buf6 = Buffer.from('ABC');
const buf7 = Buffer.from('BCD');
const buf8 = Buffer.from('ABCD');

console.log(buf6.compare(buf8));

const str1 = 'http://nodejs.cn/';
console.log(str1.charCodeAt(str1[1]));

let buf9 = Buffer.from('t');
console.log((104).toString(2));
console.log(buf9.toString());
console.log(buf9);
console.log(str1.charCodeAt('t'));