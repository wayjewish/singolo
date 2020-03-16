document.addEventListener('DOMContentLoaded', function(){
	let menu_list = document.querySelectorAll('.menu__list a');
	for (let menu_elem of menu_list) {
		menu_elem.addEventListener('click', function(e) {
			e.preventDefault();

			document.querySelector('.menu__list .active').classList.remove("active");
			this.parentElement.classList.add("active");

			let section = document.getElementById(this.getAttribute('handle'));
			section.scrollIntoView({
				block: "start",
				behavior: "smooth"
			});

			return false;
		});
	}

	/*--------------------------------------------------------------*/

	let left_arrow = document.querySelector('.slider__arrow-left img');
	let right_arrow = document.querySelector('.slider__arrow-right img');
	let checkAction = false;

	left_arrow.addEventListener('click', function() {
		if (!checkAction) {
			checkAction = true;

			let activeSlide = document.querySelector('.slider__slide.active')
			let prevSlide = activeSlide.previousElementSibling;

			if (prevSlide == null) {
				prevSlide = document.querySelector('.slider__list').lastElementChild;
			}

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

			if (nextSlide == null) {
				nextSlide = document.querySelector('.slider__list').firstElementChild;
			}

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
	for (let button of filter_buttons) {
		button.addEventListener('click', function() {
			let filter = this.getAttribute('filter');

			document.querySelector('.filter-buttons button.active').classList.remove("active");
			this.classList.add("active");

			if (filter == 0) {
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
			}
		});
	}

	let art_list_img = document.querySelectorAll('.art-list__item img');
	for (let img of art_list_img) {
		img.addEventListener('click', function() {
			if (document.querySelector('.art-list__item img.border')){
				document.querySelector('.art-list__item img.border').classList.remove("border");
			}
			this.classList.add("border");
		});
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

			data_btn.addEventListener('click', function() {
				data_block.remove();
				show_form = false;
			});
		}

		return false;
	});
});


