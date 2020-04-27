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
		draggedCard.style.opacity = '1.0';
		// Hide card from initial section
		requestAnimationFrame(function () {
			card.style.backgroundColor = '#F0F1EE';
			card.style.color = '#F0F1EE';
			card.style.border = 'solid 1px #F0F1EE'
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
	});

// Check the card is dropping in the right section
function cardRules(cardName, sectionName) {
	if (draggedCard.classList.contains(cardName) && (section.classList.contains(sectionName))) {
		//console.log('Dropped in correct section');
		// Send the card data to new section
		section.append(draggedCard);
		draggedCard.childNodes[3].textContent = "SOLD";

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

		// Loop through cards and randomise without repeats
		for (i = 0; i < sourceNames.length; i++) {
			let randomise = rows[Math.floor(Math.random() * rows.length)];
			let randomSplit = randomise.split(',');
			let randomName = randomSplit[0];
			let randomPrice = randomSplit[1];
			let randomType = randomSplit[2];
			if (randomPrice == 0) {
					randomPrice = "FREE";
				}
				else {
					randomPrice = "$" + randomPrice;
				}
			sourceNames[i].textContent = randomName;
			sourcePrices[i].textContent = randomPrice;

			rows = rows.filter(function(str){
				return str.indexOf(randomName) === -1;
			});
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
			let id = columns[0];
				
		userId[i].textContent = "#" + (Math.round(Math.random() * 200000) + 400000);
		}
}

// Fetch the data files
async function getSegments() {
	const response = await fetch('../data/segments.csv');
	const data = await response.text();
	// Sort the data into arrays
	let rows = data.split('\n').slice(1);
	let segmentNames = document.querySelectorAll('.segmentName');

		// Loop through cards and randomise without repeats
		for (i = 0; i < segmentNames.length; i++) {
			let randomise = rows[Math.floor(Math.random() * rows.length)];
			let randomSplit = randomise.split(',');
			let randomName = randomSplit[0];
			segmentNames[i].textContent = randomName;
			rows = rows.filter(function(str){
				return str.indexOf(randomName) === -1;
			});
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
		// Loop through cards and randomise without repeats
		for (i = 0; i < clientNames.length; i++) {
			let randomise = rows[Math.floor(Math.random() * rows.length)];
			let randomSplit = randomise.split(',');
			let randomName = randomSplit[0];
			let randomType = randomSplit[1];
			let randomEthics = randomSplit[2];

			clientNames[i].textContent = randomName;
			rows = rows.filter(function(str){
				return str.indexOf(randomName) === -1;
			});
		}		
}

// 60 second countdown
function countdown() {
    var seconds = 60;
    function tick() {
        var counter = document.getElementById("timer");
        seconds--;
        counter.innerHTML = "00:" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            console.log("Game over");
        }
    }
    tick();
}

// Start the countdown
countdown();


// Toggle music and sound
function togglePlay(audio) {
	var music = document.getElementById("music");
	var effects = document.getElementById("effects")
	return (audio).paused ? (audio).play() : (audio).pause();
};

messageDisplay();

// Message
function messageDisplay() {
	var messageWrapper = document.getElementById("messageWrapper");
	var messageHeader = document.getElementById("messageHeader");
	var messageHead = document.getElementById("messageHead");
	var messageName = document.getElementById("messageName");
	var messageSubject = document.getElementById("messageSubject");
	var messageContent = document.getElementById("messageContent");
	var text1 = "Intern Manager";
	var text2 = "Getting Started";
	var text3 = "Great, this is the dashboard you’ll be working from. Buy one of the data sources on the left by dragging it into the users column to begin.";

	// Hide message contents
	if (x = 0) {
		messageContent.style.display = "none";
	}
	// Change message contents
	messageName.textContent = text1;
	messageSubject.textContent = text2;
	messageContent.textContent = text3;
}

function messageToggle() {
	if (messageWrapper.style.marginBottom === "-150px") {
		messageWrapper.style.marginBottom = "0px";
		messageWrapper.style.transition = "all 0.5s"
	}
	else {
		messageWrapper.style.marginBottom = "-150px";
	}
}