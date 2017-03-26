var speed = 2;
var score = 0;
var first = true; //是否是第一次玩
var timer;

function init() {
	for (var i = 0; i < 4; i++) {
		createRow();
	}
	$('.game').click(function (e) {
		getEvent(e);
	});
}

function start() {
	if (!first) {
		$('.score').html(0);
		$(".game").css('top',-400);
		$(".game").html('');
		init();
	}
	first = false;
	$('.mask').hide();
	$('.button').html('重新开始');
	timer = setInterval('move()',30);
}

/*
 *创建每一行Row
 */
function createRow() {
	var gamebox = $(".game");
	var row = createDiv('row');
	var cells = createCell();
	for (var i = 0; i < cells.length; i++) {
		var cell = createDiv(cells[i]);
		$(row).append(cell);
	}
	if ($(gamebox).children()[0]) {
		$(row).insertBefore($(gamebox).children()[0]);
	}else{
		$(gamebox).append(row);
	}
}

/*
 *创建div并添加className
 *className：div的className
 */
function createDiv(className) {
	var div = document.createElement('div');
	div.className = className;
	return div;
}

/*
 *创建每一行cell的className
 */
function createCell(){
	var temp = ['cell', 'cell', 'cell', 'cell',];
	var i = Math.floor(Math.random()*4);
	temp[i] = 'cell black';
	return temp;
}

/*
 *判断点击的方块
 */
function getEvent(e) {
	e.preventDefault();
	var className = e.target.className;
	if (className == 'cell') {  //白块
		gameOver();
	}else if (className == 'cell black'){  //黑块
		e.target.className = 'cell';
		addScore();
	}
}

/*
 *移动动画
 */
function move() {
	var top = parseInt($('.game').css('top'));
	if (speed+top > 0) {
		top = 0;
	}else{
		top += speed;
	}
	$('.game').css('top',top);
	if (top === 0) {
		createRow();
		$('.game').css('top',-100);
		addspeed();
		delRow();
	}
}

/*
 *分数增加
 */
function addScore() {
	score += 1;
	$('.score').html(score);
}

/*
 *速度增加
 */
function addspeed() {
	if (score%5 == 1) {
		speed+=1;
	}
}

/*
 *删除最后一行以释放内存并判断是否gameOver
 */
function delRow(){
    var rowLength = $('.game').children().length;
    if(rowLength == 6) {
    	$('.game .row:last-child').remove();
   	}
    if (rowLength >= 5) {
    	var lastChild = $('.game .row:last-child');
    	var length = lastChild.find('.black').length;
    	if (length == 1) {
    		gameOver();
    	}
    }
}

function gameOver() {
	clearInterval(timer);
	alert('gameOver');
	$('.mask').show();
}

