var entries = [];
window.addEventListener('DOMContentLoaded', (event) => {
	_setup();
});

function _setup() {
	document.getElementById('entry').addEventListener('submit', formSubmit);
}

function formSubmit(event) {
	event.preventDefault(); // Prevent form submission
	let text = event.target[0].value;
	if(checkURLEntriesDuplicate(text) && checkURLEntryValid(text)) {
		addEntry(text);
	}
}

/** Check if entry is a valid URL
 * HTTP and HTTPS allowed.
 */
function checkURLEntryValid(text) {
	let ex = /^https?:\/\//;
	return text.match(ex);
}

function checkURLEntriesDuplicate(url) {
	//let entryTable = Array.from(document.getElementById('table-entries').children);
	//console.log(entryTable.some(entryTable => entryTable.children[0] === url));
	return !entries.some(entries => entries.url === url);
}

function addEntry(url) {
	let shortURL = generateShortURL(4);
	let format = formatEntry(url, shortURL);
	document.getElementById('table-entries').appendChild(format);
	entries.push({url, shortURL});
}

function formatEntry(full, short) {
	let time = new Date(Date.now()).toISOString(); // TODO fix format
	let tr = document.createElement('tr');
	let c1 = document.createElement('td');
	c1.innerText = full;
	let c2 = document.createElement('td');
	c2.setAttribute('data-short', short);
	c2.innerText = window.location.origin+'/'+short; // TODO href and select everything until last folder
	let c3 = document.createElement('td');
	c3.innerText = time;
	tr.appendChild(c1);
	tr.appendChild(c2);
	tr.appendChild(c3);
	return tr;
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