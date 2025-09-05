let AlbumItems = Array.from(document.getElementsByClassName('AlbumItem'));

//List of Albums
let Albums = [
    { AlbumName: "1. Khana Badosh", FilePath: "KB.html", CoverPath: "coverKB.jpeg", NumberOfSongs: "(12 Songs)" },
]
    // filling in the name of the albums on the display
    AlbumItems.forEach((element,i)=>{
        element.getElementsByTagName("img")[0].src=Albums[i].CoverPath;
        element.getElementsByClassName("AlbumName")[0].innerText=Albums[i].AlbumName;
        element.getElementsByClassName("SongNum")[0].innerText=Albums[i].NumberOfSongs;
    })

    // 1️⃣ When AlbumList anchor is clicked → go to album page
    Array.from(document.getElementsByClassName('AlbumList')).forEach((element, i) => {
        element.addEventListener('click', (e) => {
            e.preventDefault(); // stop default navigation
            window.location.href = Albums[i].FilePath; // redirect manually
        });
    });

    //on click opening the album
    Array.from(document.getElementsByClassName('AlbumItemPlay')).forEach((btn, i) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault(); 
            window.location.href = Albums[i].FilePath + "?autoplay=1";
        });
    });
