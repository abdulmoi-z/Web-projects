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
    { SongName: "1. Gardish", FilePath: "Khana Badosh/1.mp3", CoverPath: "coverKB.jpeg", SongDuration: "6:02" },
    { SongName: "2. Darja hararat", FilePath: "Khana Badosh/2.mp3", CoverPath: "coverKB.jpeg", SongDuration: "3:55" },
    { SongName: "3. Manzar Kashi", FilePath: "Khana Badosh/3.mp3", CoverPath: "coverKB.jpeg", SongDuration: "5:15" },
    { SongName: "4. Bandish", FilePath: "Khana Badosh/4.mp3", CoverPath: "coverKB.jpeg", SongDuration: "4:53" },
    { SongName: "5. Khana Badosh", FilePath: "Khana Badosh/5.mp3", CoverPath: "coverKB.jpeg", SongDuration: "6:36" },
    { SongName: "6. Khafa", FilePath: "Khana Badosh/6.mp3", CoverPath: "coverKB.jpeg", SongDuration: "6:14" },
    { SongName: "7. Gulshan", FilePath: "Khana Badosh/7.mp3", CoverPath: "coverKB.jpeg", SongDuration: "5:09" },
    { SongName: "8. Aarzu", FilePath: "Khana Badosh/8.mp3", CoverPath: "coverKB.jpeg", SongDuration: "4:48" },
    { SongName: "9. Shayar", FilePath: "Khana Badosh/9.mp3", CoverPath: "coverKB.jpeg", SongDuration: "4:20" },
    { SongName: "10. Raabta", FilePath: "Khana Badosh/10.mp3", CoverPath: "coverKB.jpeg", SongDuration: "4:46" },
    { SongName: "11. Mutaasir", FilePath: "Khana Badosh/11.mp3", CoverPath: "coverKB.jpeg", SongDuration: "5:34" },
    { SongName: "12. Iltija", FilePath: "Khana Badosh/12.mp3", CoverPath: "coverKB.jpeg", SongDuration: "5:18" },
]

// filling in the name of the songs and their durations on the display
SongItems.forEach((element, i) => {
    //setting cover images from list in the songs displaying  container
    element.getElementsByTagName("img")[0].src = songs[i].CoverPath;
    //setting song names in the container
    element.getElementsByClassName("SongName")[0].innerText = songs[i].SongName;
    // setting song duration in the container
    element.getElementsByClassName("duration")[0].innerText = songs[i].SongDuration;
})
//setting the current playing song name below the progress bar
MasterSongName.innerText = songs[SongIndex].SongName;

//helper functions 
// 1) make all songs to display play button in the list
const MakeAllPlays = () => {
    // selecting the class having the icons to select song 
    Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element) => {
        // replacing pause icon with play icon and hiding the playin gif
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
        gif.style.opacity = 0;
    })
    resetAllGifs();
}

//2) reseting the now playing gif inside the song list container
function resetAllGifs() {
    document.querySelectorAll('.NowPlaying').forEach(img => {
        img.src = "";
        img.style.opacity = 0;
    });
}
// 3)setting row icons to display playing the current playing song
function SetRowIcon(index, playing) {
    MakeAllPlays();
    //selecting the icon through index of the song that is currently playing
    const btn = document.querySelector(`.SongItem i[id="${index}"]`);
    //replacing the icons of that particular index icon
    if (btn && playing) {
        btn.classList.remove('fa-play');
        btn.classList.add('fa-pause');
    }
}

// 4)display now playing gif 
function showGifForSong(index) {
    resetAllGifs();
    //similarly select the curently playing song through index and displaying gif 
    const row = document.querySelector(`.SongItem i[id="${index}"]`)?.closest('.SongItem');
    const img = row?.querySelector('.NowPlaying');
    if (img) {
        img.src = "playing1-unscreen.gif";
        img.style.opacity = 1;
        gif.style.opacity = 1;
    }
}
// 5)load and play song
function loadAndPlay(index) {
    //from the index playing th audio and updating the names and gifs
    SongIndex = index;
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
        //to keep track of what song was being played dispaying the now playing gif
        showGifForSong(SongIndex);
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
// updating progress bar in case of changing the progress line
MyProgressBar.addEventListener('change', () => {
    if (AudioElement.duration > 0) {
        AudioElement.currentTime = (MyProgressBar.value * AudioElement.duration) / 100;
    }
})


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

//selection of song based upon clicking icon in the song list
Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        //selecting the id of the icon clicked
        let SongIndex = parseInt(e.target.id);

        // detecting the second click on the already playing song
        if (AudioElement.src.includes(`${SongIndex + 1}.mp3`)) {
            //conditions to tackle pause an resume
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
        // if new icon is pressed playing that song based upon the index
        else {
            loadAndPlay(SongIndex);
        }
    });
});

// configuring the next icon to play the next song from the current index
document.getElementById('next').addEventListener('click', () => {
    //toggling
    if (SongIndex >= 11) {
        SongIndex = 0;
    }
    else {
        SongIndex += 1;
    }
    loadAndPlay(SongIndex);
})
// configuring the next icon to play the previous song from the current index
document.getElementById('previous').addEventListener('click', () => {
    if (SongIndex <= 0) {
        SongIndex = 0;
    }
    else {
        SongIndex -= 1;
    }
    loadAndPlay(SongIndex);
})

//updating the song when song ends and play the next song
AudioElement.addEventListener("ended", () => {
    if (SongIndex >= 11) {
        SongIndex = 0;
    }
    else {
        SongIndex += 1;
    }
    loadAndPlay(SongIndex);
});
