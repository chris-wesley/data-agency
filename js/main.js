// Grab all the interactive items
const sections = document.querySelectorAll('.section');
const cards = document.querySelectorAll('.card');

const draggableSource = new Draggable.default(document.querySelectorAll('.sources'), {
    draggable: '.source',
    mirror: {
        appendTo: 'body',
        constrainDimensions: true,
    }
});

draggableSource.on('drag:start', (event) => {
    draggableSourceOrigin = event.originalSource.dataset.dropzone;
    originalSource = event.originalSource;
    draggedPrice = (originalSource.getElementsByClassName("sourcePrice")[0].textContent);
    console.log('drag:start');
});

draggableSource.on('drag:move', () => console.log('drag:move'));

draggableSource.on('drag:over', () => console.log('drag:over'));

draggableSource.on('drag:over:container', () => console.log('drag:over:container'));

draggableSource.on('drag:out:container', () => {
    console.log('drag:out:container');
    buySource(originalSource);
});

draggableSource.on('drag:stop', () => {
    console.log('drag:stop');
});

draggableSource.on('mirror:create', () => console.log('mirror:create'));

draggableSource.on('mirror:created', () => console.log('mirror:created'));

draggableSource.on('mirror:attached', (event) => {
    console.log('mirror:attached');
});

draggableSource.on('mirror:move', () => console.log('mirror:move'));

draggableSource.on('mirror:destroy', (event) => {
    console.log('mirror:destroy');
    reduceScore(event.mirror);
});


// Check the card is dropping in the right section
function cardRules() {
    var source = document.getElementsByClassName('source');
    var sources = document.getElementById('sources');
    if (source.parent !== sources) {
        sources.appendChild(source[0]);
    }
}

// Load the data
getSources();
getUsers();
getSegments();
getClients();

// Fetch the source data files
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
        } else {
            randomPrice = "$" + randomPrice;
        }
        sourceNames[i].textContent = randomName;
        sourcePrices[i].textContent = randomPrice;

        rows = rows.filter(function(str) {
            return str.indexOf(randomName) === -1;
        });
    }
}

// Fetch the user data files
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
    var userName = document.getElementById("userName");
    var userGender = document.getElementById("userGender");
    var userDOB = document.getElementById("userDOB");
    var userEmail = document.getElementById("userEmail");
    var userPhone = document.getElementById("userPhone");
    var userPostcode = document.getElementById("userPostcode");
    var userOccupation = document.getElementById("userOccupation");
    var userPurchase = document.getElementById("userPurchase");
    var userInterests = document.getElementById("userInterests");
    var userIncome = document.getElementById("userIncome");
    var userMarital = document.getElementById("userMarital");
    var userHome = document.getElementById("userHome");
    placeholderUsers(userName);
    placeholderUsers(userGender);
    placeholderUsers(userEmail);
    placeholderUsers(userPhone);
    placeholderUsers(userPostcode);
    placeholderUsers(userOccupation);
    placeholderUsers(userPurchase);
    placeholderUsers(userInterests);
    placeholderUsers(userIncome);
    placeholderUsers(userMarital);
    placeholderUsers(userHome);
}

// Populate empty user fields with placeholders
function placeholderUsers(element) {
    if ((element).textContent === "") {
        (element).textContent = (element).id.substring(4);
        (element).style.color = "lightgrey";
    }

}

// Fetch the segment data files
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
        rows = rows.filter(function(str) {
            return str.indexOf(randomName) === -1;
        });
    }
}

// Fetch client the data files
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
        rows = rows.filter(function(str) {
            return str.indexOf(randomName) === -1;
        });
    }
}

function buySource(element) {
    console.log((element).textContent);
    (element).style.backgroundColor = "black";
    (element).style.color = "white";
}

function reduceScore(element) {
    var price = (element).textContent;
    var scoreElement = document.getElementById("score");
    var scoreString = scoreElement.textContent.replace("$", "");
    var scoreInt = parseInt(scoreString);
    var priceString = (price).replace(/[^0-9]/g, '');
    var priceInt = parseInt(priceString);
    scoreElement.textContent = ("$" + (scoreString - priceString));
}


// Collapsible user cards
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

// 60 second countdown
function countdown() {
    var seconds = 60;

    function tick() {
        var counter = document.getElementById("timer");
        seconds--;
        counter.innerHTML = "00:" + (seconds < 10 ? "0" : "") + String(seconds);
        if (seconds > 0) {
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
    } else {
        messageWrapper.style.marginBottom = "-150px";
    }
}