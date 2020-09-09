window.addEventListener('DOMContentLoaded', (event) => {
	_setup();
});

function _setup() {
	document.getElementById('entry').addEventListener('submit', formSubmit);
}

function formSubmit(event) {
	event.preventDefault(); // Prevent form submission
	console.log(event.target);
}