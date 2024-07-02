var player = new Audio();
player.src = '/public/audios/songs/audio.mp3';

document.getElementById('play-btn').addEventListener('click', function() {
    player.play();
    console.log('Song has been played');
    document.getElementById('play-btn').style.display = 'none';
    document.getElementById('pause-btn').style.display = 'block';
});

document.getElementById('pause-btn').addEventListener('click', function() {
    player.pause();
    console.log('Song has been paused');
    document.getElementById('pause-btn').style.display = 'none';
    document.getElementById('play-btn').style.display = 'block';
});


player.addEventListener("timeupdate", function() {
    current_time = player.currentTime
    duration = player.duration
    position = current_time / duration * 100
    document.getElementById('progress-circle').style.left = `calc(${position}% - 7px)`
})


