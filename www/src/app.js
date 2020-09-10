const preValidate = true;
var entries = [];
window.addEventListener('DOMContentLoaded', (event) => {
	_setup();
});

function _setup() {
	document.getElementById('entry').addEventListener('submit', formSubmit);
	if(preValidate)	{
		document.getElementById('entry-text').addEventListener('input', preCheckEntry);
		document.getElementById('entry-button').disabled = true;
	}
}

/**
 * Enables and disables button entry
 * Hides and shows warning message
 * @param {*} event 
 */
function preCheckEntry(event) {
	let input = event.target.value;
	if(isURLEntryValid(input)) {
		document.getElementById('entry-button').disabled = false;
		if(isURLSecure(input)) {
			document.getElementById('warning').classList.add('hide');
		} else {
			document.getElementById('warning').classList.remove('hide');
		}
	} else {
		document.getElementById('entry-button').disabled = true;
	}
}

/**
 * Check if URL is already shortened
 * @param {string} url 
 * @returns {boolean}
 */
function checkEntriesDuplicate(url) {
	//let entryTable = Array.from(document.getElementById('table-entries').children);
	//console.log(entryTable.some(entryTable => entryTable.children[0] === url));

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
	return !entries.some(entries => entries.url === url);
}

/**
 * Handle form submission
 * @param {*} event 
 */
function formSubmit(event) {
	event.preventDefault(); // Prevent form submission
	let text = event.target[0].value;
	if(checkEntriesDuplicate(text) && isURLEntryValid(text)) {
		addEntry(text);
		event.target.reset();
		if(preValidate) document.getElementById('entry-button').disabled = true;
		document.getElementById('warning').classList.add('hide');
	} else {
		alert('URL already shortened.');
	}
}

/**
 * Ensures short URL is unique before adding saving
 * @param {string} url 
 */
function addEntry(url) {
	let shortURL;
	do {
		shortURL = generateShortURL(4);
	} while (entries.some(entries => entries.shortURL === shortURL));

	let date = new Date(Date.now());
	let format = formatEntry(url, shortURL, date);
	document.getElementById('table-entries').appendChild(format);
	entries.push({url, shortURL});
}

/**
 * Handle HTML formatting of entry
 * @param {string} full 
 * @param {string} short 
 * @param {Date} time 
 * @returns {Document}
 */
function formatEntry(full, short, time) {
	// Full URL
	let c1 = document.createElement('td');
	c1.innerText = full;

	// Short URL
	let c2 = document.createElement('td');
	c2.setAttribute('data-short', short);
	c2.innerText = window.location.origin+'/'+short; // TODO href - don't assume we are in root web folder
	
	// Date
	let c3 = document.createElement('td');
	c3.setAttribute('datetime', time.toISOString());
	// Date format YYYY-MM-DD HH:MM:SS
	let month = (time.getMonth()+1).toString().padStart(2, 0); //getMonth 0-11
	let date = time.getDate().toString().padStart(2, 0);
	let hours = time.getHours().toString().padStart(2, 0);
	let minutes = time.getMinutes().toString().padStart(2, 0);
	let seconds = time.getSeconds().toString().padStart(2, 0);
	c3.innerText = time.getFullYear()+'-'+month+'-'+date+' '+hours+':'+minutes+':'+seconds;

	let tr = document.createElement('tr');
	tr.appendChild(c1);
	tr.appendChild(c2);
	tr.appendChild(c3);
	return tr;
}