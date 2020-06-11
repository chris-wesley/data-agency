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
                "Human Resources",
                "You've got to be quicker than that - time is money.",
                "I can't do it",
                goHome,
                "I'll try again",
                restartLevel
            );
            showPopup1();
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
}

let notification = new effect("notification");
let bleep = new effect("bleep");
let beep = new effect("beep");
let tone = new effect("tone");
let levelUp = new effect("levelUp");
let pop = new effect("pop");

function effect(source) {
    this.effect = document.createElement("audio");
    this.effect.src = "/data/audio/" + (source) + ".mp3";
    this.effect.setAttribute("preload", "auto");
    this.effect.setAttribute("controls", "none");
    this.effect.style.display = "none";
    document.body.appendChild(this.effect);
    this.play = function() {
        this.effect.play();
    };
    this.stop = function() {
        this.effect.pause();
    };
}

function removeContext() {
    let context = document.querySelector(".context");
    if (document.contains(context)) {
        context.remove();
    }
    showPopup1();
    showPopup2();
}

function removePopup1() {
    let popup1 = document.querySelectorAll(".popup")[0];
    if (document.contains(popup1)) {
        popup1.remove();
    }
}

function removePopup2() {
    let popup2 = document.querySelectorAll(".popup")[1];
    popup2.remove();
}

function showPopup1() {
    let popup1 = document.querySelectorAll(".popup")[0];
    popup1.style.display = "block";
    pop.play();
}

function showPopup2() {
    let popup2 = document.querySelectorAll(".popup")[1];
    popup2.style.display = "block";
    pop.play();
}


function hideMessage() {
    let message = document.getElementById("message");
    message.classList.toggle("hide-message");
    message.classList.remove("unread-message");
    pop.play();
}

function removeMessage() {
    let message = document.getElementById("message");
    message.remove();
}

function goHome() {
    window.location.href = "http://data-agency:4000/";
}

function restartLevel() {
    window.location.reload();
    removePopup1();
}

function startLevel() {
    removePopup1();
    showDashboard();
    countdown(60);
    window.setTimeout(hideMessage, 1000);
}

function nextLevel() {
    let level = upcomingLevel.toLowerCase();
    window.location.assign("/" + level + "/");

}

function showDashboard() {
    grid.classList.remove('hide');
    grid.style.pointerEvents = "auto";
}

function hideDashboard() {
    grid.classList.add('hide');
    sound.classList.add('show');
}

// Create and parse message data
function createMessage(head, face, name, content) {
    // Create message data
    let message = document.createElement('div');
    let messageHeader = document.createElement('div');
    let messagePeep = document.createElement('div');
    let messageHead = document.createElement('img');
    let messageFace = document.createElement('img');
    let messageName = document.createElement('h3');
    let messageTime = document.createElement('h3');
    let messageContent = document.createElement('p');
    // Set element attributes
    message.classList.add("footerMiddle");
    message.classList.add("hide-message");
    message.classList.add("unread-message");
    message.setAttribute("id", "message");
    messageHeader.setAttribute("id", "header");
    messagePeep.setAttribute("id", "peep");
    messageHead.setAttribute("id", "head");
    messageFace.setAttribute("id", "face");
    messageName.setAttribute("id", "name");
    messageTime.setAttribute("id", "time");
    messageContent.setAttribute("id", "content");
    // Append elements to DOM
    message.appendChild(messageHeader);
    message.appendChild(messageContent);
    messageHeader.appendChild(messagePeep);
    messageHeader.appendChild(messageName);
    messageHeader.appendChild(messageTime);
    messagePeep.appendChild(messageHead);
    messagePeep.appendChild(messageFace);
    grid.insertBefore(message, grid.childNodes[14]);
    // Parse the unique text content
    message.addEventListener("click", hideMessage);
    messageHead.setAttribute("src", "/data/open-peeps/head/" + (head) + ".svg")
    messageFace.setAttribute("src", "/data/open-peeps/face/" + (face) + ".svg")
    messageName.textContent = (name);
    messageTime.textContent = time;
    messageContent.textContent = (content);
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
    popup.style.display = "none";
}

// Create and parse popup data
function createPopup2(head, face, name, content, buttonLeft, buttonLeftFunction, buttonRight, buttonRightFunction) {
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
    popup.style.display = "none";
}

// Create and parse popup data
function createContext(heading, body, buttonRight, buttonRightFunction) {
    // Create context data
    let context = document.createElement('div');
    let contextHeader = document.createElement('div');
    let contextHeading = document.createElement('h3');
    let contextBody = document.createElement('p');
    let contextButton = document.createElement('div');
    let contextButtonRight = document.createElement('button');
    // Set element attributes
    context.classList.add("context");
    contextHeader.setAttribute("id", "header");
    contextHeading.setAttribute("id", "heading");
    contextBody.setAttribute("id", "body");
    contextButton.setAttribute("id", "buttonWrapper");
    // Append elements to DOM
    context.appendChild(contextHeader);
    context.appendChild(contextBody);
    context.appendChild(contextButton);
    contextHeader.appendChild(contextHeading);
    contextButton.appendChild(contextButtonRight);
    document.body.appendChild(context);
    // Parse the unique text content
    contextHeading.textContent = (heading);
    contextBody.textContent = (body);
    contextButtonRight.textContent = (buttonRight);
    contextButtonRight.onclick = (buttonRightFunction);
    // Prevent dashboard being clicked
    grid.style.pointerEvents = "none";
    sound.style.pointerEvents = "auto";
}