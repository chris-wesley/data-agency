const grid = document.querySelector('.grid');
const sections = document.querySelectorAll('.section');
const sources = document.querySelector('#sources');
const users = document.querySelector('#users');
const segments = document.querySelector('#segments');
const clients = document.querySelector('#clients');

const cards = [];

const cardTypes = [
    'source',
    'user',
    'segment',
    'client'
];

// Create source cards
function createSources() {
    for (let i = 0; i < 9; i++){
        const source = document.createElement('div');
        const sourceName = document.createElement('p');
        const sourcePrice = document.createElement('p');
        source.setAttribute('draggable', true);
        source.setAttribute('id', i);
        source.classList.add("card", "source");
        source.appendChild(sourceName, sourcePrice);
        sources.appendChild(source);
        cards.push(source);
    }
}

// Create user cards
function createUsers() {
    for (let i = 0; i < 9; i++){
        const user = document.createElement('div');
        const userName = document.createElement('p');
        const userDOB = document.createElement('p');
        user.setAttribute('draggable', true);
        user.setAttribute('id', i);
        user.classList.add("card", "user");
        user.appendChild(userName, userDOB);
        users.appendChild(user);
        cards.push(user);
    }
}

// Create segment cards
function createSegments() {
    for (let i = 0; i < 9; i++){
        const segment = document.createElement('div');
        const segmentName = document.createElement('p');
        const segmentPrice = document.createElement('p');
        segment.setAttribute('draggable', true);
        segment.setAttribute('id', i);
        segment.classList.add("card", "segment");
        segment.appendChild(segmentName, segmentPrice);
        segments.appendChild(segment);
        cards.push(segment);
    }
}

// Create client cards
function createClients() {
    for (let i = 0; i < 9; i++){
        const client = document.createElement('div');
        const clientName = document.createElement('p');
        const clientPrice = document.createElement('p');
        client.setAttribute('draggable', true);
        client.setAttribute('id', i);
        client.classList.add("card", "client");
        client.appendChild(clientName, clientPrice);
        clients.appendChild(client);
        cards.push(client);
    }
}

createSources();
createUsers();
createSegments();
createClients();

// Drag the cards

let typeBeingDragged;
let typeBeingDropped;
let cardIdBeingDragged;
let cardSectionBeingDropped;

cards.forEach(card => card.addEventListener('dragstart', dragStart));
cards.forEach(card => card.addEventListener('dragend', dragEnd));
cards.forEach(card => card.addEventListener('dragover', dragOver));
cards.forEach(card => card.addEventListener('dragenter', dragEnter));
cards.forEach(card => card.addEventListener('dragleave', dragLeave));
cards.forEach(card => card.addEventListener('drop', dragDrop));

function dragStart() {
    typeBeingDragged = this.classList[1];
    cardIdBeingDragged = parseInt(this.id);
    console.log(typeBeingDragged);
    console.log(this.id, 'dragStart');
}

function dragEnd(event) {
    event.preventDefault();
    console.log(this.id, 'dragEnd');
}

function dragOver(event) {
    event.preventDefault();
    console.log(this.id, 'dragOver');
}

function dragEnter(event) {
    event.preventDefault();
    console.log(this.id, 'dragEnter');
}

function dragLeave(event) {
    event.preventDefault();    
    console.log(this.id, 'dragLeave');
}

function dragDrop() {
    console.log(this.id, 'dragDrop');
    this.style.backgroundColor = "black";
}
/*
let currentLevel = 'Intern';

const levelDisplay = document.querySelector('#levelDisplay');
levelDisplay.textContent = currentLevel;

// Grab all the interactive items
const sections = document.querySelectorAll('.section');

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
} */