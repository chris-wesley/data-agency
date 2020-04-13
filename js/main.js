let dragged; 

var section = document.querySelector('#users');
var cards = document.querySelectorAll('.card');
for (var i = 0, n = cards.length; i < n; i++) {
    var card = cards[i];
    card.draggable = true;
};


function onDragStart(event) {
  let target = event.target;
  if (target == 'card') { // If target is an image
      dragged = target;
      event.dataTransfer.setData('text', target.id);
      event.dataTransfer.dropEffect = 'move';
      // Make it half transparent
      event.target.style.opacity = '';
  }
}

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

function onDragEnd(event) {
  if (event.target == card) {
      // Reset the transparency
      event.target.style.opacity = ''; // reset opacity when drag ends 
      dragged = null; 
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

// Adding event listeners
card.addEventListener('dragstart', onDragStart);
card.addEventListener('dragend', onDragEnd);
section.addEventListener('drop', onDrop);
section.addEventListener('dragenter', onDragEnter);
section.addEventListener('dragleave', onDragLeave);
section.addEventListener('dragover', onDragOver);