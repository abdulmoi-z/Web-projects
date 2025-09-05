let AlbumItems = Array.from(document.getElementsByClassName('AlbumItem'));

//List of Albums
let Albums = [
    { AlbumName: "1. Khana Badosh", FilePath: "KB.html", CoverPath: "/Spotify/Cover/coverKB.jpeg", NumberOfSongs: "(12 Songs)" },
    { AlbumName: "2. Rockstar Without A Guitar ", FilePath: "RWAG.html", CoverPath: "/Spotify/Cover/coverRWAG.jpeg", NumberOfSongs: "(20 Songs)" },
]
    // filling in the name of the albums on the display
    AlbumItems.forEach((element,i)=>{
        element.getElementsByTagName("img")[0].src=Albums[i].CoverPath;
        element.getElementsByClassName("AlbumName")[0].innerText=Albums[i].AlbumName;
        element.getElementsByClassName("SongNum")[0].innerText=Albums[i].NumberOfSongs;
    })
