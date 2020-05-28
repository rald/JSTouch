var touches=null;
var pad=null;
var player=null;

function inrect(x,y,rx,ry,rw,rh) {
	return x>=rx && x<=rx+rw && y>=ry && y<=ry+rh;
}

function Button(x,y,w,h) {
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.state=Button.UP;

	this.draw=function() {
		switch(this.state) {
			case Button.UP:
				setFillStyle("#00000080");
				setStrokeStyle("#FFFFFF80");
				fillRect(this.x,this.y,this.w,this.h);
				drawRect(this.x,this.y,this.w,this.h);
				break;
			case Button.DOWN:
				setFillStyle("#FFFFFF80");
				setStrokeStyle("#00000080");
				fillRect(this.x,this.y,this.w,this.h);
				drawRect(this.x,this.y,this.w,this.h);
				break;
		}
	}

	this.handleEvents=function(touches) {
		this.state=Button.UP;
		if(touches!=null) {
			for(var i=touches.length-1;i>=0;i--) {
			  var touch=touches[i];
			  if(inrect(touch.clientX,touch.clientY,this.x,this.y,this.w,this.h)) {
					this.state=Button.DOWN;
					return true;
			  }
			}
		}
		return false;
	}

}

Button.UP=0;
Button.DOWN=1;

function Pad() {
	this.state=Pad.NONE;
	this.buttons=[];

	var x=128,y=canvas.height-192;

	this.buttons.push(new Button(x,y-64,64,64));
	this.buttons.push(new Button(x,y+64,64,64));
	this.buttons.push(new Button(x-64,y,64,64));
	this.buttons.push(new Button(x+64,y,64,64));

	this.buttons.push(new Button(x-64,y-64,64,64));
	this.buttons.push(new Button(x-64,y+64,64,64));
	this.buttons.push(new Button(x+64,y+64,64,64));
	this.buttons.push(new Button(x+64,y-64,64,64));

	this.buttons.push(new Button(canvas.width-256,y,64,64));
	this.buttons.push(new Button(canvas.width-128,y,64,64));

	this.draw=function() {
		for(var i=0;i<this.buttons.length;i++) {
			this.buttons[i].draw();
		}
	}

	this.handleEvents=function(touches) {
		this.state=Pad.NONE;
		for(var i=0;i<this.buttons.length;i++) {
			if(this.buttons[i].handleEvents(touches)) {
				switch(i) {
					case 0: pad.state|=Pad.UP; break;
					case 1: pad.state|=Pad.DOWN; break;
					case 2: pad.state|=Pad.LEFT; break;
					case 3: pad.state|=Pad.RIGHT; break;
					case 4: pad.state|=Pad.UP|Pad.LEFT; break;
					case 5: pad.state|=Pad.DOWN|Pad.LEFT; break;
					case 6: pad.state|=Pad.DOWN|Pad.RIGHT; break;
					case 7: pad.state|=Pad.UP|Pad.RIGHT; break;
					case 4: pad.state|=Pad.B; break;
					case 5: pad.state|=Pad.A; break;
				}
			}
		}
	}

}

Pad.NONE=0;
Pad.UP=1;
Pad.DOWN=2;
Pad.LEFT=4;
Pad.RIGHT=8;
Pad.A=16;
Pad.B=32;

function Player(x,y) {
	this.x=x;
	this.y=y;
	this.w=16;
	this.h=32;
	this.speed=4;

	this.draw=function() {
		setFillStyle("#00FF00");
		fillRect(this.x,this.y,this.w,this.h);
	}

	this.update=function() {

		if((pad.state & Pad.UP)!=0) {
			this.y-=this.speed;
		}

		if((pad.state & Pad.DOWN)!=0) {
			this.y+=this.speed;
		}

		if((pad.state & Pad.LEFT)!=0) {
			this.x-=this.speed;
		}

		if((pad.state & Pad.RIGHT)!=0) {
			this.x+=this.speed;
		}

		if((pad.state & Pad.A)!=0) {

		}

		if((pad.state & Pad.B)!=0) {

		}

		if(this.x<0) {
			this.x=0;
		}

		if(this.x>canvas.width-this.w) {
			this.x=canvas.width-this.w;
		}

		if(this.y<0) {
			this.y=0;
		}

		if(this.y>canvas.height-this.h) {
			this.y=canvas.height-this.h;
		}

	}

}

Player.IDLE=0;
Player.WALKING=1;
Player.JUMPING=2;

function draw() {
	setFillStyle("#000000");
	fillRect(0,0,canvas.width,canvas.height);

	player.draw();
	player.update();

	pad.draw();
	pad.handleEvents(touches);
}

function touchEnd(event) {
	event.preventDefault();
	touches=event.targetTouches;
}

function touchMove(event) {
	event.preventDefault();
	touches=event.targetTouches;
}

function touchStart(event) {
	event.preventDefault();
	touches=event.targetTouches;
}

function main() {

	player=new Player(0,0);
	pad=new Pad();

	canvas.addEventListener("touchend", touchEnd, {passive:false});
	canvas.addEventListener("touchmove", touchMove, {passive:false});
	canvas.addEventListener("touchstart", touchStart, {passive:false});

	setInterval(draw,1000/60);
}

main();
