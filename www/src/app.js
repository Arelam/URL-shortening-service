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

function preCheckEntry(event) {
	let input = event.target.value;
	if(checkURLEntryValid(input)) {
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

function formSubmit(event) {
	event.preventDefault(); // Prevent form submission
	let text = event.target[0].value;
	if(checkURLEntriesDuplicate(text) && checkURLEntryValid(text)) {
		addEntry(text);
		event.target.reset();
		if(preValidate) document.getElementById('entry-button').disabled = true;
		document.getElementById('warning').classList.add('hide');
	} else {
		alert('URL already shortened.');
	}
}

function addEntry(url) {
	let shortURL;
	do {
		shortURL = generateShortURL(4);
	} while (entries.some(entries => entries.shortURL === shortURL));

	let format = formatEntry(url, shortURL);
	document.getElementById('table-entries').appendChild(format);
	entries.push({url, shortURL});
}

function formatEntry(full, short) {
	// Full URL
	let c1 = document.createElement('td');
	c1.innerText = full;

	// Short URL
	let c2 = document.createElement('td');
	c2.setAttribute('data-short', short);
	c2.innerText = window.location.origin+'/'+short; // TODO href - don't assume we are in root web folder
	
	// Date
	let time = new Date(Date.now());
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