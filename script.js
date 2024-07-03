var player = new Audio();
var is_playing = false;
player.src = '';



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

document.body.addEventListener("keydown", function (e) {
    if (e.key === ' ') {
        if (is_playing) {
            pauseSong()
        } else {
            playSong()
        }
    }
});

document.getElementById("time-line-container").addEventListener("click", function (e) {
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

document.getElementById("next-btn").addEventListener("click", function () {
    changeSong('public/audios/songs/Thunder.m4a')
    changeSongCard('public/images/songs/thunder.jpg', 'Thunder', 'Imagine Dragons')
});


player.addEventListener("ended", function () {
    pauseSong()
});


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


function changeSong(url) {
    if (is_playing) {
        pauseSong()
        player.src = url
        playSong()
    } else {
        player.src = url
    }
}



function changeSongCard(src, title, artist) {
    document.getElementById("song-card").querySelector("img").src = src
    document.getElementById("song-card").querySelector("h2").innerText = title
    document.getElementById("song-card").querySelector("p").innerText = artist
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

