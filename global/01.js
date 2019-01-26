// 这两个相同
console.log(1);
console.info(1);

// 这两个相同
console.error(2);
console.warn(2);


console.log(process.cwd());	// 返回当前目录
process.chdir('..');	// 改变当前目录
console.log(process.cwd());


console.log(process.memoryUsage());
/*
	{ rss: 20365312,		常驻内存
	  heapTotal: 6066176,	堆内存的总申请量
	  heapUsed: 3809280,	已经使用的量
	  external: 8680 }		外部内存的使用量
*/

console.log(global);

console.log(process.cwd());

console.log(process.nextTick())

	
