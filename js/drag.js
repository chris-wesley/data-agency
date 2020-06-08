/* Drag and Drop */

// Declare the variables for drag and drop
let draggedCard;
let draggedCardType;
let draggedCardName;
let dropSection;
let dropSectionType;
let cardDraggedOver;

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
    draggedCard = event.currentTarget;
    draggedCardType = event.currentTarget.classList.item(1);
    draggedCardName = event.currentTarget.children[0].textContent;
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
    //console.log(this, 'dragover');
}

// Dragging card enters a section
function dragEnter(event) {
    this.style.backgroundColor = "whitesmoke";
    //console.log(this.id, 'dragenter');
}

// Dragging card leaves a section
function dragLeave(event) {
    this.style.backgroundColor = "white";
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
            let span = document.createElement("span");
            dropSection.children[i].insertBefore(span, this.children[i].children[1]);
            dropSection.children[i].children[1].textContent = draggedCardName;
            dropSection.children[i].classList.remove("empty");
        }
        for (i = 0; i < this.children.length - 1; i++) {
            // Array of possible datafields
            let fieldCheck = [
                "name",
                "gender",
                "dob",
                "phoneNumber",
                "emailAddress",
                "address",
                "postcode",
                "occupation",
                "marital",
                "homeType",
                "homeOwnership",
                "religon",
                "ethnic",
                "salary"
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
        draggedCard.style.display = "none";
        removeMessage();
        createMessage(
            "analyst",
            "explaining",
            "Recruitment",
            "Now you can see the individual datafields underneath the user ID, find a datafield that matches to the segment"
        );
    }
    // User to segments transfer
    else if ((!draggedCard.classList.contains("empty")) && (draggedCardType === "user") && (dropSectionType == "segments")) {
        let span = document.createElement("span");
        cardDraggedOver.appendChild(span).textContent = draggedCardName;
        cardDraggedOver.classList.remove("empty");
        draggedCard.style.display = "none";
        removeMessage();
        createMessage(
            "analyst",
            "explaining",
            "Recruitment",
            "When all your users are sorted, make sure each segment is delivered to the corresponding client."
        );
    }
    // Segment to clients transfer
    else if ((!draggedCard.classList.contains("empty")) && (draggedCardType === "segment") && (dropSectionType == "clients")) {
        increaseScore(cardDraggedOver);
        cardDraggedOver.children[1].textContent = draggedCardName;
        cardDraggedOver.classList.remove("empty");
        draggedCard.style.display = "none";
        let clients = document.querySelectorAll('.client');
        for (i = 0; i < clients.length; i++) {
            if (!clients[i].classList.contains("empty")) {
                pauseCountdown();
                removeMessage();
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

            }
        }
    }
    //console.log(this.id, 'dragdrop');
}

// Dragging card is released
function dragEnd(event) {
    event.preventDefault();
    //console.log(this.id, 'dragend');
}