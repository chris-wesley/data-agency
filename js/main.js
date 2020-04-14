const source = document.querySelector('.source');

// Grab all the interactive items
const sections = document.querySelectorAll('.section');
const cards = document.querySelectorAll('.card');

// Load the data
getSources();
getUsers();
getSegments();
getClients();

// Nothing being dragged initially
let draggedCard = null;

// Loop through and find the current card
for (let i = 0; i < cards.length; i++) {
	const card = cards[i];
    card.draggable = true;

    // Event listener for the start of drag
	card.addEventListener('dragstart', function (event) {
		draggedCard = card;
		draggedCard.style.cursor = 'grabbing';
		// Hide card from initial section
		requestAnimationFrame(function () {
			card.style.display = 'none';
		}, 0)
	});

	// Event listener for the end of drag
	card.addEventListener('dragend', function (event) {
		draggedCard.style.cursor = 'default';
		// Still show the card while being dragged
		requestAnimationFrame(function () {
			draggedCard.style.display = 'block';
			draggedCard = null;
		}, 0);
	})
}

// Loop through and find the current section
for (let j = 0; j < sections.length; j ++) {
	const section = sections[j];

	// Stop the card from cancelling while dragging over
	section.addEventListener('dragover', function (event) {
		event.preventDefault();
	});

	section.addEventListener('dragexit', function (event) {
		event.preventDefault();
	});
		
	// Change the background color when card enters a section	
	section.addEventListener('dragenter', function (event) {
		event.preventDefault();
	});

	// Change the background color when card leaves a section
	section.addEventListener('dragleave', function (event) {
		event.preventDefault();
	});

	// On drop check the combo meets the rules
	section.addEventListener('drop', function (event) {
		cardRules('source', 'users');
		cardRules('user', 'segments');
		cardRules('segment', 'clients');
		cardRules('client', '');
		console.log('Tried to be dropped in the wrong section');
	});

// Check the card is dropping in the right section
function cardRules(cardName, sectionName) {
	if (draggedCard.classList.contains(cardName) && (section.classList.contains(sectionName))) {
		console.log('Dropped in correct section');
		// Send the card data to new section
		section.append(draggedCard);
		section.style.backgroundColor = '#bafcac';
	}
}
}

// Fetch the data files
async function getSources() {
	const response = await fetch('../data/sources.csv');
	const data = await response.text();
	// Sort the data into arrays
	let rows = data.split('\n').slice(1);
	let sourceNames = document.querySelectorAll('.sourceName');
	let sourcePrices = document.querySelectorAll('.sourcePrice');
		// Loop through cards 
		for (i = 0; i < sourceNames.length; i++) {
			let columns = rows[i].split(',');
			let name = columns[0];
			let price = columns[1];
			let type = columns[2];
				if (price == 0) {
					price = "FREE";
				}
				else {
					price = "$" + price;
				}
		sourceNames[i].textContent = name;
		sourcePrices[i].textContent = price;
		}
}

// Fetch the data files
async function getUsers() {
	const response = await fetch('../data/users.csv');
	const data = await response.text();
	// Sort the data into arrays
	let rows = data.split('\n').slice(1);
	let userId = document.querySelectorAll('.userId');
		// Loop through cards 
		for (i = 0; i < userId.length; i++) {
			let columns = rows[i].split(',');
			let Id = columns[0];
			let name = columns[1];
			let gender = columns[2];
				
		userId[i].textContent = id;
		}
}

// Fetch the data files
async function getSegments() {
	const response = await fetch('../data/segments.csv');
	const data = await response.text();
	// Sort the data into arrays
	let rows = data.split('\n').slice(1);
	let segmentNames = document.querySelectorAll('.segmentName');
		// Loop through cards 
		for (i = 0; i < segmentNames.length; i++) {
			let columns = rows[i].split(',');
			let name = columns[0];
			let ethics = columns[1];
	
		segmentNames[i].textContent = name;
		}
}

// Fetch the data files
async function getClients() {
	const response = await fetch('../data/clients.csv');
	const data = await response.text();
	// Sort the data into arrays
	let rows = data.split('\n').slice(1);
	let clientNames = document.querySelectorAll('.clientName');
	let clientPrices = document.querySelectorAll('.clientPrice');
		// Loop through cards 
		for (i = 0; i < clientNames.length; i++) {
			let columns = rows[i].split(',');
			let name = columns[0];
			let type = columns[1];
			let ethics = columns[2];
	
		clientNames[i].textContent = name;
		}
}