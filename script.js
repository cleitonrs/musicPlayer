// let musics = ['./assets/AnySpecialOrders.mp3', './assets/NeverStopLearning.mp3', './assets/VengeanceInstrumental.mp3']

let musics = [
    {
        music: "./assets/AnySpecialOrders.mp3", 
        musicName: "Any Special Orders", 
        capa: "./img/Nice-music-symbol.jpg"
    },
    {
        music: "./assets/NeverStopLearning.mp3", 
        musicName: "Never Stop Learning", 
        capa: "./img/mus.jpg"
    },
    {
        music: "./assets/VengeanceInstrumental.mp3", 
        musicName: "Vengeance", 
        capa: "./img/music.jpg"
    }
]

let play = document.getElementById('play')
let step_backward = document.getElementById('step_backward')
let stop = document.getElementById('stop')
let step_forward = document.getElementById('step_forward')
let vol_down = document.getElementById('vol_down')
let vol_up = document.getElementById('vol_up')
let mute = document.getElementById('mute')
let audio = document.getElementById('audio')
let range = document.getElementById('range')
let img = document.getElementById('img')
let time =document.getElementById('time')
let music_Name = document.querySelector('.musicName')

let musicIndex = 0

play.addEventListener('click', playMusic)
stop.addEventListener('click', stopMusic)
mute.addEventListener('click', muter)
vol_down.addEventListener('click', volDow)
vol_up.addEventListener('click', volUp)
step_forward.addEventListener('click', forward)
step_backward.addEventListener('click', backward)
music_Name.innerHTML = musics[0]["musicName"]



function playMusic() {
    if (audio.paused) {
        play.classList.replace("fa-play-circle", "fa-pause-circle")
        audio.play()
        img.style.filter = "grayscale(0)"
    } else {
        play.classList.replace("fa-pause-circle", "fa-play-circle")
        audio.pause()
        img.style.filter = "grayscale(1)"
    }
}

function stopMusic() {
    audio.pause()
    audio.currentTime = 0
    play.classList.replace("fa-pause-circle", "fa-play-circle")
    img.style.filter = "grayscale(1)"
}

function muter() {
    if (audio.muted == false) {
        mute.classList.replace("fa-volume-off", "fa-volume-mute")
        audio.muted = true
    } else {
        mute.classList.replace("fa-volume-mute", "fa-volume-off")
        audio.muted = false
    }
}

function forward() {
    if (musicIndex < 2) {
        musicIndex += 1
        audio.setAttribute('src', musics[musicIndex]["music"])
        img.setAttribute('src', musics[musicIndex]["capa"])
        music_Name.innerHTML = musics[musicIndex]["musicName"]
        play.classList.replace("fa-play-circle", "fa-pause-circle")
        img.style.filter = "grayscale(0)"
        audio.play()
    }
}

function backward() {
    if (musicIndex > 0) {
        musicIndex -= 1
        audio.setAttribute('src', musics[musicIndex]["music"])
        img.setAttribute('src', musics[musicIndex]["capa"])
        music_Name.innerHTML = musics[musicIndex]["musicName"]
        play.classList.replace("fa-play-circle", "fa-pause-circle")
        img.style.filter = "grayscale(0)"
        audio.play()
    }
}

function volDow() {
    audio.volume -= 0.1
    if (audio.volume == 0.0) {
        vol_down.classList.replace("fa-volume-down", "fa-volume-off")
    }
}

function volUp() {
    audio.volume += 0.1
}

range.addEventListener("input", () => {
    audio.currentTime = range.value
})

function timeBar() {
    range.setAttribute("max", audio.duration)
    range.value = audio.currentTime

    let min = Math.floor(audio.currentTime / 60)
    let displayMin = (min < 10 ? '0' : '') + min
    let sec = Math.round(audio.currentTime % 60)
    let displaySec = (sec < 10 ? '0' : '') + sec
    time.innerHTML = `${displayMin} : ${displaySec}`

    if (range.value == parseInt(audio.duration)) {
        play.classList.replace("fa-pause-circle", "fa-play-circle")
        img.style.filter = "grayscale(1)"
    }
}

setInterval(timeBar, 1000)