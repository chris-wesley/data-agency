/* Core game functions */

/* Initalisation */

// Grab all the interactive items
const grid = document.querySelector('.grid');
const sections = document.querySelectorAll('.section');
const sourceSection = document.querySelector('#sources');
const userSection = document.querySelector('#users');
const segmentSection = document.querySelector('#segments');
const clientSection = document.querySelector('#clients');
const cards = [];
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');

// Fill the dashboard with cards
function populateDashboard(sourcesNumber, usersNumber, segementsNumber, clientsNumber) {

    // Fill sources section with source cards
    for (let i = 0; i < (sourcesNumber); i++) {
        const card = document.createElement('div');
        const cardName = document.createElement('p');
        const cardTag = document.createElement('span');
        card.setAttribute('draggable', true);
        card.setAttribute('id', i);
        card.classList.add("card", "source");
        card.appendChild(cardName);
        card.appendChild(cardTag);
        sourceSection.appendChild(card);
        cards.push(card);
    }

    // Fill users section with user cards
    for (let i = 0; i < (usersNumber); i++) {
        const card = document.createElement('div');
        const cardName = document.createElement('p');
        card.setAttribute('draggable', true);
        card.setAttribute('id', i);
        card.classList.add("card", "user", "empty");
        card.appendChild(cardName);
        userSection.appendChild(card);
        cards.push(card);
    }

    // Fill segments section with segment cards
    for (let i = 0; i < (segementsNumber); i++) {
        const card = document.createElement('div');
        const cardName = document.createElement('p');
        card.setAttribute('draggable', true);
        card.setAttribute('id', i);
        card.classList.add("card", "segment", "empty");
        card.appendChild(cardName);
        segmentSection.appendChild(card);
        cards.push(card);
    }

    // Fill clients section with client cards
    for (let i = 0; i < (clientsNumber); i++) {
        const card = document.createElement('div');
        const cardName = document.createElement('p');
        const cardTag = document.createElement('span');
        card.setAttribute('draggable', true);
        card.setAttribute('id', i);
        card.classList.add("card", "client");
        card.appendChild(cardName);
        card.appendChild(cardTag);
        clientSection.appendChild(card);
        cards.push(card);
    }
}

function currentLevel(position) {
    getSources((position));
    getUsers((position));
    getSegments((position));
    getClients((position));
    document.getElementById('levelText');
    levelText.textContent = (position);
}

// Randomise whole number function
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Randomise characters function
function getRandomChar() {
    randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return randomChar;
    }


/* Scoring functions */
function startingScore(score) {
    let scoreElement = document.getElementById('score');
    scoreElement.textContent = ("$" + (score));
}

// Reduce score when buying source
function reduceScore(element) {
    let price = (element).children[1].textContent;
    if (price.includes("FREE")) {
    }
    else {
    let scoreElement = document.getElementById("score");
    let scoreString = scoreElement.textContent.replace("$", "");
    let scoreInt = parseInt(scoreString);
    let priceString = (price).replace(/[^0-9]/g, '');
    let priceInt = parseInt(priceString);
    scoreElement.textContent = ("$" + (scoreInt - priceInt));
}
}

// Increase score when selling segment
function increaseScore(element) {
    let price = (element).children[1].textContent;
    let scoreElement = document.getElementById("score");
    let scoreString = scoreElement.textContent.replace("$", "");
    let scoreInt = parseInt(scoreString);
    let priceString = (price).replace(/[^0-9]/g, '');
    let priceInt = parseInt(priceString);
    scoreElement.textContent = ("$" + (scoreInt + priceInt));
}

/* Game functions */

// 60 second countdown
function countdown(seconds) {

    function tick() {
        let counter = document.getElementById("timer");
        (seconds)--;
        counter.textContent = "00:" + ((seconds) < 10 ? "0" : "") + String((seconds));
        if ((seconds) > 0) {
            setTimeout(tick, 1000);
        } else if ((seconds) <= 0) {
            changePopup(
                "Recruitment",
                "You didn't complete the task in time",
                "I can't do this",
                "I'll try again"
            );
            togglePopup();
        }
    }
    tick();
}

// Fetch the current time
function getTime() {
    var date = new Date();
    var hours = addZero(date.getHours());
    var minutes = addZero(date.getMinutes());
    time = hours + ":" + minutes;
}
// Format time
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
getTime();

// Toggle music and sound
function toggleMute() {
    var music = document.getElementById("music")
    var icon = document.getElementById("icon");
    icon.src = "../images/sound-off.svg";
    music.muted = !music.muted;
    if (!music.muted) {
        icon.src = "../images/sound-on.svg";
    }
};

// Change and display the current dashboard message
function changeMessage(messageNameText, messageHeadPeep, messageFacePeep, messageContentText) {
    let message = document.getElementById("messageWrapper");
    let messageHeader = document.getElementById("messageHeader");
    let messageHead = document.getElementById("messageHead");
    let messageFace = document.getElementById("messageFace");
    let messageName = document.getElementById("messageName");
    let messageTime = document.getElementById("messageTime");
    let messageContent = document.getElementById("messageContent");
    // Change message contents
    messageHead.src = "/data/open-peeps/head/" + (messageHeadPeep) + ".svg";
    messageFace.src = "/data/open-peeps/face/" + (messageFacePeep) + ".svg";
    messageName.textContent = (messageNameText);
    messageTime.textContent = time;
    messageContent.textContent = (messageContentText);
}

function toggleMessage() {
    let message = document.getElementById("messageWrapper");
    message.classList.toggle("hide-message");
}

function changePopup(popupNameText, popupContentText, popupButtonLeftText, popupButtonRightText) {
    getTime();
    //Show or hide the popup
    let popup = document.querySelector(".popupWrapper");
    let popupName = document.getElementById("popupName");
    let popupTime = document.getElementById("popupTime");
    let popupContent = document.getElementById("popupContent");
    let popupButtonLeft = document.getElementById("popupButtonLeft");
    let popupButtonRight = document.getElementById("popupButtonRight");
    popupName.textContent = (popupNameText);
    popupTime.textContent = time;
    popupContent.textContent = (popupContentText);
    popupButtonLeft.textContent = (popupButtonLeftText);
    popupButtonRight.textContent = (popupButtonRightText);
}

function togglePopup() {
    let popup = document.querySelector(".popupWrapper");
    popup.classList.toggle("show-popup");
    if (popup.classList.contains("show-popup")) {
        grid.style.pointerEvents = "none";
    }
    else {
        grid.style.pointerEvents = "auto";
    }

}

function changeContext(contextHeaderText, contextContentText, contextButtonText) {
    //Show or hide the popup
    let context = document.querySelector(".contextWrapper");
    let contextHeader = document.getElementById("contextHeader");
    let contextContent = document.getElementById("contextContent");
    let contextButton = document.getElementById("contextButton");
    contextHeader.textContent = (contextHeaderText);
    contextContent.textContent = (contextContentText);
    contextButton.textContent = (contextButtonText);
}

function toggleContext() {
    let context = document.querySelector(".contextWrapper");
    context.classList.toggle("show-context");
    if (context.classList.contains("show-context")) {
        grid.style.pointerEvents = "none";
    }
    else {
        grid.style.pointerEvents = "auto";
    }
}

// Hide the dashboard on toggle
function toggleDashboard() {
    grid.classList.toggle('hide');
    sound.classList.add('show');
}