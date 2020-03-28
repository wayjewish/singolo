document.addEventListener('DOMContentLoaded', function(){
	let menu_icon = document.querySelector(".menu-icon");
	menu_icon.addEventListener('click', function(e) {
		this.classList.toggle("active");
		document.querySelector(".header").classList.toggle("active");
	});

	/*--------------------------------------------------------------*/

	let menu_list = document.querySelectorAll('.menu__list a');
	let header_height = document.querySelector("header").getBoundingClientRect().height;

	let coordinates_sections = [];

	for (let menu_elem of menu_list) {

		let section = document.querySelector(menu_elem.href.replace(/[^#]*(.*)/, '$1'));

		menu_elem['sectionTop'] = section.getBoundingClientRect().top + window.pageYOffset;
		//menu_elem['sectionBot'] = menu_elem['sectionTop'] + section.getBoundingClientRect().height;

		menu_elem.addEventListener('click', function(e) {
			e.preventDefault();

			menu_icon.classList.remove("active");
			document.querySelector(".header").classList.remove("active");

			let w = window.pageYOffset;//текущее положение 
			let top_section = section.getBoundingClientRect().top - header_height;//координаты блока
			let start = null;

			requestAnimationFrame(step);

			function step(time) {
			    if (start === null) start = time;

			    let progress = time - start;
			    let differences = (top_section < 0 ? Math.max(w - progress, w + top_section) : Math.min(w + progress, w + top_section));

			    window.scrollTo(0,differences);

			    if (differences != w + top_section) requestAnimationFrame(step);
			}
		});
	}

	window.addEventListener('scroll', function() {
		let active_elem;

		for (let menu_elem of menu_list) {
			if (window.pageYOffset + header_height >= menu_elem['sectionTop']){
				active_elem = menu_elem;
			}
		}
		if (active_elem == undefined) active_elem = menu_list[0];

		document.querySelector('.menu__list .active').classList.remove("active");
		active_elem.parentElement.classList.add("active");
	});

	/*--------------------------------------------------------------*/

	let left_arrow = document.querySelector('.slider__arrow-left img');
	let right_arrow = document.querySelector('.slider__arrow-right img');
	let checkAction = false;

	left_arrow.addEventListener('click', function() {
		if (!checkAction) {
			checkAction = true;

			let activeSlide = document.querySelector('.slider__slide.active')
			let prevSlide = activeSlide.previousElementSibling;
			if (prevSlide == null) prevSlide = document.querySelector('.slider__list').lastElementChild;

			document.querySelector("#slider").setAttribute("slide", prevSlide.getAttribute('slide'));

			prevSlide.classList.add("pos-left");

			setTimeout(function() {
				activeSlide.classList.add("to-right");
				prevSlide.classList.add("at-left");
			}, 30);

			setTimeout(function() {
				activeSlide.classList.remove("to-right");
				prevSlide.classList.remove("pos-left");
				prevSlide.classList.remove("at-left");

				activeSlide.classList.remove("active");
				prevSlide.classList.add("active");

				checkAction = false;
			}, 430);
			
			return false;
		}
	});
	right_arrow.addEventListener('click', function() {
		if (!checkAction) {
			checkAction = true;

			let activeSlide = document.querySelector('.slider__slide.active')
			let nextSlide = activeSlide.nextElementSibling;
			if (nextSlide == null) nextSlide = document.querySelector('.slider__list').firstElementChild;

			document.querySelector("#slider").setAttribute("slide", nextSlide.getAttribute('slide'));

			activeSlide.classList.add("to-left");
			nextSlide.classList.add("at-right");

			setTimeout(function() {
				activeSlide.classList.remove("to-left");
				nextSlide.classList.remove("at-right");

				activeSlide.classList.remove("active");
				nextSlide.classList.add("active");

				checkAction = false;
			}, 400);
			
			return false;
		}
	});
	
	/*--------------------------------------------------------------*/

	let phone_buttons = document.querySelectorAll('.phone-button');
	for (let button of phone_buttons) {
		button.addEventListener('click', function() {
			let phone = this.parentElement.parentElement;
			phone.querySelector(".phone-display").classList.toggle("hide");
		});
	}

	/*--------------------------------------------------------------*/

	let filter_buttons = document.querySelectorAll('.filter-buttons button');
	let wrap_projects = document.querySelector('.art-list');
	let projects = document.querySelectorAll('.art-list__item');

	console.log(projects);

	for (let button of filter_buttons) {
		button.addEventListener('click', function() {
			let filter = this.getAttribute('filter');

			document.querySelector('.filter-buttons button.active').classList.remove("active");
			this.classList.add("active");

			/*if (filter == 0) {
				let items = document.querySelectorAll('.art-list__item.hide');
				for (let item of items) {
					item.classList.remove("hide");
				}
			}else{
				let items = document.querySelectorAll('.art-list__item');
				for (let item of items) {
					if (item.getAttribute('filter') == filter) {
						item.classList.remove("hide");
					}else{
						item.classList.add("hide");
					}
				}
			}*/

			let wrap_projects_html = "";
			wrap_projects.innerHTML = "";
			if (filter == 0) {
				for (let project of projects) {
					wrap_projects_html += project.outerHTML;
				}
				wrap_projects.innerHTML  = wrap_projects_html;

				initArtList();
			}else{
				for (let project of projects) {
					if (project.getAttribute('filter') == filter) {
						wrap_projects_html += project.outerHTML;
					}
				}
				wrap_projects.innerHTML  = wrap_projects_html;

				initArtList();
			}
		});
	}

	/*--------------------------------------------------------------*/

	initArtList();
	function initArtList() {
		let art_list_img = document.querySelectorAll('.art-list__item img');
		for (let img of art_list_img) {
			img.addEventListener('click', function() {
				if (document.querySelector('.art-list__item img.border')){
					document.querySelector('.art-list__item img.border').classList.remove("border");
				}
				this.classList.add("border");
			});
		}
	}

	/*--------------------------------------------------------------*/

	let form = document.querySelector('.contact-form');
	let show_form = false;
	form.addEventListener('submit', function(e) {
		e.preventDefault();

		if (!show_form) {
			show_form = true;
			let data_block = document.createElement("div");
			data_block.className = "pop-up";

			let data_text = "<p>Письмо отправлено</p>";

			let subject = form.querySelector('input[name="subject"]').value;
			if(subject == ""){
				data_text += "<p>Без темы</p>";
			}else{
				data_text += "<p>Тема: "+subject+"</p>";
			}

			let message = form.querySelector('textarea[name="message"]').value;
			if(message == ""){
				data_text += "<p>Без описания</p";
			}else{
				if (message.length > 50) {
					message = message.substr(0, 50)+"...";
				}
				data_text += "<p>Описание: "+message+"</p>";
			}

			let data_btn = document.createElement("button");
			data_btn.className = "pop-up__hide";
			data_btn.innerHTML = "OK";

			data_block.innerHTML = data_text;

			document.getElementById("contacts").append(data_block);
			document.querySelector(".pop-up").append(data_btn);

			form.querySelector('input[name="name"]').value = "";
			form.querySelector('input[name="email"]').value = "";
			form.querySelector('input[name="subject"]').value = "";
			form.querySelector('textarea[name="message"]').value = "";

			data_btn.addEventListener('click', function() {
				data_block.remove();
				show_form = false;
			});
		}

		return false;
	});
	
});


