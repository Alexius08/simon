let level=0, part, current=0, isDone=true, isStrict = false;
const audiosource="https://s3.amazonaws.com/freecodecamp/simonSound";
const buttonNo=[{highColor:"#f00",lowColor:"#faa",audio:new Audio(audiosource+"1.mp3")},
              {highColor:"#ff0",lowColor:"#ffa",audio:new Audio(audiosource+"2.mp3")},
              {highColor:"#0f0",lowColor:"#afa",audio:new Audio(audiosource+"3.mp3")},
              {highColor:"#00f",lowColor:"#aaf",audio:new Audio(audiosource+"4.mp3")}];

$(document).ready(function(){
	$("#startgame").click(function(){newGame()});
  $("#strictmode").click(function(){
    isStrict = !isStrict;
  });
	$(".choices").click(function(){
		if(isDone){
      if(part[current]==this.id[6]){
        blinkButton(part[current]);
        current++;
        if(current==level){
          if(level<20){
            level++;
            showSequence();
          }
          else setTimeout(()=>{$("#startgame").html("Play again")},500);
        }
      }
      else{
        //insert reaction to erroneous input here
        let blinker=0;
        let blinkPanel = setInterval(()=>{
          document.getElementById("menupanel").style.backgroundColor = "#f88";
          setTimeout(()=>{document.getElementById("menupanel").style.backgroundColor = "#ddd";},500);
          blinker++;
          if(blinker==3) clearInterval(blinkPanel);
        },1000);
        if(isStrict) setTimeout(()=>{newGame();},3000);
        else setTimeout(()=>{showSequence();},3000);
      }
    }
	});
});

function showSequence(){
	isDone = false;
	current = 0;
	let ctr2 = 0;
	let display = setInterval( () => {
		document.getElementById("level").innerHTML = level;
		blinkButton(part[ctr2]);
		ctr2++;
		if(ctr2 >= level){
			isDone = true;
			clearInterval(display);
		}
	},1000);
}

function blinkButton(num){
  buttonNo[num].audio.play();
  document.getElementById(`choice${num}`).style.backgroundColor = buttonNo[num].highColor;
	setTimeout(()=>{document.getElementById(`choice${num}`).style.backgroundColor = buttonNo[num].lowColor;},500);
}

function newGame(){
  document.getElementById("startgame").innerHTML = "Restart";
  part=[];
  for(let ctr = 0; ctr<20 ;ctr++){
    part.push(Math.floor(4*Math.random()));
  }
  level=1;
  document.getElementById("level").innerHTML = 1;
  showSequence();
}