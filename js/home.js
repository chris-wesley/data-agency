// Toggle music and sound
function toggleMute() {
    var sound = document.getElementById("sound");
    var icon = document.getElementById("icon");
    icon.src = "../images/sound-off.svg";
    sound.muted = !sound.muted;
    if (!sound.muted) {
        icon.src = "../images/sound-on.svg";
    }
};