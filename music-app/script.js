let PlayIcon = "./assets/img/play.svg";
let PlaySmIcon = "./assets/img/play_sm.svg";
let PauseIcon = "./assets/img/pause.svg";
let PlayingIcon = "./assets/img/playing.svg";

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
  let title = document.getElementById("name");
  audio.src = musics[0].url;
  title.innerHTML = musics[0].title;

  musics.map((music, index) => {
    let newSound = new Audio(music.url);

    let item = `
        <section class="item" id="${index}">
            <span class="action" id="action${index}" >
              <img id="icon${index}" class="icon" src="./assets/img/play_sm.svg" />
            </span>
            <h3 class="title">${music.title}</h3>
            <!--<h3 class="time" id="time">${newSound.currentTime}</h3>-->
        </section>`;
    list.insertAdjacentHTML("beforeend", item);

    document.getElementById(index).addEventListener("click", (e) => {
      audio.src = music.url;
      title.innerHTML = music.title;
      audio.play();
      let controls = document.querySelector(".controls");
      controls.src = PauseIcon;
      controls.id = "play";

      document.getElementById("duration").innerHTML = audio.duration;
      document.getElementById(`icon${index}`).src = PlayingIcon;
      document.querySelectorAll(".action").forEach((action) => {
        action.classList.remove("playing");
      });
      document.getElementById(`action${index}`).classList.add("playing");
    });
  });
};

document.querySelector(".controls").addEventListener("click", (e) => {
  if (e.target.id == "play") {
    e.target.id = "pause";
    e.target.src = PauseIcon;
    audio.play();
  } else if (e.target.id == "pause") {
    e.target.id = "play";
    e.target.src = PlayIcon;
    audio.pause();
  } else {
    e.target.id = "pause";
    audio.play();
    e.target.src = PauseIcon;
  }
});

audio.addEventListener("playing", (ev) => {
  let duration = (audio.duration / 60).toFixed(2);
  document.getElementById("duration").innerHTML = duration;
});

audio.addEventListener("timeupdate", (ev) => {
  document.getElementById("currentTime").innerHTML =
    ev.target.currentTime.toFixed(0);
});

audio.addEventListener("ended", () => {
  document.querySelector(".controls").src = PlayIcon;
  document.querySelector(".controls").id = "play";
});
