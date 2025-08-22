console.log("Welcome to Spotify");

//Initialize the variables
let SongIndex = 0;
let AudioElement = new Audio('Khana Badosh/1.mp3');

let MasterPlay = document.getElementById('MasterPlay');
let MyProgressBar = document.getElementById('MyProgressBar');
let gif = document.getElementById('gif');
let MasterSongName = document.getElementById('MasterSongName');
let SongItems = Array.from(document.getElementsByClassName('SongItem'));

// list of the song name , paths to the songs aand cover images 
let songs = [
    { SongName: "1. Gardish", FilePath: "Khana Badosh/1.mp3", CoverPath: "cover.jpeg", SongDuration: "6:02" },
    { SongName: "2. Darja hararat", FilePath: "Khana Badosh/2.mp3", CoverPath: "cover.jpeg", SongDuration: "3:55" },
    { SongName: "3. Manzar Kashi", FilePath: "Khana Badosh/3.mp3", CoverPath: "cover.jpeg", SongDuration: "5:15" },
    { SongName: "4. Bandish", FilePath: "Khana Badosh/4.mp3", CoverPath: "cover.jpeg", SongDuration: "4:53" },
    { SongName: "5. Khana Badosh", FilePath: "Khana Badosh/5.mp3", CoverPath: "cover.jpeg", SongDuration: "6:36" },
    { SongName: "6. Khafa", FilePath: "Khana Badosh/6.mp3", CoverPath: "cover.jpeg", SongDuration: "6:14" },
    { SongName: "7. Gulshan", FilePath: "Khana Badosh/7.mp3", CoverPath: "cover.jpeg", SongDuration: "5:09" },
    { SongName: "8. Aarzu", FilePath: "Khana Badosh/8.mp3", CoverPath: "cover.jpeg", SongDuration: "4:48" },
    { SongName: "9. Shayar", FilePath: "Khana Badosh/9.mp3", CoverPath: "cover.jpeg", SongDuration: "4:20" },
    { SongName: "10. Raabta", FilePath: "Khana Badosh/10.mp3", CoverPath: "cover.jpeg", SongDuration: "4:46" },
    { SongName: "11. Mutaasir", FilePath: "Khana Badosh/11.mp3", CoverPath: "cover.jpeg", SongDuration: "5:34" },
    { SongName: "12. Iltija", FilePath: "Khana Badosh/12.mp3", CoverPath: "cover.jpeg", SongDuration: "5:18" },
]

// filling in the name of the songs and their durations on the display
SongItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].CoverPath;
    element.getElementsByClassName("SongName")[0].innerText = songs[i].SongName;
    element.getElementsByClassName("duration")[0].innerText = songs[i].SongDuration;
})
MasterSongName.innerText = songs[SongIndex].SongName;

//helper functions 
// 1) make all songs to display play button in the list
const MakeAllPlays = () => {
    Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
        gif.style.opacity = 0;
    })
    resetAllGifs();
}

// reseting the now playing gif
function resetAllGifs() {
    document.querySelectorAll('.NowPlaying').forEach(img => {
        img.src = "";
        img.style.opacity = 0;
    });
}
// setting row icon
function SetRowIcon(index, playing) {
    MakeAllPlays();
    const btn = document.querySelector(`.SongItem i[id="${index}"]`);
    if (btn && playing) {
        btn.classList.remove('fa-play');
        btn.classList.add('fa-pause');
    }
}

//display now playing gif
function showGifForSong(index) {
    resetAllGifs();
    const row = document.querySelector(`.SongItem i[id="${index}"]`)?.closest('.SongItem');
    const img = row?.querySelector('.NowPlaying');
    if (img) {
        img.src = "playing1-unscreen.gif";
        img.style.opacity = 1;
        gif.style.opacity = 1;
    }
}
//load and play song
function loadAndPlay(index) {
    SongIndex = index; // update the global (no 'let'!)
    AudioElement.src = songs[SongIndex].FilePath;
    MasterSongName.innerText = songs[SongIndex].SongName;
    AudioElement.currentTime = 0;
    AudioElement.play();

    MasterPlay.classList.remove('fa-play');
    MasterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;

    SetRowIcon(SongIndex, true);
    showGifForSong(SongIndex);
}

// handle play pause click
//controlling the main pause play button on the progess bar at the bottom
MasterPlay.addEventListener('click', () => {
    //condition to identify that the song is paused of not playing
    if (AudioElement.paused || AudioElement.currentTime <= 0) {
        // Ensure correct src (first click scenario)
        if (!AudioElement.src || !AudioElement.src.includes(`${SongIndex + 1}.mp3`)) {
            AudioElement.src = songs[SongIndex].FilePath;
        }
        //playing the song in case the condition is true
        AudioElement.play();
        //replacing play button with pause
        MasterPlay.classList.remove('fa-play');
        MasterPlay.classList.add('fa-pause');
        // displaying the playing gif
        gif.style.opacity = 1;
        SetRowIcon(SongIndex, true);
        showGifForSong(SongIndex);
    }
    else {
        // if the song is playing then pausing it on click
        AudioElement.pause();
        //replacing the pause button with play button
        MasterPlay.classList.remove('fa-pause');
        MasterPlay.classList.add('fa-play');
        //hiding the gifs
        gif.style.opacity = 0;
        SetRowIcon(SongIndex, false);
        resetAllGifs();
    }
})

//listen to events
//tracking the time of the song
AudioElement.addEventListener('timeupdate', () => {
    if (AudioElement.duration > 0) {
        //update seekbar
        progress = parseInt((AudioElement.currentTime / AudioElement.duration) * 100);
        MyProgressBar.value = progress;
    }
})

MyProgressBar.addEventListener('change', () => {
    if (AudioElement.duration > 0) {
        AudioElement.currentTime = (MyProgressBar.value * AudioElement.duration) / 100;
    }
})

function showGifForSong(songIndex) {
    resetAllGifs();
    let songItem = document.querySelector(`.SongItem i[id="${songIndex}"]`).closest('.SongItem');
    let gifImg = songItem.querySelector('.NowPlaying');
    gifImg.src = "playing1-unscreen.gif";
    gifImg.style.opacity = 1;
    gif.style.opacity = 1;
}

/*Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        MakeAllPlays();
        SongIndex = parseInt(e.target.id);
        MasterSongName.innerText = songs[SongIndex].SongName;
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        AudioElement.src = `Khana Badosh/${SongIndex + 1}.mp3`;
        AudioElement.currentTime = 0;
        AudioElement.play();
        gif.style.opacity = 1;
        MasterPlay.classList.remove('fa-play');
        MasterPlay.classList.add('fa-pause');
    });
});*/

Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let SongIndex = parseInt(e.target.id);

        // same song toggle
        if (AudioElement.src.includes(`${SongIndex + 1}.mp3`)) {
            if (AudioElement.paused) {
                AudioElement.play();
                e.target.classList.remove('fa-play');
                e.target.classList.add('fa-pause');
                gif.style.opacity = 1;
                MasterPlay.classList.remove('fa-play');
                MasterPlay.classList.add('fa-pause');
                showGifForSong(SongIndex);
                SetRowIcon(SongIndex, true);
            }
            else {
                AudioElement.pause();
                e.target.classList.remove('fa-pause');
                e.target.classList.add('fa-play');
                gif.style.opacity = 0;
                MasterPlay.classList.remove('fa-pause');
                MasterPlay.classList.add('fa-play');
                showGifForSong(SongIndex);
                SetRowIcon(SongIndex, false);
            }
        }
        else {
            loadAndPlay(SongIndex);
        }
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (SongIndex >= 11) {
        SongIndex = 0;
    }
    else {
        SongIndex += 1;
    }
    loadAndPlay(SongIndex);
})
document.getElementById('previous').addEventListener('click', () => {
    if (SongIndex <= 0) {
        SongIndex = 0;
    }
    else {
        SongIndex -= 1;
    }
    loadAndPlay(SongIndex);
})
AudioElement.addEventListener("ended", () => {
    gifContainer.style.opacity = 0;
});
