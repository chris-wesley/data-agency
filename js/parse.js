/* Parsing CSV data */

// Fetch the source data files
async function getSources(level) {
    const response = await fetch('/data/' + (level) + '/sources.csv');
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
        let link = split[4];
        let field1 = split[5];
        let field2 = split[6];
        let field3 = split[7];
        let field4 = split[8];
        // Swap out any price that is 0 with FREE
        if (price === "0") {
            price = "FREE";
        } else {
            price = "$" + price;
        }
        sources[i].children[0].textContent = name;
        sources[i].children[1].textContent = price;
        sources[i].dataset.ethics = ethics;
        sources[i].dataset.link = link;
        sources[i].dataset.field1 = field1;
        sources[i].dataset.field2 = field2;
        sources[i].dataset.field3 = field3;
        sources[i].dataset.field4 = field4;

        rows = rows.filter(function (str) {
            return str.indexOf(name) === -1;
        });
    }
    getUsers((level));
}

// Fetch the user data files
async function getUsers(level) {
    const response = await fetch('/data/users.csv');
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
        let street = split[7];
        let email = split[8];
        let buyingChannel = split[9];
        let interest = split[10];
        let purchase = split[11];

        //Randomly choose a male or female first name and combine with a last name
        var randomNumber = getRandomInt(0, 1);
        var randomFirstName = split[randomNumber];
        if (randomNumber === 0) {
            sex = "Male";
        } else {
            sex = "Female";
        }
        // Combine names to single span
        name = randomFirstName + " " + lastName;
        // Randomise user ID
        users[i].children[0].textContent = "#" + getRandomInt(200000, 400000);
        // Randomise name
        var span = document.createElement("span");
        span.classList.add("name");
        span.title = "Name";
        span.style.display = "none";
        span.textContent = name;
        users[i].append(span);
        // Randomise sex
        var span = document.createElement("span");
        span.classList.add("sex");
        span.title = "Sex";
        span.style.display = "none";
        span.textContent = sex;
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
        span.title = "Date of birth";
        span.style.display = "none";
        span.textContent = dob;
        users[i].append(span);
        // Randomise phone number
        phoneNumber = "+447" + getRandomInt(123456789, 999999999);
        var span = document.createElement("span");
        span.classList.add("phoneNumber");
        span.title = "Mobile number";
        span.style.display = "none";
        span.textContent = phoneNumber;
        users[i].append(span);
        // Randomise email
        emailAddress = (randomFirstName.slice(0, 1) + "." + lastName + "@" + email + ".com").toLowerCase();
        var span = document.createElement("span");
        span.classList.add("emailAddress");
        span.title = "Email address";
        span.style.display = "none";
        span.textContent = emailAddress;
        users[i].append(span);
        // Randomise address
        var streetNumber = getRandomInt(0, 99);
        address = streetNumber + " " + street;
        var span = document.createElement("span");
        span.classList.add("address");
        span.title = "Address";
        span.style.display = "none";
        span.textContent = address;
        users[i].append(span);
        //Randomise postcode
        postcode = getRandomChar() + getRandomChar() + getRandomInt(0, 9) + getRandomInt(0, 9) + " " + getRandomInt(0, 9) + getRandomChar() + getRandomChar();
        var span = document.createElement("span");
        span.classList.add("postcode");
        span.title = "Postcode";
        span.style.display = "none";
        span.textContent = postcode;
        users[i].append(span);
        // Randomise occupation
        var span = document.createElement("span");
        span.classList.add("occupation");
        span.title = "Occupation";
        span.style.display = "none";
        span.textContent = occupation;
        users[i].append(span);
        // Randomise marital
        var span = document.createElement("span");
        span.classList.add("marital");
        span.title = "Marital status";
        span.style.display = "none";
        span.textContent = marital;
        users[i].append(span);
        // Randomise homeType
        var span = document.createElement("span");
        span.classList.add("homeType");
        span.title = "Home type";
        span.style.display = "none";
        span.textContent = homeType;
        users[i].append(span);
        // Randomise homeOwnership
        var span = document.createElement("span");
        span.classList.add("homeOwnership");
        span.title = "Home ownership";
        span.style.display = "none";
        span.textContent = homeOwnership;
        users[i].append(span);
        // Randomise salary
        salary = getRandomInt(12000, 70000);
        var salaryStart = String(salary).substring(0, 2);
        var salaryEnd = String(salary).substring(2);
        var span = document.createElement("span");
        span.classList.add("salary");
        span.title = "Estimated income";
        span.style.display = "none";
        span.textContent = "$" + salaryStart + "," + salaryEnd;
        users[i].append(span);
        // Randomise buyingChannel
        var span = document.createElement("span");
        span.classList.add("buyingChannel");
        span.title = "Preferred buying channel";
        span.style.display = "none";
        span.textContent = buyingChannel;
        users[i].append(span);
        // Randomise monthly orders
        var monthlyOrders = getRandomInt(0, 45);
        var span = document.createElement("span");
        span.classList.add("monthlyOrders");
        span.title = "Average monthly orders";
        span.style.display = "none";
        span.textContent = monthlyOrders;
        users[i].append(span);
        // Randomise loan history
        var loanHistory = getRandomInt(0, 10);
        var span = document.createElement("span");
        span.classList.add("loanHistory");
        span.title = "Loan history";
        span.style.display = "none";
        span.textContent = loanHistory;
        users[i].append(span);
        // Randomise interests
        var span = document.createElement("span");
        span.classList.add("interest");
        span.title = "Interest";
        span.style.display = "none";
        span.textContent = interest;
        users[i].append(span);
        // Randomise last purchase
        var span = document.createElement("span");
        span.classList.add("purchase");
        span.title = "Last purchase";
        span.style.display = "none";
        span.textContent = purchase;
        users[i].append(span);


    }
    getLevelUsers((level));
    getSegments((level));
}

// Fetch the segment data files
async function getSegments(level) {
    const response = await fetch('/data/' + (level) + '/segments.csv');
    const data = await response.text();
    // Sort the data into arrays
    let rows = data.split('\n').slice(1);
    let segments = document.querySelectorAll('.segment');

    // Loop through cards and randomise without repeats
    for (i = 0; i < segments.length; i++) {
        let randomise = rows[Math.floor(Math.random() * rows.length)];
        let split = randomise.split(',');
        let name = split[0];
        let description = split[1];
        let ethics = split[2];
        let link = split[3];

        segments[i].children[0].textContent = name;
        segments[i].title = description;
        segments[i].dataset.ethics = ethics;
        segments[i].dataset.link = link;
        rows = rows.filter(function(str) {
            return str.indexOf(name) === -1;
        });
    }
    getClients((level));
}

// Fetch client the data files
async function getClients(level) {
    const response = await fetch('/data/' + (level) + '/clients.csv');
    const data = await response.text();
    console.log((level));
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
        let link = split[4];
        // Swap out any price that is 0 with FREE
        if (price === "0") {
            price = "FREE";
        } else {
            price = "$" + price;
        }

        clients[i].children[0].textContent = name;
        clients[i].children[1].textContent = price;
        clients[i].dataset.ethics = ethics;
        clients[i].dataset.link = link;
        
        rows = rows.filter(function(str) {
            return str.indexOf(name) === -1;
        });
    }
}

let uniqueSpan1;
let uniqueSpan2;
let uniqueSpan3;
let uniqueSpan4;
let uniqueLink;
// Fetch the user data files
async function getLevelUsers(level) {
    const response = await fetch('/data/' + (level) + '/users.csv');
    const data = await response.text();
    // Sort the data into arrays
    let rows = data.split('\n').slice();
    let users = document.querySelectorAll('.user');
    for (i = 0; i < users.length + 1; i++) {
    // Loop through cards 
        let order = rows[i];
        let split = order.split(',');
        let uniqueData1 = split[0]
        let uniqueData2 = split[1];
        let uniqueData3 = split[2];
        let uniqueData4 = split[3];
        let uniqueData5;
        let uniqueData6;
        let link = split[4];
        if (i < 1) {
            if ((level) == "Applicant") {
                uniqueSpan1 = document.querySelectorAll('.' + uniqueData1);
            }
            else {
            uniqueSpan1 = document.querySelectorAll('.' + uniqueData1);
            uniqueSpan2 = document.querySelectorAll('.' + uniqueData2);
            uniqueSpan3 = document.querySelectorAll('.' + uniqueData3);
            uniqueSpan4 = document.querySelectorAll('.' + uniqueData4);
            uniqueSpan5 = document.querySelectorAll('.sex');
            uniqueSpan6 = document.querySelectorAll('.marital');
            }
        }        
        
        if (i >= 1) {
                uniqueSpan1[i-1].textContent = uniqueData1;
                users[i-1].dataset.link = link;
            if ((level) == "Manager") {
                uniqueSpan5[i-1].textContent = "Female";
                uniqueSpan6[i-1].textContent = "Single";
            }
            if (uniqueData2.isInteger) {     
                uniqueData2 = "$" + uniqueData2.slice(0, 2) + "," + uniqueData2.slice(2);
            }
            else {
                uniqueSpan2[i-1].textContent = uniqueData2;
            }
            uniqueSpan3[i-1].textContent = uniqueData3;
            uniqueSpan4[i-1].textContent = uniqueData4;
            users[i-1].dataset.link = link;
    
        }
    }
}
/*
function checkLinks(link) {
    let clients = document.querySelectorAll('.client');
    let users = document.querySelectorAll('.user');
    let divideUsers = (users.length / clients.length);
    let linkedUsers = users[Math.floor(Math.random() * users.length)];
    // Charity in postcode
    if ((link) === "charityinPostcode") {
        let linkedUsers = users[Math.floor(Math.random() * users.length)];
        let linkedUsersPostcode = linkedUsers.children[7];
        linkedUsers.setAttribute("data-link", "charityinPostcode");
        linkedUsersPostcode.textContent = "SK49 " + getRandomInt(0, 9) + getRandomChar() + getRandomChar();
    }
    if ((link) === "onlineRetailer") {
        let linkedUsers =  users[i];
        linkedUsers.setAttribute("data-link", "onlineRetailer");
    }
    // Automotive manufactuer
    if ((link) === "luxuryCarManufacturer")  {
        let linkedUsers = users[i];
        linkedUsers.setAttribute("data-link", "luxuryCarManufacturer");
        let linkedUsersDob = linkedUsers.children[3]
        let linkedUsersSalary = linkedUsers.children[12];
        // Randomise date of birth            
        var day = getRandomInt(1, 30);
        var month = getRandomInt(1, 12);
        var year = getRandomInt(1946, 1964);
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }         
        linkedUsersDob.textContent = day + "/" + month + "/" + year;
        linkedUsersSalary.textContent = ("$" + getRandomInt(50, 150) + "," + getRandomInt(100, 999));
    }
}
*/
let totalEthics = 0;
function ethicsCounter(number) {
    totalEthics = (parseInt(totalEthics) + parseInt((number)));
    console.log(totalEthics);
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