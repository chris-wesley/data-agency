// Grab all the interactive items
const sections = document.querySelectorAll('.section');
const cards = document.querySelectorAll('.card');

let currentLevel = "Intern";

const levelDisplay = document.querySelector('#levelDisplay');
levelDisplay.textContent = currentLevel;

// Nothing being dragged initially
let draggedCard = null;

// Loop through and find the current card
for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.draggable = true;

    // Event listener for the start of drag
    card.addEventListener('dragstart', function(event) {
        draggedCard = card;
        draggedCard.style.cursor = 'grabbing';
        // Hide card from initial section
        requestAnimationFrame(function() {
            card.style.display = "none";
        }, 0);
    });

    // Event listener for the end of drag
    card.addEventListener('dragend', function(event) {
        draggedCard.style.cursor = 'default';
        // Still show the card while being dragged
        requestAnimationFrame(function() {
            draggedCard = null;
            card.style.display = "block";
        }, 0);
    });

    card.addEventListener('dragover', function(event) {
        console.log('card.dragover');

    });

    card.addEventListener('dragenter', function(event) {
        console.log('card.dragenter');
    });

    card.addEventListener('dragleave', function(event) {
        console.log('card.dragleave');
    });

    card.addEventListener('drop', function(event) {
        console.log('card.drop');
    });
}

// Loop through and find the current section
for (let j = 0; j < sections.length; j++) {
    const section = sections[j];

    // Stop the card from cancelling while dragging over
    section.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    section.addEventListener('dragexit', function(event) {
        event.preventDefault();
    });

    // Change the background color when card enters a section   
    section.addEventListener('dragenter', function(event) {});

    // Change the background color when card leaves a section
    section.addEventListener('dragleave', function(event) {
        event.preventDefault();
    });

    // On drop check the combo meets the rules
    section.addEventListener('drop', function(event) {
        if (cardRules('source', 'users')) {
            reduceScore(source);
            addData();
        }
        cardRules('user', 'segments');
        cardRules('segment', 'clients');
        cardRules('client', '');
        console.log('Tried to be dropped in the wrong section');
    });

    // Check the card is dropping in the right section
    function cardRules(cardName, sectionName) {
        if (draggedCard.classList.contains(cardName) && (section.classList.contains(sectionName))) {
            console.log('Dropped in correct section');
            // Switch the tag content with the p content
            draggedCard.children[1].textContent = draggedCard.children[0].textContent;
            // Send the card data to new section
            section.children[1].appendChild(draggedCard.children[1]);
            draggedCard.remove();
        }
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
    let sources = document.querySelectorAll('.source');

    // Loop through cards and randomise without repeats
    for (i = 0; i < sources.length; i++) {
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
        sources[i].children[0].textContent = randomName;
        sources[i].children[1].textContent = randomPrice;

        rows = rows.filter(function(str) {
            return str.indexOf(randomName) === -1;
        });
    }
}

function addData() {

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomChar() {
    randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return randomChar;
    }

// Fetch the user data files
async function getUsers() {
    const response = await fetch('../data/users.csv');
    const data = await response.text();
    // Sort the data into arrays
    let rows = data.split('\n').slice(1);
    let users = document.querySelectorAll('.user');
    // Loop through cards 
    for (i = 0; i < users.length; i++) {
        let randomise = rows[Math.floor(Math.random() * rows.length)];
        let randomSplit = randomise.split(',');
        let maleName = randomSplit[0];
        let femaleName = randomSplit[1];
        let lastName = randomSplit[2];
        let occupation = randomSplit[3];
        let marital = randomSplit[4];
        let homeType = randomSplit[5];
        let homeOwnership = randomSplit[6];
        let religon = randomSplit[7];
        let ethnic = randomSplit[8];
        let street = randomSplit[9];
        let email = randomSplit[10];

        //Randomly choose a male or female first name and combine with a last name
        var randomNumber = getRandomInt(0, 1);
        var randomFirstName = randomSplit[randomNumber];
        if (randomNumber === 0) {
            gender = "Male";
        } else {
            gender = "Female";
        }
        // Combine names to single span
        name = randomFirstName + " " + lastName;
        // Randomise user ID
        users[i].children[0].textContent = "#" + getRandomInt(200000, 400000);
        // Randomise name
        var span = document.createElement("span");
        span.textContent = name;
        users[i].append(span);
        // Randomise gender
        var span = document.createElement("span");
        span.textContent = gender;
        users[i].append(span);
        // Randomise date of birth
        var day = getRandomInt(1, 30);
        var month = getRandomInt(1, 12);
        var year = getRandomInt(1930, 2001);
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var dob = day + "/" + month + "/" + year;
        var span = document.createElement("span");
        span.textContent = dob;
        users[i].append(span);
        // Randomise phone number
        var phoneNumber = "+447" + getRandomInt(123456789, 999999999);
        var span = document.createElement("span");
        span.textContent = phoneNumber;
        users[i].append(span);
        // Randomise email
        var emailAddress = (randomFirstName.slice(0, 1) + "." + lastName + "@" + email + ".com").toLowerCase();
        var span = document.createElement("span");
        span.textContent = emailAddress;
        users[i].append(span);
        // Randomise address
        var streetNumber = getRandomInt(0, 99);
        var address = streetNumber + " " + street;
        var span = document.createElement("span");
        span.textContent = address;
        users[i].append(span);
        //Randomise postcode
        var postcode = getRandomChar() + getRandomChar() + getRandomInt(0, 99) + " " + getRandomInt(0, 9) + getRandomChar() + getRandomChar();
        var span = document.createElement("span");
        span.textContent = postcode;
        users[i].append(span);
        // Randomise occupation
        var span = document.createElement("span");
        span.textContent = occupation;
        users[i].append(span);
        // Randomise marital
        var span = document.createElement("span");
        span.textContent = marital;
        users[i].append(span);
        // Randomise homeType
        var span = document.createElement("span");
        span.textContent = homeType;
        users[i].append(span);
        // Randomise homeOwnership
        var span = document.createElement("span");
        span.textContent = homeOwnership;
        users[i].append(span);
        // Randomise religon
        var span = document.createElement("span");
        span.textContent = religon;
        users[i].append(span);
        // Randomise ethnic
        var span = document.createElement("span");
        span.textContent = ethnic;
        users[i].append(span);
        // Randomise salary
        var salary = getRandomInt(12000, 70000);
        var salaryStart = String(salary).substring(0, 2);
        var salaryEnd = String(salary).substring(2);
        var span = document.createElement("span");
        span.textContent = "$" + salaryStart + "," + salaryEnd;
        users[i].append(span);
    }
}

// Fetch the segment data files
async function getSegments() {
    const response = await fetch('../data/segments.csv');
    const data = await response.text();
    // Sort the data into arrays
    let rows = data.split('\n').slice(1);
    let segments = document.querySelectorAll('.segment');

    // Loop through cards and randomise without repeats
    for (i = 0; i < segments.length; i++) {
        let randomise = rows[Math.floor(Math.random() * rows.length)];
        let randomSplit = randomise.split(',');
        let randomName = randomSplit[0];
        let randomEthics = randomSplit[1];

        segments[i].children[0].textContent = randomName;
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
    let clients = document.querySelectorAll('.client');
    // Loop through cards and randomise without repeats
    for (i = 0; i < clients.length; i++) {
        let randomise = rows[Math.floor(Math.random() * rows.length)];
        let randomSplit = randomise.split(',');
        let randomName = randomSplit[0];
        let randomType = randomSplit[1];
        let randomEthics = randomSplit[2];

        clients[i].children[0].textContent = randomName;
        rows = rows.filter(function(str) {
            return str.indexOf(randomName) === -1;
        });
    }
}

// Reducing score when buying source
function reduceScore(element) {
    var price = (element).textContent;
    var scoreElement = document.getElementById("score");
    var scoreString = scoreElement.textContent.replace("$", "");
    var scoreInt = parseInt(scoreString);
    var priceString = (price).replace(/[^0-9]/g, '');
    var priceInt = parseInt(priceString);
    scoreElement.textContent = ("$" + (scoreString - priceString));
}

// 60 second countdown
function countdown(seconds) {

    function tick() {
        var counter = document.getElementById("timer");
        (seconds)--;
        counter.textContent = "00:" + ((seconds) < 10 ? "0" : "") + String((seconds));
        if ((seconds) > 0) {
            setTimeout(tick, 1000);
        } else if ((seconds) <= 0) {
            console.log("Game over");
        }
    }
    tick();
}
countdown(1);

function togglePopup(popupNameText, popupContentText, popupButtonLeftText, popupButtonRightText, countdown) {
    getTime();
    //Show or hide the popup
    var grid = document.querySelector(".grid");
    var popup = document.querySelector(".popupWrapper");
    var popupName = document.getElementById("popupName");
    var popupTime = document.getElementById("popupTime");
    var popupContent = document.getElementById("popupContent");
    var popupButtonLeft = document.getElementById("popupButtonLeft");
    var popupButtonRight = document.getElementById("popupButtonRight");
    popup.classList.toggle("show-popup");
    popupName.textContent = (popupNameText);
    popupTime.textContent = time;
    popupContent.textContent = (popupContentText);
    popupButtonLeft.textContent = (popupButtonLeftText);
    popupButtonRight.textContent = (popupButtonRightText);
    if (popup.classList.contains("show-popup")) {
        grid.style.pointerEvents = "none";
        popup.style.pointerEvents = "auto";
    }
    else {
        grid.style.pointerEvents = "auto";
        popup.style.pointerEvents = "auto";
    }
}


// Toggle music and sound
function toggleMute() {
    var sound = document.getElementById("sound");
    var icon = document.getElementById("icon");
    icon.src = "../images/sound-off.svg";
    sound.muted = !sound.muted;
    if (!sound.muted) {
        icon.src = "../images/sound-on.svg";
    }
};

// Format time
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

messageDisplay();

// Message
function messageDisplay() {
    var messageWrapper = document.getElementById("messageWrapper");
    var messageHeader = document.getElementById("messageHeader");
    var messageHead = document.getElementById("messageHead");
    var messageName = document.getElementById("messageName");
    var messageTime = document.getElementById("messageTime");
    var messageContent = document.getElementById("messageContent");
    var text1 = "Recruitment";
    var text3 = "This is the dashboard you’ll be working from. I’ll walk you through a scenario to help you get acquainted.";

    // Hide message contents
    if (x = 0) {
        messageContent.style.display = "none";
    }

    getTime();

    // Change message contents
    messageName.textContent = text1;
    messageTime.textContent = time;
    messageContent.textContent = text3;
}

function getTime() {
    var date = new Date();
    var hours = addZero(date.getHours());
    var minutes = addZero(date.getMinutes());
    time = hours + ":" + minutes;
}

function messageToggle() {
    if (messageWrapper.style.marginBottom === "-150px") {
        messageWrapper.style.marginBottom = "0px";
        messageWrapper.style.transition = "all 0.5s"
    } else {
        messageWrapper.style.marginBottom = "-150px";
    }
}