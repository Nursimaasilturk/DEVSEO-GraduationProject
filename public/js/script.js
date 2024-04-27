$(function(){
    //------------- Skeloton Screen ------->  
	let loader = $('#skeloton-screen');
	let content = $('#main-content');
	setTimeout(function(){
		loader.hide();
		content.show();
	},1000);
	//------------- Skeloton Screen End -------> 
	//------------- Header Scroll -------> 
	$(window).on('scroll',function(){
		$(window).scrollTop() > 50 ? $('#header').addClass('active') : $('#header').removeClass('active');
	})
	//------------- Header Scroll End -------> 
	//------------- Recommadation Filter Slider -------> 
	$(".recom__filters-btn").on('click', function(){
		let targetFilter = $(this).attr('data-filter');
		function activeBtn(btn){
			$('.recom__filters-btn').removeClass('active');
		    $(btn).addClass('active');
		}
		function activeSlides(targetFilter){
			$('.recommendationSwiper .swiper-slide').css('display','none');
			$(`.recommendationSwiper .swiper-slide.${targetFilter}`).css('display','block');
		}
		function updateSlider(){
			recommadationSwiper.updateSize();
			recommadationSwiper.updateSlides();
			recommadationSwiper.updateSlidesClasses()
			recommadationSwiper.slideTo(0);
		}
		if(targetFilter == 'all'){
			$('.recommendationSwiper .swiper-slide').css('display','block');
			activeBtn(this);
			updateSlider();
		}else{
			activeSlides(targetFilter);
		    activeBtn(this);
		    updateSlider();
		}
		return false;
	});
	//------------- Recommadation Filter Slider End -------> 

	//------------- Mobile Menu Hamburger Menu -------> 
	// function openMobileMenu(){
	// 	$('.header__mobile-menu-list').addClass('active');
	// }
	// function closeMobileMenu(){
	// 	$('.header__mobile-menu-list').removeClass('active');
	// }
	$('#mobile-menu-open-btn').on('click',function(){
		$('.header__mobile-menu-list').addClass('active');
	});
	$('#mobile-menu-close-btn').on('click',function(){
		$('.header__mobile-menu-list').removeClass('active');
	 });
	 //------------- Mobile Menu Hamburger Menu End -------> 
});