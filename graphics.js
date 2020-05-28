var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function setFillStyle(style) {
  ctx.fillStyle = style;
}

function setStrokeStyle(style) {
  ctx.strokeStyle = style;
}

function setLineWidth(width) {
  ctx.lineWidth = width;
}

function setFont(font) {
	ctx.font=font;
}

function drawPixel(x,y) {
  ctx.beginPath();
  ctx.rect(x, y, 1, 1);
  ctx.fill();
  ctx.closePath();
}

function drawLine(x0, y0, x1, y1) {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
  ctx.closePath();
}

function drawCircle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function fillCircle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}

function drawRect(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.stroke();
  ctx.closePath();
}

function fillRect(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fill();
  ctx.closePath();
}

function setTextAlign(alignment) {
	ctx.textAlign=alignment;
}

function setTextBaseline(alignment) {
	ctx.textBaseline=alignment;
}

function fillText(text, x, y) {
	ctx.fillText(text, x, y);
}
