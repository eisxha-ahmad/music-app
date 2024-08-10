let progressBars = document.querySelectorAll(".progress");
let song = document.getElementById("gana");
let ctrlButtons = document.querySelectorAll(".ctrl");
const backButtons = document.querySelectorAll(".back");
const nextButtons = document.querySelectorAll(".next");
const play = document.getElementsByClassName(".play");
const songs = [
    "./music-media/abhi-na-jao.mpeg",
    "./music-media/ye dil tum bin.mp3",
    "./music-media/ye raatein.mp3",
    "./music-media/rafta rafta.mp3",
    "music-media/tere-naina.mp3",
    "music-media/do-pal-ruka.mp3",
    "music-media/jane-wo-kese.mp3"
];
let songCards = document.querySelectorAll(".container");

let currentSongIndex = 0;
song.src = songs[currentSongIndex];



// song.onloadedmetadata = function(){
//     progress.max = song.duration;
//     progress.value = song.currentTime;
// }
// if(song.play()){
//     setInterval(()=>{
//         progress.value = song.currentTime; 
//     },500)
// }
// progress.onchange = function(){
//     song.play();
//     song.currentTime = progress.value;
// }

function updateProgressBars() {
    progressBars.forEach(progress => {
        progress.max = song.duration;
        progress.value = song.currentTime;
    });
}

song.onloadedmetadata = function() {
    updateProgressBars();
}
if(song.play()) {
    setInterval(updateProgressBars, 300);
}

progressBars.forEach(progress => {
    progress.onchange = function() {
        song.play();
        song.currentTime = progress.value;
    }
});


// function pausePlay(){
//     if (ctrl.classList.contains("bi-play-circle-fill")) {
//         song.play();
//         ctrl.classList.remove("bi-play-circle-fill");
//         ctrl.classList.add("bi-pause-circle-fill");
//     } else {
//         song.pause();
//         ctrl.classList.remove("bi-pause-circle-fill");
//         ctrl.classList.add("bi-play-circle-fill");
//     }
// }
function pausePlay(event) {
    const clickedCtrl = event.target;
    if (clickedCtrl.classList.contains("bi-play-circle-fill")) {
        song.play();
        clickedCtrl.classList.remove("bi-play-circle-fill");
        clickedCtrl.classList.add("bi-pause-circle-fill");
    } else {
        song.pause();
        clickedCtrl.classList.remove("bi-pause-circle-fill");
        clickedCtrl.classList.add("bi-play-circle-fill");
    }
}

ctrlButtons.forEach(ctrl => {
    ctrl.addEventListener('click', pausePlay);
});


function showCard (index){
    songCards.forEach((card, i)=>{
        card.style.display = i===index ? "block" : "none";
    });
}
nextButtons.forEach(next => {
    next.addEventListener('click', playNext)
});
function playNext (){
    song.pause();
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    song.src = songs[currentSongIndex];
    song.load();
    song.play();
    showCard(currentSongIndex);
}
backButtons.forEach(back =>{
    back.addEventListener('click', event =>{
        song.pause();
        currentSongIndex = (currentSongIndex-1 + songs.length)% songs.length;
        song.src = songs[currentSongIndex];
        song.load();
        song.play();
        showCard(currentSongIndex);
    })
})
showCard(currentSongIndex);
song.addEventListener('ended', playNext )



