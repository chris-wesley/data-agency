/* Applicant level */

// Initial game variables
let ethicalCounter = 0;
let scoreCounter = 0;
currentLevel("Applicant");

startingScore(50);

populateDashboard(1, 1, 1, 1);

toggleDashboard();
toggleContext();


changeContext(
	"Data brokers buy, analyse and sell our personal data for profit - but most of us aren’t aware of the unethical practices that take place until it is too late.",
	"Data Agency is an interactive experience in which you are a data broker, forced to choose between ethics and profits. Will your decisions have consequences?",
	"Continue"
);

changePopup(
	"Recruitment",
	"At Data Agency, we connect our clients to users. We buy user data, analyse it and sell the packaged results. As an intern, you’ll be manually sorting through the data. Have you got what it takes?",
	"I've got what it takes!",
	"I've got what it takes!"
);

changeMessage(
	"Recruitment",
	"analyst",
	"explaining",
	"You’ve been tasked with finding potential donors for a charity. They want to target users in their local area to increase their fundraising efforts."
);