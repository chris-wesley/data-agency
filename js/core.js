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
        card.classList.add("card", "client", "empty");
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
        if ((seconds) == 0) {
            createPopup(
                "analyst",
                "explaining",
                "Recruitment",
                "You've got to be quicker than that - time is money.",
                "I can't do it",
                goHome,
                "I'll try again",
                restartLevel
            );
        }
        else {
            pause = setTimeout(tick, 1000);
        }
    }
    tick();
}
let pause;
function pauseCountdown() {
    clearTimeout(pause);
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

function removeContext() {
    let context = document.querySelector(".context");
    context.remove();
}

function removePopup() {
    let popup = document.querySelector(".popup");
    popup.remove();
}

function goHome() {
    window.location.href = "http://data-agency:4000/";
}

function restartLevel() {
    window.location.reload();
    removeContext();
    removePopup();
}

function startLevel() {
    removePopup();
    showDashboard();
    countdown(60);
}

function nextLevel() {
    window.location.reload();
}

function showDashboard() {
    grid.classList.remove('hide');
    grid.style.pointerEvents = "auto";
}

function hideDashboard() {
    grid.classList.add('hide');
    sound.classList.add('show');
}



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

// Create and parse popup data
function createContext(heading, body, buttonRight, buttonRightFunction) {
    // Create popup data
    let popup = document.createElement('div');
    let popupHeader = document.createElement('div');
    let popupHeading = document.createElement('h3');
    let popupBody = document.createElement('p');
    let popupButton = document.createElement('div');
    let popupButtonRight = document.createElement('button');
    // Set element attributes
    popup.classList.add("context");
    popupHeader.setAttribute("id", "header");
    popupHeading.setAttribute("id", "heading");
    popupBody.setAttribute("id", "body");
    popupButton.setAttribute("id", "buttonWrapper");
    // Append elements to DOM
    popup.appendChild(popupHeader);
    popup.appendChild(popupBody);
    popup.appendChild(popupButton);
    popupHeader.appendChild(popupHeading);
    popupButton.appendChild(popupButtonRight);
    document.body.appendChild(popup);
    // Parse the unique text content
    popupHeading.textContent = (heading);
    popupBody.textContent = (body);
    popupButtonRight.textContent = (buttonRight);
    popupButtonRight.onclick = (buttonRightFunction);
    // Prevent dashboard being clicked
    grid.style.pointerEvents = "none";
    sound.style.pointerEvents = "auto";
}

// Create and parse popup data
function createPopup(head, face, name, content, buttonLeft, buttonLeftFunction, buttonRight, buttonRightFunction) {
    // Create popup data
    let popup = document.createElement('div');
    let popupHeader = document.createElement('div');
    let popupPeep = document.createElement('div');
    let popupHead = document.createElement('img');
    let popupFace = document.createElement('img');
    let popupName = document.createElement('h3');
    let popupTime = document.createElement('h3');
    let popupContent = document.createElement('p');
    let popupButton = document.createElement('div');
    let popupButtonLeft = document.createElement('button');
    let popupButtonRight = document.createElement('button');
    // Set element attributes
    popup.classList.add("popup");
    popupHeader.setAttribute("id", "header");
    popupPeep.setAttribute("id", "peep");
    popupHead.setAttribute("id", "head");
    popupFace.setAttribute("id", "face");
    popupName.setAttribute("id", "name");
    popupTime.setAttribute("id", "time");
    popupContent.setAttribute("id", "content");
    popupButton.setAttribute("id", "buttonWrapper");
    // Append elements to DOM
    popup.appendChild(popupHeader);
    popup.appendChild(popupContent);
    popup.appendChild(popupButton);
    popupHeader.appendChild(popupPeep);
    popupHeader.appendChild(popupName);
    popupHeader.appendChild(popupTime);
    popupPeep.appendChild(popupHead);
    popupPeep.appendChild(popupFace);
    popupButton.appendChild(popupButtonLeft);
    popupButton.appendChild(popupButtonRight);
    document.body.appendChild(popup);
    // Parse the unique text content
    popupHead.setAttribute("src", "/data/open-peeps/head/" + (head) + ".svg")
    popupFace.setAttribute("src", "/data/open-peeps/face/" + (face) + ".svg")
    popupName.textContent = (name);
    popupTime.textContent = time;
    popupContent.textContent = (content);
    popupButtonLeft.textContent = (buttonLeft);
    popupButtonRight.textContent = (buttonRight);
    popupButtonLeft.addEventListener("click", (buttonLeftFunction));
    popupButtonRight.addEventListener("click", (buttonRightFunction));
    // Prevent dashboard being clicked
    grid.style.pointerEvents = "none";
    sound.style.pointerEvents = "auto";
}