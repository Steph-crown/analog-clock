window.addEventListener("load", start, false);

function start()
{

	//Gets the canvas element
	var canvas = document.getElementById("myCanvas");
	
	//Creates the drawing object
	var context = canvas.getContext("2d");
	
	//Colors the background blue
	context.fillStyle = "black"
	context.fillRect(0,0,canvas.width, canvas.height);
	
	//Gets the radius(half of the canvas width)
	var radius = canvas.width / 2;
	
	//Makes the circle start from center
	context.translate(radius, radius);
	
	//Prevents the clock circle from touching the edge
	radius = radius * 0.90;
	setInterval(startClock, 1000, context, radius, canvas);
}
	
function startClock(context, radius, canvas)
{
	//Draws the clock
	drawClock(context, radius);
	drawNumbers(context, radius);
	drawTime(context, radius);
	digital(context, radius, canvas);
	
	context.beginPath();
	context.arc(0, 0, radius * 0.03, 0, 2 * Math.PI);
	context.fillStyle = "red";
	context.fill();
}
	
	
	function drawClock(x, r) 
	{
	
		//Draws the outer circle
		x.arc(0, 0, r, 0 , 2 * Math.PI);
		x.fillStyle = "black";
		x.fill();
	
		//Draws the center
		x.beginPath();
		x.arc(0, 0, r * 0.05, 0, 2 * Math.PI);
		x.fillStyle = "white";
		x.fill();
	}
	
	function drawNumbers(x, r) 
	/*
	Writes Numbers 1-12 In the Circle
	And Puts Circumferencing dots round it
	*/
	{
		//Font of the numbers
		x.font = r * 0.18 + "px Courier";
		
		//Sets the numbers in the center of their position
		x.textBaseline = "middle";
		x.textAlign = "center";
		
		//Sets style of drawer to white
		x.fillStyle = "white";
		
		//Iterates from 1-12
		for(var i = 1; i <= 12; i++)
		{
			//Gets corresponding angle for each numbers
			//1 is 30deg that is Pi/6 amd so on
			var ang = i * Math.PI / 6;
			
			//Positions the numbers
			x.rotate(ang);
			x.translate(0, -r * 0.85);
			x.rotate(-ang);
			x.fillText(i.toString(), 0, 0);
			x.rotate(ang);
			x.translate(0, r * 0.85);
			x.rotate(-ang);
		}
		
		//Iterates from 1-60
		for(var i = 1; i <= 60; i += 1)
		{
			//Calculates angle and position dots round the circle
			var line = i * Math.PI / 30;
			x.strokeStyle = "white";
			x.lineWidth = 4;
			x.lineCap = "butt"
			x.beginPath();
			
			//For multiples of 5, the dots have larger width
			if (i % 5 == 0)
				{
					x.lineWidth = 10;
					x.arc(0,0,r,line, line+0.021);
				}
			else
				{
					x.arc(0,0,r,line, line+0.009);
				}
			x.stroke()
		}
	
	}
	
	
	
	function drawTime(x, r)
	{
		//Gets hour, minute and seconds
		var now = new Date();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		
		
		//Converts hour to 12-hour Time
		hour = hour % 12;
		
		//Gets angle of the hour hand, wrt the clock
		hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
		
		//Draws the hour hand
		drawHand(x, Math.PI + hour, r*0.05, r*0.07, "white", "butt");
		drawHand(x, hour, r*0.6, r*0.05, "white", "round");
		
		//Gets angle of the minute hand, wrt the clock
		minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
		
		//Draws the minute hand
		drawHand(x, Math.PI + minute, r*0.05, r*0.07, "white", "butt");
		drawHand(x, minute, r*0.8, r*0.03, "white", "round");
		
		////Gets angle of the seconds hand, wrt the clock
		second = (second*Math.PI/30);
		
		//Draws the seconds hand
		drawHand(x, Math.PI + second, r*0.3, r*0.03, "#ff0000", "butt");
		drawHand(x, second, r, r*0.01, "#ff0000", "round");
	}
	
	function drawHand(x, pos, length, width, color, line_style) 
	{
		/*
		Draws a line of specified length and width
		and starting from a specified position
		*/
		x.strokeStyle = color;
		x.beginPath();
		x.lineWidth = width;
		x.lineCap = line_style;
		x.lineJoin = "miter";
		x.moveTo(0,0);
		x.rotate(pos);
		x.lineTo(0, -length);
		x.stroke();
		x.rotate(-pos);
	}
	function digital(x, r, canvas)
	{
		var now = new Date()
		x.font = r * 0.12 + "px Courier";
		x.fillStyle = "white"
		x.fillText(now.toLocaleString(), 0,43);
		x.fillText("Crown's Clock", 0, 0);
		x.fill();
		
	}