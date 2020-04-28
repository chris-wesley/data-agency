// Grab all the interactive items
const sections = document.querySelectorAll('.section');
const cards = document.querySelectorAll('.card');

function uniqueDropzone() {
	const containers = document.querySelectorAll('.section');

if (containers.length === 0) {
	return false;
}

}

const droppable = new Draggable.Droppable(document.querySelectorAll('.container'), {
  draggable: '.card',
  dropzone: '.section',
  mirror: {
  	appendTo: 'body',
    constrainDimensions: true,
  }
});

  let droppableOrigin;

  // Cards can only be dragged to the right section
  droppable.on('drag:start', (event) => {
    droppableOrigin = event.originalSource.dataset.dropzone;
  });

  droppable.on('droppable:dropped', (event) => {
    if (droppableOrigin !== event.dropzone.dataset.dropzone) {
      event.cancel();
    }
    else {
   		event.dropzone.childNode.textContent = "red";
    }
  });

// Load the data
getSources();
getUsers();
getSegments();
getClients();

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