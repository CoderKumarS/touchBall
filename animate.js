const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

var touch ={
    x : undefined,
    y : undefined 
} 
     let touchHandler = function(event) {
        
        if (event.touches && event.touches[0]) {
            touch.x = event.touches[0].clientX;
            touch.y = event.touches[0].clientY;
        }else {
           touch.x = event.clientX;
           touch.y = event.clientY;
        }
      } 
     // for touch device  
     window.addEventListener('touchstart',touchHandler, false); 
      
window.addEventListener('touchmove', touchHandler, false);

// for cursor screen
window.addEventListener('mousestart',touchHandler, false); 
      
window.addEventListener('mousemove', touchHandler, false);

window.addEventListener('resize', function () {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   
   init();
}, false);
     
    function Circle(x,y,dx,dy, radius) {
        this.x = x;
        this.y = y;
        
        this.dx = dx;
        this.dy = dy;
        
        this.radius = radius;
        this.minRadius = radius;
        
        this.color = colorArray[Math.round(Math.random() * colorArray.length)];
        
        this.draw = function () {
            c.beginPath();
            c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
            /* c.strokeStyle = colorArray[
            Math.round(Math.random() *
                colorArray.length)];  */
            c.fillStyle = this.color;
            /* c.stroke();  */
            c.fill();           
        }
        
        this.update = function () {
            if(this.x +this.radius >innerWidth ||
                this.x - this.radius<0) {
                this.dx= -this.dx;
            }
            this.x += this.dx;
        
            if(this.y +this.radius >innerHeight||
                this.y - this.radius<0) {
                this.dy= -this.dy;            
            }
            this.y += this.dy;
            
          if(touch.x - this.x < touchArea &&
              touch.x - this.x > -touchArea &&
               touch.y - this.y < touchArea &&
                touch.y - this.y > -touchArea) {
             if(this.radius < maxRadius) {
               this.radius += incrSpeed;
            } 
            /* this.radius += incrSpeed; */
          }else if(this.radius > this.minRadius) 
          {
               this.radius -= decrSpeed;
          }
          this.draw();
       }
    }
    
    var circleArray = [];
    var speed = 1;
    var count = 1000;
    var incrSpeed = 2;
    var decrSpeed = 2;
    var radius = Math.random() * 3 + 2;
    var maxRadius = 40;
  //  var minRadius = 3;
    var touchArea = 50;
    var colorArray = [
       '#027373',
       '#038C7F',
       '#A9D9D0',
       '#F2E7DC',
       '#0D0D0D'
    ];
    
    function init() {
       circleArray = [];
       for(var i = 0; i<count; i++){
         var x =Math.random()*innerWidth;
         var dx =(Math.random() - 0.5)*speed;
    
         var y =Math.random()*innerHeight;
         var dy = (Math.random() - 0.5)*speed;
         
         circleArray.push(new Circle(x, y, dx, dy, radius));
       }
    }
  
    
    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0,0,innerWidth,innerHeight);
        
        for(var i = 0; i<circleArray.length; i++)
        {
             circleArray[i].update();
        }
    }
    init();
animate();
