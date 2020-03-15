document.addEventListener('DOMContentLoaded', function(){
	let menu_list = document.querySelectorAll('.menu__list a');
	for (let menu_elem of menu_list) {
		menu_elem.addEventListener('click', handleButtonClick);
	}

	let left_arrow = document.querySelector('.slider__arrow-left img');
	let right_arrow = document.querySelector('.slider__arrow-right img');

	left_arrow.addEventListener('click', sliderLeft);
	right_arrow.addEventListener('click', sliderRight);
	

});

function sliderLeft() {
	console.log("sliderLeft");


}
function sliderRight() {
	console.log("sliderRight");

	let activeSlide = document.querySelector('.slider__slide.active')
	let nextSlide = activeSlide.nextElementSibling;
	console.log(nextSlide);

	if (nextSlide == null) {
		nextSlide = document.querySelector('.slider__list').firstElementChild;
		console.log(nextSlide);
	}

	activeSlide.classList.remove("active");
	nextSlide.classList.add("active");
}



function handleButtonClick(e) {
	e.preventDefault();

	document.querySelector('.menu__list .active').classList.remove("active");
	this.parentElement.classList.add("active");

	let section = document.getElementById(this.getAttribute('handle'));
	section.scrollIntoView({
		block: "start",
		behavior: "smooth"
	});

	return false;
}











/*window.addEventListener('scroll', function() {
		console.log(window.pageYOffset);

		let sections = document.querySelectorAll('sections');

		for (let section of sections) {
			section.addEventListener('click', handleButtonClick);
		}

		console.log(getCoords(elem));
	});*/
/*function getCoords(elem) {
	var box = elem.getBoundingClientRect();

	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
}*/