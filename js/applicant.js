/* Applicant level */

// Initial game variables
let ethicalCounter = 0;
let scoreCounter = 0;
currentLevel("Applicant");

startingScore(50);

populateDashboard(1, 1, 1, 1);

hideDashboard();

createContext(
	"Data brokers buy, analyse and sell our personal data for profit - but most of us aren’t aware of the unethical practices that take place until it is too late.",
	"Data Agency is an interactive experience in which you are a data broker, forced to choose between ethics and profits. Will your decisions have consequences?",
	"Continue",
	removeContext
);

createPopup2(
	"analyst",
	"explaining",
	"Recruitment",
	"You’ve been tasked with finding potential donors for a charity. They want to target users in their local area to increase their fundraising efforts.",
	"Okay, I'm ready",
	startLevel,
	"Let's get started!",
	startLevel
);

createPopup(
	"analyst",
	"explaining",
	"Recruitment",
	"At Data Agency, we connect our clients to users. We buy user data, analyse it and sell the packaged results. As an intern, you’ll be manually sorting through the data. Have you got what it takes?",
	"I'll give it a go",
	removePopup,
	"I've got what it takes!",
	removePopup
);

createMessage(
	"analyst",
	"explaining",
	"Recruitment",
	"This is the dashboard you’ll be working from. To begin, buy the data source on the left by dragging it into the users column."
);