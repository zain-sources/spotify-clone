var player = new Audio();
var is_playing = false;
player.src = '/public/audios/songs/audio.mp3';



document.getElementById('play-btn').addEventListener('click', function () {
    playSong();
});

document.getElementById('pause-btn').addEventListener('click', function () {
    pauseSong();
});

player.addEventListener("timeupdate", function () {
    current_time = player.currentTime
    duration = player.duration
    position = current_time / duration * 100
    document.getElementById('progress-circle').style.left = `calc(${position}% - 7px)`
    updateTime(current_time, duration)
})

document.getElementById("time-line").addEventListener("click", function (e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;
    player.currentTime = player.duration * percentage;
    console.log(rect)

    if (is_playing) {
        pauseSong()
        updateTime(player.currentTime, player.duration)
        updateCircle(percentage * 100)
        playSong()
    } else {
        updateTime(player.currentTime, player.duration)
        updateCircle(percentage * 100)
    }
})


function playSong() {
    player.play();
    document.getElementById('play-btn').style.display = 'none';
    document.getElementById('pause-btn').style.display = 'block';
    is_playing = true;
}

function pauseSong() {
    player.pause();
    document.getElementById('pause-btn').style.display = 'none';
    document.getElementById('play-btn').style.display = 'block';
    is_playing = false;
}

function updateCircle(percentage) {
    document.getElementById('progress-circle').style.left = `calc(${percentage}% - 7px)`
}



function updateTime(currentTime, duration) {
    document.getElementById('song-time').innerText = `${formatTime(currentTime)} / ${formatTime(duration)}`
}

function formatTime(time) {
    const seconds = Math.floor(time);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}



