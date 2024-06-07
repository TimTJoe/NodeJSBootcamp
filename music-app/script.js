let musics = [
  { url: "./assets/music/music1.mp3", title: "Music One" },
  { url: "./assets/music/music2.mp3", title: "Music Two" },
  { url: "./assets/music/music3.mp3", title: "Music Three" },
  { url: "./assets/music/music4.mp3", title: "Music Four" },
  { url: "./assets/music/music5.mp3", title: "Music Five" },
];
let audio = document.getElementById("audio");
audio.loop = false;

window.onload = () => {
  let list = document.getElementById("list");
  let title = document.getElementById("title");
  audio.src = musics[0].url;
  title.innerHTML = musics[0].title;

  musics.map((music, index) => {
    let item = ` <a href=${music.url} class="item" id=${index}>${music.title}</a>`;
    list.insertAdjacentHTML("beforeend", item);
    document.getElementById(index).addEventListener("click", (e) => {
      e.preventDefault();
      audio.src = music.url;
      title.innerHTML = music.title;
    });
  });
};

//play
document.getElementById("play").addEventListener("click", (e) => {
  audio.play();
});

//repeat
document.getElementById("repeat").addEventListener("click", (e) => {
  console.log(audio.loop);
  audio.play();
});

//pause
document.getElementById("pause").addEventListener("click", (e) => {
  audio.pause();
});
