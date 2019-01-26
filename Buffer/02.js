function concat(item,total = item.reduce((init,val)=>{return init + val.length},0)){
	if (item.length == 1) {
		return item[0];
	}
	let result = Buffer.alloc(total);
	for (let buf of item) {
		
	}
}
