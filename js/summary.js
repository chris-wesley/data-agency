/* Summary level */

// Initial game variables
let level = "Summary";
let upcomingLevel = "Summary";
currentLevel(level);

startingScore(10000);

populateDashboard(3, 6, 2, 2);

startLevel();

hideDashboard();

createContext(
	"There’s still a lot we don’t know about the data brokerage industry, here’s 3 things you can do to get control over your personal data.",
	"1. Reduce your digital footprint using the Data Detox Kit. 2. Contact data brokers to opt-out of their processing. 3. Share this experience with family and friends.",
	"Take action",
	takeAction
);