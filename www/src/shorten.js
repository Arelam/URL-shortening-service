/** Check if entry is a valid URL
 * HTTP and HTTPS allowed.
 */
function checkURLEntryValid(text) {
	let ex = /^https?:\/\//;
	return text.match(ex);
}

function isURLSecure(url) {
	let ex = /^https:\/\//;
	return url.match(ex);
}

function checkURLEntriesDuplicate(url) {
	//let entryTable = Array.from(document.getElementById('table-entries').children);
	//console.log(entryTable.some(entryTable => entryTable.children[0] === url));

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
	return !entries.some(entries => entries.url === url);
}

function generateShortURL(stringLength) {
	let random = '';
	while(random.length<stringLength) {
		// https://asecuritysite.com/coding/asc2
		// 65(A)-122(z)=57 possible
		let s = Math.floor(Math.random()*57);
		let sChar = s+65
		if(sChar<91 || sChar>96) {
			random += String.fromCharCode(sChar);
		}
	}
	return random;
}