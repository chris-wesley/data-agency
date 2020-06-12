/* Intern level */

// Initial game variables
let level = "Intern";
let upcomingLevel = "Analyst";
currentLevel(level);

startingScore(1000);

populateDashboard(2, 4, 2, 2);

startLevel();

createMessage(
	"analyst",
	"explaining",
	"Analyst",
	"Welcome to the agency, sort the users into the correct sections. You’re working with real data this time, so don’t mess it up."
);