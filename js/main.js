// Grab all the interactive items
const sections = document.querySelectorAll('.section');
const cards = document.querySelectorAll('.card');

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

	// Send the card data to new section
	section.addEventListener('drop', function (event) {
		cardRules('source', 'users');
		cardRules('user', 'segments');
		cardRules('segment', 'clients');
		cardRules('client', '');
		console.log('Tried to be dropped in the wrong section');
	});

function cardRules(cardName, sectionName) {
	if (draggedCard.classList.contains(cardName) && (section.classList.contains(sectionName))) {
		console.log('Dropped in correct section');
		section.append(draggedCard);
		section.style.backgroundColor = '#bafcac';
	}
	else {
		return 0;
	}
}
}
