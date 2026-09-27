//  ✅️استرياد موديول جان
import {jan} from "./player.js";
import {playTrack} from "./func.js";

// قالب لصنع الشخصية
class Character {
  constructor(char,id,name,childs = ``, body = document.createElement("div"),parent = document.getElementById("main")) {
    this.char = char;
    this.name = this.char.name;
    this.id = id;
    this.body = body;
    this.childs = childs;
    this.body.id = this.id;
    this.body.innerHTML = this.childs;
    this.body.ariaLabel = `${this.char.name} Character`;
    this.parent = parent;
    this.body.style = `
    position:absolute;
    left:${char.x}vw;
    top:${char.y}vh;
    width:${char.w}vw;
    height:${char.h}vh;
    background-image:url(${char.img});
    background-size:cover;
    background-repeat:no-repeat;
    `;
    this.parent.appendChild(body);
  }
  levelUp() {
    this.char.lv += 1;
  }
  Take_Damage() {
    this.char.health -= 20;
  }
  moveRight() {
    this.char.x += this.char.Speed;
    this.body.style.left = `${this.char.x}vw`;
}
  moveLeft() {
    this.char.x -= this.char.Speed;
    this.body.style.left = `${this.char.x}vw`
  }
  say(speech,id,voice,btnId,div = document.createElement("div")) {
    div.style = `
    position:relative;
    color:red;
    background:black;
    border:2vw solid black;
    outline:1vw solid darkred;
    border-radius:15px;
    width:39vw;
    height:29vw;
    font-size:2.5vw;
    left:30vw;
    top:5vh;
    z-index:999999;
    padding:2vw;
    `;
    div.innerHTML = `
    <h1>${this.name}:</h1>
    <p class="kalam" style="text-align:center; font-size:3vw;">${speech}</p>
    <p style="font-size:1.5vw;">(press the speech to see next speech)</p>
    <button aria-label="Listen Text" id=${btnId} style="top:38vh; left:2vw; position:absolute; border:none; border-radius:2vw; padding:1.5vw;">🎧</button>
    `;
    this.parent.appendChild(div);
    div.id = id;
   const CharVoice = new Audio(voice);
    document.getElementById(btnId).onclick = function() {
      if(CharVoice.paused) {
      CharVoice.play();
      this.textContent = "🔇";
      }
      else {
        CharVoice.pause();
        this.textContent = "🎧";
      }
    };
  }
}

// صنع اللاعب
const player = new Character(jan,"PlayerJan");
// متغيرات عالماشي
let undef;
let HoldRight = undef;
let HoldLeft = undef;
const janDiv = document.getElementById("PlayerJan");
const rightButton = document.getElementById("right");
const leftButton = document.getElementById("left");
const jump = document.getElementById("jump");
const bgmusic = new Audio("https://mohamed-dev2984.github.io/Musics-DBH/dbh.mp3");
const check = document.getElementById("check");
bgmusic.loop = true;
const telephone = document.getElementById("phone");
// events' click
rightButton.addEventListener("pointerdown", function() {
  HoldRight = setInterval(() => {
    player.moveRight();
    jan.img = './paints/Janleft.png';
    janDiv.style.backgroundImage = `url(${jan.img})`;
    leftButton.disabled = true;
    stopMovingRight();
  }, 100);
});

rightButton.addEventListener("pointerup", function() {
  clearInterval(HoldRight);
  leftButton.disabled = false;
  leftButton.className = "";
});

rightButton.addEventListener("pointerleave", function() {
  clearInterval(HoldRight);
  leftButton.disabled = false;
  leftButton.className = "";
});

function stopMovingRight() {
  if(jan.x === 77) {
    janDiv.style.left = `${jan.x}vw`;
    rightButton.className = "disabledButton";
    rightButton.disabled = true;
    clearInterval(HoldRight);
    HideControls();
    rightButton.style.display = "none";
    leftButton.style.display = "none";
    janDiv.style.display = "none";
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "black";
    document.querySelector(".textCutsence").style.display = "block";
  }
}

leftButton.addEventListener("pointerdown", function() {
  HoldLeft = setInterval(() => {
    player.moveLeft();
    jan.img = './paints/Rightjan.png';
    janDiv.style.backgroundImage = `url(${jan.img})`;
    stopMovingLeft();
    rightButton.disabled = true;
  }, 100);
});

leftButton.addEventListener("pointerup", function() {
  clearInterval(HoldLeft);
  rightButton.disabled = false;
  rightButton.className = "";
});

leftButton.addEventListener("pointerleave", function() {
  clearInterval(HoldLeft);
  rightButton.disabled = false;
  rightButton.className = "";
});

function stopMovingLeft() {
  if(jan.x === 1) {
    janDiv.style.left = `${jan.x}vw`;
    leftButton.className = "disabledButton";
    leftButton.disabled = true;
    clearInterval(HoldLeft);
  }
}

jump.addEventListener("click", () => {
  janDiv.style.animation = "none";
  janDiv.offsetHeight;
  janDiv.style.animation = "jumped 0.3s forwards";
});

function showControls() {
  const controls = document.querySelectorAll(".ui");
  controls.forEach(control => {
    control.style.display = "inline-block";
  });
}
function HideControls() {
  const controls = document.querySelectorAll(".ui");
  controls.forEach(control => {
    control.style.display = "none";
  });
}

check.addEventListener("input", () => {
  playTrack(bgmusic);
});

 player.say("(sigh) what is the clock now?", "s1", "https://mohamed-dev2984.github.io/Musics-DBH/jan1.mp3", "play");

// لما الرسالة الأولى تظهر، نجيب عنصر الـ kalam جواها ونحط عليه الحدث
 setTimeout(() => {
 const speech1 = document.querySelector("#s1 .kalam");
  if (speech1) {
    speech1.onclick = function() {
      // إخفاء الـ div بالكامل بتاع الرسالة الأولى
     document.getElementById("s1").style.display = "none";
      // إظهار الرسالة التانية
    player.say("9 o'clock?! oh gosh! I'm so late I need to hurry up!", "s2", "https://mohamed-dev2984.github.io/Musics-DBH/jan2.mp3", "playVoice");
      // بعد ما الرسالة التانية تظهر، نمسك الـ kalam بتاعتها
     setTimeout(() => {
       const speech2 = document.querySelector("#s2 .kalam");
      if (speech2) {
         speech2.onclick = function() {
            // إخفاء الرسالة التانية وتشغيل الـ controls
            document.getElementById("s2").style.display = "none";
           showControls();
           };
         }
    }, 50);
  };
 }
 }, 50);

