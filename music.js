let progress = document.getElementById("progress");
let song = document.getElementById("gana");
let ctrl = document.getElementById("ctrl");
const pehlagana = document.getElementById("pehla-gana");
const dusragana = document.getElementById("dusra-gana");
const backButtons = document.querySelectorAll(".back");
const nextButtons = document.querySelectorAll(".next");
const play = document.getElementsByClassName(".play");
const songs = [
    "./music-media/abhi-na-jao.mpeg",
    "./music-media/ye dil tum bin.mp3",
    "./music-media/ye raatein.mp3",
    "./music-media/rafta rafta.mp3"
];

let songCards = document.querySelectorAll(".container");

let currentSongIndex = 0;

song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
}


function pausePlay(){
    if (ctrl.classList.contains("bi-play-circle-fill")) {
        song.play();
        ctrl.classList.remove("bi-play-circle-fill");
        ctrl.classList.add("bi-pause-circle-fill");
    } else {
        song.pause();
        ctrl.classList.remove("bi-pause-circle-fill");
        ctrl.classList.add("bi-play-circle-fill");
    }
}

if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime; 
    },500)
}
progress.onchange = function(){
    song.play();
    song.currentTime = progress.value;
}
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



