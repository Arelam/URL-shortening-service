window.addEventListener('DOMContentLoaded', (event) => {
	_setup();
});

function _setup() {
	document.getElementById('entry').addEventListener('submit', formSubmit);
}

function formSubmit(event) {
	event.preventDefault(); // Prevent form submission
	let text = event.target[0].value;
	if(checkURLEntries(text) && checkURLEntryValid(text)) {
		addEntry(text);
		console.log('valid');
	}
	console.log('test');
}

/** Check if entry is a valid URL
 * HTTP and HTTPS allowed.
 */
function checkURLEntryValid(text) {
	let ex = /^https?:\/\//;
	return text.match(ex);
}

function checkURLEntries(url) {return true;}

function addEntry(url) {
	let shortURL = generateShortURL(4);
	let format = formatEntry(url, shortURL);
	document.getElementById('table-entries').appendChild(format);
}

function formatEntry(full, short) {
	//let 
}

function generateShortURL(stringLength) {
	
}