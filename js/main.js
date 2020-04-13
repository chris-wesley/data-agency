const sections = document.querySelectorAll('.section');
const cards = document.querySelectorAll('.card');

let draggedItem = null;

for (let i = 0; i < cards.length; i++) {
	const card = cards[i];
    card.draggable = true;

	card.addEventListener('dragstart', function () {
		draggedCard = card;
		requestAnimationFrame(function () {
			card.style.display = 'none';
		}, 0)
	});

	card.addEventListener('dragend', function () {
		requestAnimationFrame(function () {
			draggedCard.style.display = 'block';
			draggedCard = null;
		}, 0);
	})
}


for (let j = 0; j < sections.length; j ++) {
	const section = sections[j];

	section.addEventListener('dragover', function (event) {
		event.preventDefault();
	});
		
	section.addEventListener('dragenter', function (event) {
		event.preventDefault();
		this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
	});

	section.addEventListener('dragleave', function (event) {
		this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
	});

	section.addEventListener('drop', function (event) {
		console.log('drop');
		this.append(draggedCard);
		this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
	});
}