console.log("Welcome to spotify");
let nasheedindex=0;
let audioElement = new Audio('nasheeds/1.mp3')
let masterplay= document.getElementById('masterplay');
let progressBar=document.getElementById('progressBar');
let gif=document.getElementById('gif');
let mastersong=document.getElementById('mastersong');
let songItem=Array.from(document.getElementsByClassName('songItem'));

let nasheed = [
    { nasheedname: "Tabshira", filepath: "nasheeds/1.mp3", coverpath: 'bg1.jpg' },
    { nasheedname: "The way of Tears", filepath: "nasheeds/2.mp3", coverpath: 'bg1.jpg' },
    { nasheedname: "Ilahana ma adalak", filepath: "nasheeds/3.mp3", coverpath: 'bg1.jpg' },
    { nasheedname: "Ilahi wasir ul karami", filepath: "nasheeds/4.mp3", coverpath: 'bg1.jpg' },
    { nasheedname: "Wal Qalbu wama yahwa", filepath: "nasheeds/5.mp3", coverpath: 'bg1.jpg' },
    { nasheedname: "i came to you my Creator", filepath: "nasheeds/6.mp3", coverpath: 'bg1.jpg' },
    { nasheedname: "Kun Anta", filepath: "nasheeds/7.mp3", coverpath: 'bg1.jpg' },
    { nasheedname: "My Arabic Language", filepath: "nasheeds/8.mp3", coverpath: 'bg1.jpg' },
    { nasheedname: "Qurani fi Qalbi", filepath: "nasheeds/9.mp3", coverpath: 'bg1.jpg' },
    { nasheedname: "Shukran laka Rabbi", filepath: "nasheeds/10.mp3", coverpath: 'bg1.jpg' }
];
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = "0" + secs;
    return `${minutes}:${secs}`;
}

songItem.forEach((element, i) => {
    // Set cover image
    element.getElementsByTagName("img")[0].src = nasheed[i].coverpath;

    // Set song name
    element.getElementsByClassName("nasheedname")[0].innerText = nasheed[i].nasheedname;

    // Create temporary audio to fetch real duration
    let tempAudio = new Audio(nasheed[i].filepath);
    tempAudio.addEventListener("loadedmetadata", () => {
        let minutes = Math.floor(tempAudio.duration / 60);
        let seconds = Math.floor(tempAudio.duration % 60);
        if (seconds < 10) seconds = "0" + seconds;

        // Set the duration text inside the song list
        element.getElementsByClassName("timeStamp")[0].innerText = `${minutes}:${seconds}`;
    });
});

// audioElement.play();
//handle play pause icon
masterplay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity=0;

        

    }
    syncSongItemPlay();
});
//listen to event
/*audioElement.addEventListener('timeupdate',()=>{
    
    progress = parseInt((audioElement.currentTime/ audioElement.duration) *100)
   
    progressBar.value=progress;

});*/
audioElement.addEventListener('timeupdate', () => {
    // update progress bar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;

    // update time display
    let current = formatTime(audioElement.currentTime);
    let total = formatTime(audioElement.duration);
    document.getElementById("timeDisplay").innerText = `${current} / ${total}`;
});

progressBar.addEventListener('change',()=>{
    audioElement.currentTime= progressBar.value * audioElement.duration/100;
})

// 1) make all songs to display play button in the list
const MakeAllPlays = () => {
    // selecting the class having the icons to select song 
    Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element) => {
        // replacing pause icon with play icon and hiding the playin gif
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    })
    // resetAllGifs();
}
// ✅ Update the play/pause state of song list button
const syncSongItemPlay = () => {
    // Reset all first
    MakeAllPlays();

    // Select the current song's button
    let currentBtn = document.getElementById(nasheedindex);

    if (!audioElement.paused) {
        currentBtn.classList.remove('fa-circle-play');
        currentBtn.classList.add('fa-circle-pause');
    } else {
        currentBtn.classList.remove('fa-circle-pause');
        currentBtn.classList.add('fa-circle-play');
    }
};

/*Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e)
        MakeAllPlays(); 
        nasheedindex= parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`nasheeds/${nasheedindex+1}.mp3`;
        mastersong.innerText =nasheed[nasheedindex].nasheedname;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
         syncSongItemPlay();


    })


})*/
Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);

        if (nasheedindex === clickedIndex && !audioElement.paused) {
            // ✅ If the same song is playing → pause it
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterplay.classList.remove('fa-circle-pause');
            masterplay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        } else {
            // ✅ Otherwise play the clicked song
            MakeAllPlays(); 
            nasheedindex = clickedIndex;
            audioElement.src = `nasheeds/${nasheedindex + 1}.mp3`;
            mastersong.innerText = nasheed[nasheedindex].nasheedname;
            audioElement.currentTime = 0;
            audioElement.play();
            document.getElementById("timeDisplay").innerText = "00:00 / 00:00";
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (nasheedindex>= 9) {
        nasheedindex= 0;
    }
    else {
        nasheedindex += 1;
    }
    audioElement.src=`nasheeds/${nasheedindex+1}.mp3`;
    mastersong.innerText =nasheed[nasheedindex].nasheedname;
        audioElement.currentTime=0;
        audioElement.play();
        document.getElementById("timeDisplay").innerText = "00:00 / 00:00";

         syncSongItemPlay();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');

    loadAndPlay(nasheedindex);
})
document.getElementById('previous').addEventListener('click', () => {
    if (nasheedindex <= 0) {
        nasheedindex= 0;
    }
    else {
        nasheedindex-= 1;
    }
    audioElement.src=`nasheeds/${nasheedindex+1}.mp3`;
        mastersong.innerText =nasheed[nasheedindex].nasheedname;
        audioElement.currentTime=0;
        audioElement.play();
        document.getElementById("timeDisplay").innerText = "00:00 / 00:00";

         syncSongItemPlay();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    loadAndPlay(nasheedindex);
})
audioElement.addEventListener("loadedmetadata", () => {
    let minutes = Math.floor(audioElement.duration / 60);
    let seconds = Math.floor(audioElement.duration % 60);
    if (seconds < 10) seconds = "0" + seconds;
    console.log(`Duration: ${minutes}:${seconds}`);
});
audioElement.addEventListener("ended", () => {
    if (nasheedindex >= nasheed.length - 1) {
        nasheedindex = 0;  
    } else {
        nasheedindex += 1;
    }

    
    audioElement.src = nasheed[nasheedindex].filepath;
    mastersong.innerText = nasheed[nasheedindex].nasheedname;
    audioElement.currentTime = 0;
    audioElement.play();

    MakeAllPlays();
    let currentBtn = document.getElementById(nasheedindex);
    currentBtn.classList.remove("fa-circle-play");
    currentBtn.classList.add("fa-circle-pause");

    masterplay.classList.remove("fa-circle-play");
    masterplay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
});
