// Load the data
getSources();
getUsers();
getSegments();
getClients();

var popupNameText = "Recruitment";
var popupContentText = "At Data Agency, we connect our clients to users. We buy user data, analyse it and sell the packaged results. As an intern, you’ll be manually sorting through the data. Have you got what it takes?";
var popupButtonLeftText = "I've got what it takes!";
var popupButtonRightText = "I'll give it a go";
var position = "Applicant";
currentLevel(position);
toggleDashboard();
togglePopup(popupNameText, popupContentText, popupButtonLeftText, popupButtonRightText, 55);
