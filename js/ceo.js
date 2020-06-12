/* CEO level */

// Initial game variables
let level = "CEO";
let upcomingLevel = "Summary";
currentLevel(level);

startingScore(100000);

populateDashboard(3, 6, 2, 2);

startLevel();

createMessage(
	"board",
	"old",
	"Board of Directors",
	"The recent scandals have brought unwelcome attention, it’s bad for business. Fix this mess now and bring home the profits we expect."
);