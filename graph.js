let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let num_x,num_y, step;

let width = canvas.width;
let height = canvas.height;

let spanX = document.getElementById('spanX');
let spanY = document.getElementById('spanY');

let point = {};

let graphs = [];
let fun =[
	{
		a: 0,
		b: 0,
		fY: function (x) {
			return +this.a * x + +this.b;}
	},
	{
		a: 0,
		b: 0,
		c: 0,
		fY: function (x) {
			return +this.a * x * x + +this.b * x + +this.c;}
	},
	{
		a: 0,
		b: 0,
		fY: function (x) {
			return +this.a/x + +this.b;}	
	},
	{
		a: 0,
		b: 0,
		c: 0,
		fY: function (x) {
			return +this.a * Math.pow(+this.b, x) + +this.c;}
	},
	{
		a: 0,
		b: 0,
		c: 0,
		fY: function (x) {
			return +this.a * Math.sin(+this.b * x) + +this.c;}
	},
	{
		a: 0,
		b: 0,
		c: 0,
		fY: function (x) {
			return +this.a * Math.cos(+this.b * x) + +this.c;}
	}		
];

let range = document.getElementById('range');

step = range.value;

range.addEventListener('input', changeStep);
reDraw();

canvas.addEventListener('mousemove', function move(event) {
	point = converter(event.offsetX, event.offsetY);
	spanX.innerText = point.x;
	spanY.innerText = point.y;
});


function changeStep() {
	//console.log(range.value);
	step = range.value;

	reDraw();
}

function setGraph() {
	let funcName = document.querySelector('.select__input').id;
	let tmp = {};
	fun[funcName].a = document.getElementById('a').value;
			fun[funcName].b = document.getElementById('b').value;
			fun[funcName].c = document.getElementById('c').value;
			Object.assign(tmp, fun[funcName]);
	
	/*switch(funcName) {
		case '1' :
			fun1.a = document.getElementById('a').value;
			fun1.b = document.getElementById('b').value;
			Object.assign(tmp, fun1);
		break;
		case '2' :
			
		case '3' :
			fun3.a = document.getElementById('a').value;
			fun3.b = document.getElementById('b').value;
			Object.assign(tmp, fun3);
		break;
		case '4' :
			fun4.a = document.getElementById('a').value;
			fun4.b = document.getElementById('b').value;
			fun4.c = document.getElementById('c').value;
			Object.assign(tmp, fun4);
		break;
		case '5' :
			fun5.a = document.getElementById('a').value;
			fun5.b = document.getElementById('b').value;
			fun5.c = document.getElementById('c').value;
			Object.assign(tmp, fun5);
		break;	
	}*/
	graphs.unshift(tmp);

	draw(false);
	
}
//----------------Fun Нарисовать график---------------------------
function draw(all) {

	let minX,maxX,minY,maxY,y;

	minX = -num_x - 1;
	maxX = num_x + 1;

	ctx.lineWidth = 2;
	for (let i = 0; i < graphs.length; i++) {

		y = graphs[i].fY (minX);
		point = cTrans(minX, y);
		ctx.moveTo(point.x, point.y);

		
		for (let x = minX; x < maxX; x+= 0.05) {

			y = graphs[i].fY(x);
			point= cTrans(x, y);
			ctx.lineTo(point.x, point.y);
			ctx.stroke();
		}
		if (!all) {
			return;
		}
	}
	
}

function converter(x,y) {
	return {
		x : ((x - width/2) / step).toFixed(1),
		y : (-(y - height/2) / step).toFixed(1),
	}

}
//------------------Fun Преобразователь Координат-----------------

function cTrans(cX,cY) {
	return {
		x : cX * step + +width/2,
		y : -cY * step + +height/2
	}
}

function reset() {
	graphs.length = 0;
	reDraw();
}
//-----------------------Fun Перерисовка--------------------------

function reDraw() {


	//console.log('reDraw');
	num_x = (width/step - 2) / 2;
	num_y = (height/step - 2) / 2;
	
	ctx.clearRect(0, 0, width, height);
	ctx.font = '14px sans-serif'
//------------------------------СЕТКА(КЛЕТОЧКИ)-------------------
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#666';
	for (let i = 1; i <= num_x; i++) {

		point = cTrans(i ,0);
		ctx.moveTo(point.x, 0);
		ctx.lineTo(point.x, height);
	
		if (num_x > 12) {
			if (i%5 == 0) {
				ctx.fillText(i, point.x -12, height/2+14);
			}
		} else{
			ctx.fillText(i, point.x -12, height/2+14);
		}

		point = cTrans(-i ,0);
		ctx.moveTo(point.x, 0);
		ctx.lineTo(point.x, height);

		if (num_x > 12) {
			if (i%5 == 0) {
				ctx.fillText(-i, point.x +7, height/2+14);
			}
		} else{
			ctx.fillText(-i, point.x +7, height/2+14);
		}
	}


	for (let i = 1; i <= num_y; i++) {

		point = cTrans(0,i );
		ctx.moveTo(0,point.y);
		ctx.lineTo(width,point.y);

		if (num_y > 12) {
			if (i%5 == 0) {
				ctx.fillText(i, width/2+6,point.y +18 );
			}
		} else{
			ctx.fillText(i, width/2+6,point.y +18 );
		}

		point = cTrans(0,-i );
		ctx.moveTo(0,point.y);
		ctx.lineTo(width,point.y);

		if (num_y > 12) {
			if (i%5 == 0) {
				ctx.fillText(-i, width/2+7,point.y -7 );
			}
		} else{
			ctx.fillText(-i, width/2+7,point.y -7 );
		}

	}	

	ctx.stroke();
//---------------------------ОСИ----------------------------------
	ctx.beginPath();
	ctx.moveTo(width/2, 0);
	ctx.lineTo(width/2, height);
	ctx.moveTo(0, height/2);
	ctx.lineTo(width,height/2);
	ctx.lineWidth = 4;
	ctx.strokeStyle = '#000';
	ctx.font = "46px sans-serif";
	ctx.fillText('y', width/2 +16, 29);
	ctx.fillText('x', width-27,height/2 +42);
	ctx.closePath();
	ctx.stroke();

//---------------СТРЕЛОЧКИ НА ОСЯХ--------------------------------
//---------X----------
	ctx.beginPath();
	ctx.moveTo(width,height/2);
	ctx.lineTo(width-20,height/2 -15);
	ctx.moveTo(width,height/2);
	ctx.lineTo(width-20,height/2 +15);
//---------Y------------
	ctx.moveTo(width/2, 0);
	ctx.lineTo(width/2 +15,19 );
	ctx.moveTo(width/2,0);
	ctx.lineTo(width/2-15,19);
	ctx.closePath();
	ctx.stroke();
	draw(true);
}


