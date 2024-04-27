var heroSwiper = new Swiper(".heroSwiper", {
	slidesPerView: "auto",
	spaceBetween: 10,
	freeMode: true,
	breakpoints:{
		575:{
			slidesPerView: "auto",
			spaceBetween: 30,
			freeMode: true,
		}
	}
});
var reviewSwiper = new Swiper(".reviewSwiper", {
	slidesPerView: 1,
	centeredSlides: true,
	spaceBetween: 30,
	loop:true,
	initialSlide:1,
	pagination: {
	  el: ".swiper-pagination",
	  clickable: true,
	},
	breakpoints:{
		575:{
			slidesPerView: "auto",
			centeredSlides: true,
			spaceBetween: 30
		}
	}
});
var productSwiper = new Swiper(".productSwiper", {
	slidesPerView: 3,
	spaceBetween: 10,
	loop:false,
	breakpoints:{
		575:{
			slidesPerView: 3,
			spaceBetween: 30,
			loop:true,
		}
	}
});
var recommadationSwiper = new Swiper(".recommendationSwiper", {
	slidesPerView: 'auto',
	spaceBetween: 10,
	freeMode: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints:{
		slidesPerView: 3.5,
		spaceBetween: 30,
		freeMode: true,
	}
});