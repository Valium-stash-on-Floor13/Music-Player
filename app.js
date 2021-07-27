let audio, seeking=false, seekTo;
let playBtn =document.querySelector('#play-pause-btn');
let nextBtn= document.querySelector('#next-btn');
let prevBtn=document.querySelector('#prev-btn');
let seekSlider=document.querySelector('#seek-slider');
let currentTime=document.querySelector('#current-time');
let durationTime=document.querySelector('#duration-time-text');
let playlistStatus=document.querySelector('#playlist-status');
let playlistArtist=document.querySelector('#playlist-artists');
let repeat= document.querySelector('#repeat');
let randomSong= document.querySelector('#random');
let image=document.querySelector('#image');
let playlistIndex=0;
let themeToggle=true;
const dir="/songs/";
const playlist=["G-Eazy_-_Don't_Let_Me_Go", "Lorde_-_Hard_Feelings", "EDEN_-_drugs","Rosenfeld_-_Cool_Cool_Boy","BLACK_LILYS_-_Nightfall", "Jaymes_Young_-_Feel_Something",
"Medicine","FINNEAS_-_Can't_Wait_To_Be_Dead","Machine_Gun_Kelly_–_53666_feat._Phem"];

const title=["Don't Let Me Go", "Hard Feelings/Loveless","Drugs","Cool Cool Boy",
"Nightfall", "Feel Something", "Medicine",
 "Can't Wait To Be Dead", "5:3666"]

const poster=["/img/When it's dark out.jpg","img/Lorde_Hard feelings.jpg","img/drugs.jpg","img/Rosenfeld cool.jpg",
"img/Black lilys_Nightfalll.jpg","img/feel_something.jpg", "img/Daughter_Medicine.jpg"
    , "img/Finneas_Can't wait to be dead.jpg","img/5_3666.jpg"];

const artists=["G-Eazy", "Lorde","EDEN", "Rosenfeld", "Black Lilys", "Jaymes Young", "Daughter", "Finneas", "MGK"];

let ext=".mp3";

let checkbox=document.querySelector('input[name="theme"]');
checkbox.addEventListener('click', ()=>{

    if(themeToggle){
        document.documentElement.setAttribute('data-theme','light');
        themeToggle=false;
    }
    else{
        document.documentElement.setAttribute('data-theme','dark');
        
        themeToggle=true;
    }
})

audio=new Audio();
audio.src=dir+playlist[0]+ext;
audio.loop= false;

playlistArtist.innerText=artists[playlistIndex];
playlistStatus.innerText=title[playlistIndex];

playBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
seekSlider.addEventListener('mousedown', function(e){
    seeking=true;
    seek(e);
});
seekSlider.addEventListener('mousemove', function(e){
    seek(e);
});
seekSlider.addEventListener('mouseup', function(){
    seeking=false;
});
audio.addEventListener('timeupdate', function(){
seekTimeUpdate();
});
audio.addEventListener('ended', function(){
    switchTrack();
});

repeat.addEventListener('click', loop);
randomSong.addEventListener('click', random);

//functions--
function getMusicInfo(){
    // $("#image").attr("src". poster[playlistIndex]);
   
    image.src=poster[playlistIndex];
    
    playlistArtist.innerText=artists[playlistIndex];
    playlistStatus.innerText=title[playlistIndex];
    audio.src= dir+playlist[playlistIndex]+ext;
    audio.play();
}

function randomSelection(last){
let randomNum=Math.floor(Math.random()*(last+1));
return randomNum;

}

function random(){
let randomIndex= randomSelection(playlist.length-1);
playlistIndex=randomIndex;
getMusicInfo();
document.querySelector('.playpause').classList.add('active');
}

function loop(){
    if(audio.loop){
audio.loop=false;
document.querySelector('.loop').classList.remove('active');
    }
    else{
        audio.loop=true;
        document.querySelector('.loop').classList.add('active');
    }
}

function nextSong(){
    document.querySelector('.player').classList.add("active");
    document.querySelector('.playpause').classList.add('active');
    playlistIndex++;
    if(playlistIndex> playlist.length-1){
        playlistIndex=0;
    }
    getMusicInfo();
}
function prevSong(){
    document.querySelector('.player').classList.add("active");
    document.querySelector('.playpause').classList.add('active');
    playlistIndex--;
    if(playlistIndex < 0){
        playlistIndex=playlist.length-1;
    }
    getMusicInfo();
}

function playPause(){
    if(audio.paused){
       document.querySelector('.player').classList.add("active");
        audio.play();
        document.querySelector('.playpause').classList.add('active');
      
    }
    else{
        audio.pause();
        document.querySelector('.player').classList.remove("active");
        document.querySelector('.playpause').classList.remove('active');
     
    }
}

function switchTrack(){
    if(playlistIndex==(playlist.length-1)){
        playlistIndex=0;
    }
    else{
        playlistIndex++;
    }
    getMusicInfo();
}


function seek(e){
    if(audio.duration == 0){
        null;
    }
    else{
        if(seeking){
            seekSlider.value = e.clientX - seekSlider.offsetLeft;
            seekTo = audio.duration*(seekSlider.value/100);
            audio.currentTime = seekTo;
        }
    }
}

function seekTimeUpdate(){
    if(audio.duration){
    seekSlider.value = audio.currentTime*(100/audio.duration);
   
    var currentMins = Math.floor(audio.currentTime / 60);
    var currentSecs = Math.floor(audio.currentTime % 60);
    var durationMins = Math.floor(audio.duration / 60);
    var durationSecs = Math.floor(audio.duration % 60);

    if(currentSecs< 10){
        currentSecs= "0"+currentSecs;
    }
    if(currentMins< 10){
        currentMins= "0"+currentMins;
    }
    if(durationSecs< 10){
        durationSecs= "0"+durationSecs;
    }
    if(durationMins< 10){
        durationMins= "0"+durationMins;
    }
    currentTime.innerText = currentMins+':'+ currentSecs;
    durationTime.innerText = durationMins+':'+ durationSecs;

}
else{
    currentTime.innerText ='00'+':'+ '00';
    durationTime.innerText = '00'+':'+ '00';
}
}