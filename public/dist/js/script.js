$(function(){let e=$("#skeloton-screen"),i=$("#main-content");setTimeout(function(){e.hide(),i.show()},1e3),$(window).on("scroll",function(){50<$(window).scrollTop()?$("#header").addClass("active"):$("#header").removeClass("active")}),$(".recom__filters-btn").on("click",function(){var e=$(this).attr("data-filter");function i(e){$(".recom__filters-btn").removeClass("active"),$(e).addClass("active")}function o(){recommadationSwiper.updateSize(),recommadationSwiper.updateSlides(),recommadationSwiper.updateSlidesClasses(),recommadationSwiper.slideTo(0)}return("all"==e?$(".recommendationSwiper .swiper-slide"):(e=e,$(".recommendationSwiper .swiper-slide").css("display","none"),$(".recommendationSwiper .swiper-slide."+e))).css("display","block"),i(this),o(),!1}),$("#mobile-menu-open-btn").on("click",function(){$(".header__mobile-menu-list").addClass("active")}),$("#mobile-menu-close-btn").on("click",function(){$(".header__mobile-menu-list").removeClass("active")})});