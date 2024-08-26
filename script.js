console.log('Write js')
let current_song=new Audio()
async function getsongs(){
    let b = await fetch("http://192.168.1.14:3000/Spotify-clone/songs")
    let response=await b.text()
    let div=document.createElement("div")
    div.innerHTML=response
    let a=div.getElementsByTagName("a")
    let song=[]
    for(let index=0;index<a.length;index++){
        const element=a[index]
        if(element.href.endsWith(".mp4")){
            song.push(element.href.split("/songs/")[1])
        }
    }
    return song
}

function convertSecondsToMinutes(seconds) {
    seconds=Math.round(seconds);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
}

const playMusic=(track)=>{
    current_song.src="/Spotify-clone/songs/"+track+".mp4"
    current_song.play()
    play.src="resources/p.svg"
    document.querySelector(".name").innerHTML=decodeURI(track)
}
async function main(){ 
    let songs=await getsongs()
    let list=document.querySelector('.songs_l').getElementsByTagName("ul")[0]
    for(const song of songs){
        list.innerHTML+=`<li>${song.replaceAll("%20"," ").replaceAll(".mp4","")}<img src="resources/music.svg" alt=""></li>`
    }
    let l=Array.from(document.querySelector(".songs_l").getElementsByTagName("li"))
    l.forEach(e=>{
        e.addEventListener("click",element=>{
            playMusic(e.innerHTML.split("<img")[0])
        })
    })
    play.addEventListener("click",()=>{
        if(current_song.paused){
            current_song.play() 
            play.src="resources/p.svg"  
        }
        else{
            current_song.pause() 
            play.src="resources/pause.svg"
        }
    })

    current_song.addEventListener("timeupdate",()=>{
        let now=convertSecondsToMinutes(current_song.currentTime)
        let total=convertSecondsToMinutes(current_song.duration)
        document.querySelector(".time").innerHTML=`${now}/${total}`
        document.querySelector(".circle").style.left=(current_song.currentTime/current_song.duration)*100+"%"
    })

    document.querySelector(".length").addEventListener("click",e=>{
        let percentage=(e.offsetX/e.target.getBoundingClientRect().width)*100
        document.querySelector(".circle").style.left=percentage+"%"
        current_song.currentTime=(current_song.duration*percentage)/100
    })
}

main()      