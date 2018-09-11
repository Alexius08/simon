var level = 0,part = void 0,current = 0,isDone = true,isStrict = false;
var audiosource = "https://s3.amazonaws.com/freecodecamp/simonSound";
var buttonNo = [{ highColor: "#f00", lowColor: "#faa", audio: new Audio(audiosource + "1.mp3") },
{ highColor: "#ff0", lowColor: "#ffa", audio: new Audio(audiosource + "2.mp3") },
{ highColor: "#0f0", lowColor: "#afa", audio: new Audio(audiosource + "3.mp3") },
{ highColor: "#00f", lowColor: "#aaf", audio: new Audio(audiosource + "4.mp3") }];
var starter = document.getElementById("startgame"),menuStyle = document.getElementById("menupanel").style,lvlDisplay = document.getElementById("level"),choices = document.getElementsByClassName("choices");

starter.addEventListener("click", function () {newGame();});

document.getElementById("strictmode").addEventListener("click", function () {isStrict = !isStrict;});

var tileClick = function tileClick() {
  if (isDone) {
    if (part[current] == this.id[6]) {//correct input
      blinkButton(part[current]);
      current++;
      if (current == level) {
        if (level < 20) {
          level++;
          showSequence();
        } else
        setTimeout(function () {starter.innerHTML = "Play again";}, 500);
      }
    } else
    {//incorrect input
      var blinker = 0;
      var blinkPanel = setInterval(function () {
        menuStyle.backgroundColor = "#f88";
        setTimeout(function () {menuStyle.backgroundColor = "#ddd";}, 500);
        blinker++;
        if (blinker == 3) clearInterval(blinkPanel);
      }, 1000);
      if (isStrict) setTimeout(function () {newGame();}, 3000);else
      setTimeout(function () {showSequence();}, 3000);
    }
  }
};

Array.from(choices, function (tile) {return tile.addEventListener("click", tileClick);});

function showSequence() {
  isDone = false;
  current = 0;
  var ctr2 = 0;
  var display = setInterval(function () {
    lvlDisplay.innerHTML = level;
    blinkButton(part[ctr2]);
    ctr2++;
    if (ctr2 >= level) {
      isDone = true;
      clearInterval(display);
    }
  }, 1000);
}

function blinkButton(num) {
  buttonNo[num].audio.play();
  var buttonStyle = document.getElementById("choice" + num).style;
  buttonStyle.backgroundColor = buttonNo[num].highColor;
  setTimeout(function () {buttonStyle.backgroundColor = buttonNo[num].lowColor;}, 500);
}

function newGame() {
  starter.innerHTML = "Restart";
  part = [];
  for (var ctr = 0; ctr < 20; ctr++) {
    part.push(Math.floor(4 * Math.random()));
  }
  level = 1;
  lvlDisplay.innerHTML = 1;
  showSequence();
}