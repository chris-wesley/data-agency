// Grab all the interactive items
const sections = document.querySelectorAll('.section');
const cards = document.querySelectorAll('.card');

const draggableSource = new Draggable.default(document.querySelectorAll('.sources'), {
    draggable: '.source',
    mirror: {
        appendTo: 'body',
        constrainDimensions: true,
    }
});

draggableSource.on('drag:start', (event) => {
    draggableSourceOrigin = event.originalSource.dataset.dropzone;
    originalSource = event.originalSource;
    draggedPrice = (originalSource.getElementsByClassName("sourcePrice")[0].textContent);
    console.log('drag:start');
});

draggableSource.on('drag:move', () => console.log('drag:move'));

draggableSource.on('drag:over', () => console.log('drag:over'));

draggableSource.on('drag:over:container', () => console.log('drag:over:container'));

draggableSource.on('drag:out:container', () => {
    console.log('drag:out:container');
    buySource(originalSource);
});

draggableSource.on('drag:stop', () => {
    console.log('drag:stop');
});

draggableSource.on('mirror:create', () => console.log('mirror:create'));

draggableSource.on('mirror:created', () => console.log('mirror:created'));

draggableSource.on('mirror:attached', (event) => {
    console.log('mirror:attached');
});

draggableSource.on('mirror:move', () => console.log('mirror:move'));

draggableSource.on('mirror:destroy', (event) => {
    console.log('mirror:destroy');
    reduceScore(event.mirror);
});


// Check the card is dropping in the right section
function cardRules() {
    var source = document.getElementsByClassName('source');
    var sources = document.getElementById('sources');
    if (source.parent !== sources) {
        sources.appendChild(source[0]);
    }
}