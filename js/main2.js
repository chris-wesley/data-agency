let dragged; // Keeps track of what's being dragged - we'll use this later!

function onDragOver(event) {
  // Prevent default to allow drop
  event.preventDefault();
}

function onDragLeave(event) {
  event.target.style.backgroundColor = 'red';
}

function onDragEnter(event) {
  const target = event.target;
  if (target && dragged) {
      event.preventDefault();
      // Set the dropEffect to move
      event.dataTransfer.dropEffect = 'move';
      target.style.backgroundColor = 'orange';
  }
}

function onDrop(event) {
  const target = event.target;
  if (target && dragged) {
    target.style.backgroundColor = 'green';
    event.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    dragged.parentNode.removeChild(dragged);
    dragged.style.opacity = '';
    target.appendChild(dragged);
  }
}

function onDragStart(event) {
  let target = event.target;
  if (target && target.classList == 'card') { // If target is an image
    dragged = target;
    event.dataTransfer.setData('text', target.id);
    event.dataTransfer.dropEffect = 'move';
    // Make it half transparent when it's being dragged
    event.target.style.opacity = .3;
  }
}

function onDragEnd(event) {
  if (event.target && event.target.className == 'card') {
    // Reset the transparency
    event.target.style.opacity = ''; // Reset opacity when dragging ends 
    dragged = null; 
  }
}

// Allow all cards to be draggable
var cards = document.querySelectorAll('.card');
for (var i = 0, n = cards.length; i < n; i++) {
    var card = cards[i];
    card.draggable = true;
};
card.addEventListener('dragstart', onDragStart);
card.addEventListener('dragend', onDragEnd);




var section = document.querySelector('#users');
section.addEventListener('drop', onDrop);
section.addEventListener('dragenter', onDragEnter);
section.addEventListener('dragleave', onDragLeave);
section.addEventListener('dragover', onDragOver);