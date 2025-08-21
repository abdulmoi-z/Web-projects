console.log("Welcome to Spotify");
//Initialize the variables
let SongIndex = 0;
let AudioElement = new Audio('Khana Badosh/1.mp3');
let MasterPlay = document.getElementById('MasterPlay');
let MyProgressBar = document.getElementById('MyProgressBar');
let gif = document.getElementById('gif');
let MasterSongName = document.getElementById('MasterSongName');
let SongItems = Array.from(document.getElementsByClassName('SongItem'));
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
SongItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].CoverPath;
    element.getElementsByClassName("SongName")[0].innerText = songs[i].SongName;
    //element.getElementsByClassName("TimeStamp")[0].innerText = songs [i].SongDuration;
})
// handle play pause click
MasterPlay.addEventListener('click', () => {
    if (AudioElement.paused || AudioElement.currentTime <= 0) {
        AudioElement.play();
        MasterPlay.classList.remove('fa-play');
        MasterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else {
        AudioElement.pause();
        MasterPlay.classList.remove('fa-pause');
        MasterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})
//listen to evemts
AudioElement.addEventListener('timeupdate', () => {
    //update seekbar
    progress = parseInt((AudioElement.currentTime / AudioElement.duration) * 100);
    MyProgressBar.value = progress;
})
MyProgressBar.addEventListener('change', () => {
    AudioElement.currentTime = (MyProgressBar.value * AudioElement.duration) / 100;
})
const MakeAllPlays = () => {
    Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}
Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        MakeAllPlays();
        SongIndex = parseInt(e.target.id);
        MasterSongName.innerText = songs[SongIndex].SongName;
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        //AudioElement.src = 'Khana Badosh/10_Raabta.mp3';
        AudioElement.src = `Khana Badosh/${SongIndex + 1}.mp3`;
        AudioElement.currentTime = 0;
        AudioElement.play();
        gif.style.opacity = 1;
        MasterPlay.classList.remove('fa-play');
        MasterPlay.classList.add('fa-pause');
    })
})
document.getElementById('next').addEventListener('click', () => {
    if (SongIndex > 11) {
        SongIndex = 0;
    }
    else {
        SongIndex += 1;
    }
    AudioElement.src = `Khana Badosh/${SongIndex + 1}.mp3`;
    MasterSongName.innerText = songs[SongIndex].SongName;
    AudioElement.currentTime = 0;
    AudioElement.play();
    MasterPlay.classList.remove('fa-play');
    MasterPlay.classList.add('fa-pause');
})
document.getElementById('previous').addEventListener('click', () => {
    if (SongIndex <= 0) {
        SongIndex = 0;
    }
    else {
        SongIndex -= 1;
    }
    AudioElement.src = `Khana Badosh/${SongIndex + 1}.mp3`;
    MasterSongName.innerText = songs[SongIndex].SongName;
    AudioElement.currentTime = 0;
    AudioElement.play();
    MasterPlay.classList.remove('fa-play');
    MasterPlay.classList.add('fa-pause');
})