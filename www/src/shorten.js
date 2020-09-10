/** Check if entry is a valid URL
 * HTTP and HTTPS allowed.
 */
function isURLEntryValid(text) {
	let ex = /^https?:\/\//;
	return text.match(ex);
}

function isURLSecure(url) {
	let ex = /^https:\/\//;
	return url.match(ex);
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