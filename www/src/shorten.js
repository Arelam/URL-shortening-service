/**
 * Check if entered text is a valid URL
 * Allows both HTTP and HTTPS
 * @param {string} text 
 * @returns {boolean}
 */
function isURLEntryValid(text) {
	let ex = /^https?:\/\//;
	return text.match(ex);
}

/**
 * Check if URL is secure (HTTPS)
 * @param {string} url 
 * @returns {boolean}
 */
function isURLSecure(url) {
	let ex = /^https:\/\//;
	return url.match(ex);
}

/**
 * Returns string containing A-Z and a-z
 * https://jsdoc.app/tags-type.html#overview
 * @param {!number} stringLength 
 * @returns {string}
 */
function generateShortURL(stringLength) {
	let random = '';
	while(random.length<stringLength) {
		// https://asecuritysite.com/coding/asc2
		// 65(A)-122(z)=57 possible
		let s = Math.floor(Math.random()*57);
		let sChar = s+65
		if(sChar<91 || sChar>96) { // Avoid using special characters
			random += String.fromCharCode(sChar);
		}
	}
	return random;
}