var b=document.getElementById("myButton");
var c=document.getElementById("myCanvas");
var score=0;
document.getElementById("score").innerHTML = "Score: " + score;
c.style.display='none';
var startSpeed=(10-document.getElementById("mySpeed").value)*20+100;
var startResolution=document.getElementById("myResolution").value;

function settings(){
  startSpeed=(10-document.getElementById("mySpeed").value)*20+100;
  startResolution=document.getElementById("myResolution").value;

}


function move(){
    if (keys.left) x -=scale;
    else if (keys.up) y-=scale;
    else if (keys.right) x+=scale;
    else if (keys.down) y+=scale;
      var ctx=c.getContext("2d");
      ctx.beginPath();
      ctx.arc(x,y,scale/2,0,2*Math.PI);
      ctx.fillStyle = "black";
      ctx.fill();

      for (i=n;i>0;i--){
      xcor[i]=xcor[i-1];
      ycor[i]=ycor[i-1];
      }
      xcor[0]=x;
      ycor[0]=y;

    ctx.clearRect(xcor[n]-scale/2,ycor[n]-scale/2,scale,scale); //4.1???

    if (x==xfood && y==yfood) {
      n+=1;
      food();
      speed=speed*0.6;
      score+=1;
      document.getElementById("score").innerHTML = "Score: " + score;
    }

    for (i=1; i<n+1; i++){
      if ((xcor[i]==x && ycor[i]==y)||((x==size || y==size) || (x==0 || y==0))) {
        clearInterval(timer);
        c.style.display='none';
        b.style.display='initial';
        }}
}

function food(){
    xfood=Math.ceil(Math.random()*(resolution-1))*scale;
    yfood=Math.ceil(Math.random()*(resolution-1))*scale;
      for (i=0; i<n; i++){
        if ((xfood==xcor[i] && yfood==ycor[i]) || (yfood ==y && xfood==x)) {
          food();
          return;
        }
      }
      ctx=c.getContext("2d");
      ctx.beginPath();
      ctx.arc(xfood,yfood,scale/2,0,2*Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
}

function start(){
    b.style.display='none';
    score=0;
    resolution=startResolution;
    scale=Math.floor(400/resolution);
    size=resolution*scale;
    x=scale;
    y=Math.round(resolution/2)*scale;
    n=5;
    speed=startSpeed;
    xcor=[x];
    ycor=[y];
    keys = {
      left:false,
      up:false,
      right:true,
      down:false
    };
    window.onkeydown = function(e) {
      var kc = e.keyCode;
      e.preventDefault();
      if     (kc===37 && ycor[1]!==y)  {keys.left=true; keys.up=false; keys.right=false; keys.down=false;}
      else if (kc===38 && xcor[1]!==x) {keys.left=false; keys.up=true; keys.right=false; keys.down=false;}
      else if (kc===39 && ycor[1]!==y) {keys.left=false; keys.up=false; keys.right=true; keys.down=false;}
      else if (kc===40 && xcor[1]!==x) {keys.left=false; keys.up=false; keys.right=false; keys.down=true;}
    }
    c.width = size;
    c.height = size;
    c.style.display='initial';
    document.getElementById("score").innerHTML = "Score: " + score;
    ctx=c.getContext("2d");
    ctx.clearRect(0,0,size,size);
    food();
    timer = setInterval(function() {move()},speed);
}
