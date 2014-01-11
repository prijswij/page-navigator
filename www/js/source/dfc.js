$(function(){
	window.viewport = {
		width  : $(window).width(),
		height : $(window).height()
	};
	window.pageNavigatorTouch = {
		start		: {},
		end			: {},
		startTimer	: null
	};
	$("pagenavigator").on("touchstart", touchDownHandle);
	
});

function touchDownHandle(event){
	event.preventDefault();
	console.log("touch start: " , event);
	pageNavigatorTouch.startTimer = Date.now();
	$("pagenavigator").removeClass("slide-animation");
	pageNavigatorTouch.start = event.originalEvent.touches[0];
	$("pagenavigator").on("touchmove", touchMoveHandle);
};

function touchMoveHandle(event){
	console.log("touch move");
	pageNavigatorTouch.end = event.originalEvent.touches[0];
	movePercent = ((pageNavigatorTouch.end.pageX - pageNavigatorTouch.start.pageX) / viewport.width) * 100;
	console.log("=> movePercent : ", movePercent);
	$("pagenavigator").css({
		"-webkit-transform": "translate3d("+ (movePercent/3) +"% ,0,0)"
		//left : -100 + movePercent +"%"
	});
	$("pagenavigator").one("touchend", touchUpHandle);
};

function touchUpHandle(event){
	console.log("touch end : ", event)
	movePercent = ((pageNavigatorTouch.end.pageX - pageNavigatorTouch.start.pageX) / viewport.width) * 100;
	//swipe or slide
	isSwipe = (Date.now() - pageNavigatorTouch.startTimer) < 250 ? true : false;
	console.log("=> movePercent : ", movePercent);
	$("pagenavigator").addClass("slide-animation");
	if (Math.abs(movePercent) < 50){
		if(isSwipe){
			preformPageSlide(movePercent);
		}else{
			pageSlideReset();
		}
	} else {
		preformPageSlide(movePercent);
	};
	
	$("pagenavigator").off("touchmove", touchMoveHandle);
};

function preformPageSlide(movePercent){
	if(movePercent < 0){
		pageSlideLeft();
	} else {
		pageSlideRight();		
	}
};

function pageSlideReset(){
	$("pagenavigator").css({
		"-webkit-transform": "translate3d(0%,0,0)"
	});
}
function pageSlideLeft(){
	$("pagenavigator").css({
		"-webkit-transform": "translate3d(-33.3%,0,0)"
	});
}
function pageSlideRight(){
	$("pagenavigator").css({
		"-webkit-transform": "translate3d(33.3%,0,0)"
	});
}
