var level=0, part, current=0, isDone=true, isStrict=false;
var audiosource="https://s3.amazonaws.com/freecodecamp/simonSound"
var buttonNo=[{highColor:"#f00",lowColor:"#faa",audio:new Audio(audiosource+"1.mp3")},
              {highColor:"#ff0",lowColor:"#ffa",audio:new Audio(audiosource+"2.mp3")},
              {highColor:"#0f0",lowColor:"#afa",audio:new Audio(audiosource+"3.mp3")},
              {highColor:"#00f",lowColor:"#aaf",audio:new Audio(audiosource+"4.mp3")}]

$(document).ready(function(){
	$("#startgame").click(function(){newGame()});
  $("#strictmode").click(function(){
    isStrict=!isStrict;
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
          else setTimeout(function(){$("#startgame").html("Play again")},500);
        }
      }
      else{
        //insert reaction to erroneous input here
        var blinker=0;
        var blinkPanel=setInterval(function(){
          $("#menupanel").css("background-color","#f88");
          setTimeout(function(){$("#menupanel").css("background-color","#ddd");},500);
          blinker++;
          if(blinker==3){
            clearInterval(blinkPanel);
          }
        },1000);
        if(isStrict) setTimeout(function(){newGame();},3000);
        else setTimeout(function(){showSequence();},3000);
      }
    }
	});
});

function showSequence(){
	isDone=false;
	current=0;
	var ctr2=0;
	var display=setInterval(function(){
		$("#level").html(level);
		blinkButton(part[ctr2]);
		ctr2++;
		if(ctr2>=level){
			isDone=true;
			clearInterval(display);
		}
	},1000);
}

function blinkButton(num){
  buttonNo[num].audio.play();
	$("#choice"+num).css("background-color",buttonNo[num].highColor);
	setTimeout(function(){$("#choice"+num).css("background-color",buttonNo[num].lowColor);},500);
}

function newGame(){
  $("#startgame").html("Restart");
  part=[];
  for(var ctr=0;ctr<20;ctr++){
    part.push(Math.floor(4*Math.random()));
  }
  level=1;
  $("#level").html(1);
  showSequence();
}