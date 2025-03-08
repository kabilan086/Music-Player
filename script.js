let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let currentTimeDisplay = document.getElementById("current-time");
let totalDurationDisplay = document.getElementById("total-duration");
let songTitle = document.querySelector("h1");
let artistName = document.querySelector("p");
let songImg = document.querySelector(".song-img");

let songs = [
    {
        title: "Despacito",
        artist: "Luis Fonsi Ft. Puerto Rican",
        src: "song-english-edm-296526.mp3",
        img: "468-thumbnail.png"
    },
    {
        title: "Paro",
        artist: "Nej",
        src: "Paro Nej 128 Kbps.mp3",
        img: "Paro_cover.jpg"
    },
    {
        title: "Play Date",
        artist: "Lilly Brooks",
        src: "Play Date Lilly Brooks 128 Kbps.mp3",
        img: "maxresdefault.jpg"
    }
];

let currentSongIndex = 0;


function loadSong(index) {
    let songData = songs[index];
    song.src = songData.src;
    songTitle.textContent = songData.title;
    artistName.textContent = songData.artist;
    songImg.src = songData.img;

    
    song.load();
    song.onloadedmetadata = function () {
        progress.max = song.duration;
        progress.value = song.currentTime;
        totalDurationDisplay.textContent = formatTime(song.duration);
    };
}


function playPause() {
    if (song.paused) {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    } else {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
}


setInterval(() => {
    progress.value = song.currentTime;
    currentTimeDisplay.textContent = formatTime(song.currentTime);
}, 500);


progress.oninput = function () {
    currentTimeDisplay.textContent = formatTime(progress.value);
};

progress.onchange = function () {
    song.currentTime = progress.value;
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
};


function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}


function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}


function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}


song.addEventListener("ended", nextSong);


loadSong(currentSongIndex);
