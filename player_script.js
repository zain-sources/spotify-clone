var player = new Audio();
var is_playing = false;
player.src = '';
var is_playbar_showing = false;


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
    let song_cards = document.getElementById("songs").querySelectorAll('.right-card')
    let current_song_index = -1
    song_cards.forEach((card, index) => {
        if (card.getAttribute('data-songUrl') === decodeURI(extractImagePath(player.src))) {
            current_song_index = index
        }
        console.log(card.getAttribute('data-songUrl'))
    })
    if (current_song_index === -1) {
        console.log('No song is playing')
        return
    }
    if (current_song_index === song_cards.length - 1) {
        changeSong(song_cards[0].getAttribute('data-songUrl'))
        changeSongCard(src = song_cards[0].querySelector('img').src, title = song_cards[0].getAttribute('data-title'), artist = song_cards[0].getAttribute('data-artist'))
        playSong()
    } else {
        changeSong(song_cards[current_song_index + 1].getAttribute('data-songUrl'))
        changeSongCard(src = song_cards[current_song_index + 1].querySelector('img').src, title = song_cards[current_song_index + 1].getAttribute('data-title'), artist = song_cards[current_song_index + 1].getAttribute('data-artist'))
        playSong()
    }
});

document.getElementById("previous-btn").addEventListener("click", function () {
    let song_cards = document.getElementById("songs").querySelectorAll('.right-card')
    let current_song_index = -1
    song_cards.forEach((card, index) => {
        if (card.getAttribute('data-songUrl') === decodeURI(extractImagePath(player.src))) {
            current_song_index = index
        }
        console.log(card.getAttribute('data-songUrl'))
    }
    )
    if (current_song_index === -1) {
        console.log('No song is playing')
        return
    }
    if (current_song_index === 0) {
        changeSong(song_cards[song_cards.length - 1].getAttribute('data-songUrl'))
        changeSongCard(src = song_cards[song_cards.length - 1].querySelector('img').src, title = song_cards[song_cards.length - 1].getAttribute('data-title'), artist = song_cards[song_cards.length - 1].getAttribute('data-artist'))
        playSong()
    }
    else {
        changeSong(song_cards[current_song_index - 1].getAttribute('data-songUrl'))
        changeSongCard(src = song_cards[current_song_index - 1].querySelector('img').src, title = song_cards[current_song_index - 1].getAttribute('data-title'), artist = song_cards[current_song_index - 1].getAttribute('data-artist'))
        playSong()
    }
});


player.addEventListener("ended", function () {
    pauseSong()
});


function extractImagePath(imageUrl) {
    if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
        return imageUrl;
    }
    const url = new URL(imageUrl);
    if (url.hostname === location.hostname && url.port === location.port) {
        return url.pathname.slice(1);
    } else {
        return imageUrl;
    }
}



function playSong() {
    if (!is_playbar_showing) {
        document.querySelector('.playbar-container').style.filter = "opacity(1)";
        is_playbar_showing = true;
    }
    document.getElementById('play-btn').style.display = 'none';
    document.getElementById('pause-btn').style.display = 'block';
    player.play();
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


// function updateTime(currentTime, duration) {
//     document.getElementById('song-time').innerText = `${formatTime(currentTime)} / ${formatTime(duration)}`
//     document.getElementById('song-time').innerText = `${formatTime(currentTime)} / ${formatTime(duration)}`
// }

function updateTime(currentTime, duration) {
    document.getElementById('song-time-c').innerText = `${formatTime(currentTime)}`
    document.getElementById('song-time-d').innerText = `${formatTime(duration)}`
}

function formatTime(time) {
    const seconds = Math.floor(time);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

