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

// Initial game variables
let score = 0;
let level = "Applicant";

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
        card.classList.add("card", "user");
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
        card.classList.add("card", "segment");
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

populateDashboard(2, 3, 4, 5);

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
        let split = randomise.split(',');
        let name = split[0];
        let price = split[1];
        let type = split[2];
        let ethics = split[3];
        let field1 = split[4];
        let field2 = split[5];
        let field3 = split[6];
        let field4 = split[7];

        if (price === 0) {
            price = "FREE";
        } else {
            price = "$" + price;
        }
        sources[i].children[0].textContent = name;
        sources[i].children[1].textContent = price;
        sources[i].dataset.field1 = field1;
        sources[i].dataset.field2 = field2;
        sources[i].dataset.field3 = field3;
        sources[i].dataset.field4 = field4;

        rows = rows.filter(function (str) {
            return str.indexOf(name) === -1;
        });
    }
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
        let split = randomise.split(',');
        let maleName = split[0];
        let femaleName = split[1];
        let lastName = split[2];
        let occupation = split[3];
        let marital = split[4];
        let homeType = split[5];
        let homeOwnership = split[6];
        let religon = split[7];
        let ethnic = split[8];
        let street = split[9];
        let email = split[10];

        //Randomly choose a male or female first name and combine with a last name
        var randomNumber = getRandomInt(0, 1);
        var randomFirstName = split[randomNumber];
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
        span.classList.add("name");
        span.style.display = "none";
        span.textContent = name;
        users[i].append(span);
        // Randomise gender
        var span = document.createElement("span");
        span.classList.add("gender");
        span.style.display = "none";
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
        dob = day + "/" + month + "/" + year;
        var span = document.createElement("span");
        span.classList.add("dob");
        span.style.display = "none";
        span.textContent = dob;
        users[i].append(span);
        // Randomise phone number
        phoneNumber = "+447" + getRandomInt(123456789, 999999999);
        var span = document.createElement("span");
        span.classList.add("phoneNumber");
        span.style.display = "none";
        span.textContent = phoneNumber;
        users[i].append(span);
        // Randomise email
        emailAddress = (randomFirstName.slice(0, 1) + "." + lastName + "@" + email + ".com").toLowerCase();
        var span = document.createElement("span");
        span.classList.add("emailAddress");
        span.style.display = "none";
        span.textContent = emailAddress;
        users[i].append(span);
        // Randomise address
        var streetNumber = getRandomInt(0, 99);
        address = streetNumber + " " + street;
        var span = document.createElement("span");
        span.classList.add("address");
        span.style.display = "none";
        span.textContent = address;
        users[i].append(span);
        //Randomise postcode
        postcode = "SK49 " + getRandomInt(0, 9) + getRandomChar() + getRandomChar();
        var span = document.createElement("span");
        span.classList.add("postcode");
        span.style.display = "none";
        span.textContent = postcode;
        users[i].append(span);
        // Randomise occupation
        var span = document.createElement("span");
        span.classList.add("occupation");
        span.style.display = "none";
        span.textContent = occupation;
        users[i].append(span);
        // Randomise marital
        var span = document.createElement("span");
        span.classList.add("marital");
        span.style.display = "none";
        span.textContent = marital;
        users[i].append(span);
        // Randomise homeType
        var span = document.createElement("span");
        span.classList.add("homeType");
        span.style.display = "none";
        span.textContent = homeType;
        users[i].append(span);
        // Randomise homeOwnership
        var span = document.createElement("span");
        span.classList.add("homeOwnership");
        span.style.display = "none";
        span.textContent = homeOwnership;
        users[i].append(span);
        // Randomise religon
        var span = document.createElement("span");
        span.classList.add("religon");
        span.style.display = "none";
        span.textContent = religon;
        users[i].append(span);
        // Randomise ethnic
        var span = document.createElement("span");
        span.classList.add("ethnic");
        span.style.display = "none";
        span.textContent = ethnic;
        users[i].append(span);
        // Randomise salary
        salary = getRandomInt(12000, 70000);
        var salaryStart = String(salary).substring(0, 2);
        var salaryEnd = String(salary).substring(2);
        var span = document.createElement("span");
        span.classList.add("salary");
        span.style.display = "none";
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
        let split = randomise.split(',');
        let name = split[0];
        let ethics = split[1];

        segments[i].children[0].textContent = name;
        rows = rows.filter(function(str) {
            return str.indexOf(name) === -1;
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
        let split = randomise.split(',');
        let name = split[0];
        let price = split[1];
        let type = split[2];
        let ethics = split[3];

        if (price === 0) {
            price = "FREE";
        } else {
            price = "$" + price;
        }
        clients[i].children[0].textContent = name;
        clients[i].children[1].textContent = price;
        rows = rows.filter(function(str) {
            return str.indexOf(name) === -1;
        });
    }
}

getSources();
getUsers();
getSegments();
getClients();

// Randomise functions
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomChar() {
    randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return randomChar;
    }

/* Drag and drop */

let typeBeingDragged;
let typeBeingDropped;
let tagBeingDragged;
let tagBeingDropped;

// Add event listeners to all cards
cards.forEach(card => card.addEventListener('dragstart', dragStart));
cards.forEach(card => card.addEventListener('dragover', dragOver));
cards.forEach(card => card.addEventListener('dragenter', dragEnter));
cards.forEach(card => card.addEventListener('dragleave', dragLeave));
cards.forEach(card => card.addEventListener('drop', dragDrop));
cards.forEach(card => card.addEventListener('dragend', dragEnd));

function dragStart() {
    typeBeingDragged = this.classList.item(1);
    tagBeingDragged = this.children[1].textContent;
    console.log(tagBeingDragged);
    console.log(this.id, 'dragstart');
}


function dragOver() {
    console.log(this.id, 'dragover');
}

function dragEnter() {
    console.log(this.id, 'dragenter');
}

function dragLeave() {
    console.log(this.id, 'dragleave');
}

function dragDrop() {
    tagBeingDropped = this.children[1].textContent;
    console.log(this.id, 'dragdrop');
}

function dragEnd() {
    console.log(this.id, 'dragend');
}
