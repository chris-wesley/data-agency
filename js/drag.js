/* Drag and Drop */

// Declare the variables for drag and drop
let draggedCard;
let draggedCardType;
let draggedCardName;
let draggedCardEthics;
let draggedCardLink;
let dropSection;
let dropSectionType;
let cardDraggedOver;
let cardDraggedOverEthics;
let cardDraggedOverLink;

// Add event listeners to all cards and sections
cards.forEach(card => card.addEventListener('dragstart', dragStart));
cards.forEach(card => card.addEventListener('drag', drag));
sections.forEach(section => section.addEventListener('dragenter', dragEnter));
cards.forEach(card => card.addEventListener('dragover', dragOver));
sections.forEach(section => section.addEventListener('dragleave', dragLeave));
sections.forEach(section => section.addEventListener('drop', dragDrop));
cards.forEach(card => card.addEventListener('dragend', dragEnd));

// Card begins dragging
function dragStart(event) {
    this.style.cursor = "grabbing";
    draggedCard = event.currentTarget;
    draggedCardType = event.currentTarget.classList.item(1);
    draggedCardName = event.currentTarget.children[0].textContent;
    draggedCardEthics = event.currentTarget.dataset.ethics;
    draggedCardLink = event.currentTarget.dataset.link;
    //console.log(this.id, 'dragstart');
}

function drag(event) {
    event.preventDefault();
    //console.log(this.id, 'drag');
}

// Dragging card is over another card
function dragOver(event) {
    event.preventDefault();
    cardDraggedOver = this;
    cardDraggedOverEthics = this.dataset.ethics;
    cardDraggedOverLink = this.dataset.link;
    //console.log(this, 'dragover');
}

// Dragging card enters a section
function dragEnter(event) {
    //console.log(this.id, 'dragenter');
}

// Dragging card leaves a section
function dragLeave(event) {
    //console.log(this.id, 'dragleave');
}

// Dragging card drops on a section or card 
function dragDrop(event) {
    event.preventDefault();
    dropSection = this;
    dropSectionType = this.id;

    // Source to users transfer
    if ((draggedCardType === "source") && (dropSectionType == "users")) {
        for (i = 1; i < this.children.length; i++) {
            dropSection.children[i].classList.remove("empty");
        }
        for (i = 0; i < this.children.length - 1; i++) {
            // Array of possible datafields
            let fieldCheck = [
                "name",
                "sex",
                "dob",
                "phoneNumber",
                "emailAddress",
                "address",
                "postcode",
                "occupation",
                "marital",
                "homeType",
                "homeOwnership",
                "salary",
                "buyingChannel",
                "monthlyOrders",
                "loanHistory",
                "interest",
                "purchase"
            ];
            let dataSpan1 = document.querySelectorAll("." + draggedCard.dataset.field1);
            let dataSpan2 = document.querySelectorAll("." + draggedCard.dataset.field2);            
            let dataSpan3 = document.querySelectorAll("." + draggedCard.dataset.field3);            
            let dataSpan4 = document.querySelectorAll("." + draggedCard.dataset.field4);
            // Check if dragged card contains any valid datafields
            if (fieldCheck.includes(draggedCard.dataset.field1)) {
                dataSpan1[i].style.display = "inline-block";
            }
            if (fieldCheck.includes(draggedCard.dataset.field2)) {
                dataSpan2[i].style.display = "inline-block";
            }
            if (fieldCheck.includes(draggedCard.dataset.field3)) {
                dataSpan3[i].style.display = "inline-block";
            }
            if (fieldCheck.includes(draggedCard.dataset.field4)) {
                dataSpan4[i].style.display = "inline-block";
            }
        }
        reduceScore(draggedCard);
        ethicsCounter(draggedCardEthics);
        draggedCard.style.display = "none";
        if (level == "Applicant") {
            removeMessage();
            createMessage(
                "analyst",
                "explaining",
                "Recruitment",
                "Now you can see the individual datafields underneath the user ID, find a datafield that matches to the segment"
            );
            hideMessage();
        }
        tone.play();
    }
    // User to segments transfer
    else if ((!draggedCard.classList.contains("empty")) && (draggedCardType === "user") && (dropSectionType == "segments") && (draggedCardLink.match(cardDraggedOverLink))) {
        let span = document.createElement("span");
        cardDraggedOver.appendChild(span).textContent = draggedCardName;
        cardDraggedOver.classList.remove("empty");
        draggedCard.style.display = "none";
        ethicsCounter(cardDraggedOverEthics);
        if (level == "Applicant") {
            removeMessage();
            createMessage(
                "analyst",
                "explaining",
                "Recruitment",
                "When all your users are sorted, make sure each segment is delivered to the corresponding client."
            );
            hideMessage();
        }
        tone.play();
    }
    // Segment to clients transfer
    else if ((!draggedCard.classList.contains("empty")) && (draggedCardType === "segment") && (dropSectionType == "clients") && (cardDraggedOverLink.match(draggedCardLink))) {
        increaseScore(cardDraggedOver);
        cardDraggedOver.children[1].textContent = draggedCardName;
        cardDraggedOver.classList.remove("empty");
        draggedCard.style.display = "none";
        ethicsCounter(cardDraggedOverEthics);
        let clients = document.querySelectorAll('.client');
                pauseCountdown();
                if (level == "Applicant") {
                    hideMessage();
                    createPopup(
                        "analyst",
                        "explaining",
                        "Recruitment",
                        "Good job! You’ve been given the internship, obviously you’ll need to pick up the pace - time is money!",
                        "Great, I'm on it!",
                        nextLevel,
                        "Okay, I'll try",
                        nextLevel
                    );
                showPopup1();
                levelUp.play();
                }
                if (level == "Intern") {
                    if ((!clients[0].classList.contains("empty")) && (!clients[1].classList.contains("empty"))) {
                    hideMessage();
                    createPopup(
                        "analyst",
                        "explaining",
                        "Analyst",
                        "Excellent work, You’ve been promoted to Analyst! We’ve found more lucrative segments to target - get to work.",
                        "Okay, I will do!",
                        nextLevel,
                        "Sure, I'll be right on it",
                        nextLevel
                    );
                showPopup1();
                levelUp.play();
                }
                }
                if (level == "Analyst") {
                    if ((!clients[0].classList.contains("empty")) && (!clients[1].classList.contains("empty"))) {
                    hideMessage();
                    createPopup(
                        "manager",
                        "explaining",
                        "Manager",
                        "Good work, you’ve been promoted to Manager! There's a lot of money to be made",
                        "Thanks, I'll get going!",
                        nextLevel,
                        "Okay, I'll try my best",
                        nextLevel
                    );
                showPopup1();
                levelUp.play();
                }
                }
                if (level == "Manager") {
                    if ((!clients[0].classList.contains("empty")) && (!clients[1].classList.contains("empty"))) {
                    hideMessage();
                    createPopup(
                        "ceo",
                        "explaining",
                        "CEO",
                        "Congratulations, you're replacing me as CEO. Just remember, you're now responsible for any scandals...",
                        "Okay",
                        nextLevel,
                        "I'll be careful",
                        nextLevel
                    );
                showPopup1();
                levelUp.play();
                }
                }
                if (level == "CEO") {
                    if ((!clients[0].classList.contains("empty")) && (!clients[1].classList.contains("empty"))) {
                    hideMessage();
                    createPopup(
                        "board",
                        "old",
                        "Board of Directors",
                        "A government enquiry has been launched to find the person responsible for the breaches in privacy. This happened under your watch so you’re to blame!",
                        "Your targets were unrealistic!",
                        nextLevel,
                        "I tried my best...",
                        nextLevel
                    );
                showPopup1();
                levelUp.play();
                }
                }
                } 
    //console.log(this.id, 'dragdrop');
}

// Dragging card is released
function dragEnd(event) {
    this.style.cursor = "grab";
    event.preventDefault();
    //console.log(this.id, 'dragend');
}
