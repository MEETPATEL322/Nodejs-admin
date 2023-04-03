$(document).ready(function () {
    var owl0 = $('.owl-carousel0');
    owl0.owlCarousel({
        margin: 0,
        nav: true,
        infinite: true,
        loop: false,
        responsive: {
            0: {
                items: 3
            },
            575: {
                item: 3
            },
            768: {
                items: 5
            },
            992: {
                items: 7
            },
            1200: {
                items: 9
            }
        }
    })
    $(document).on('click', '.next-single', function () {
        let ele = $(this).prev('.owl-carousel0').find('.owl-nav .owl-next');
        ele.click();
    });
    $(document).on('click', '.prev-single', function () {
        let ele = $(this).prev().prev('.owl-carousel0').find('.owl-nav .owl-prev');
        ele.click();
    });
});
$(document).on('click', '.next-full', function () {
    let ele = $(this).next().next('.owl-carousel0').find('.owl-dots .active');
    ele.next().click();
});
$(document).on('click', '.prev-full', function () {
    let ele = $(this).next('.owl-carousel0').find('.owl-dots .active');
    ele.prev().click();
});

var swiper = new Swiper('#movie-slider', {
    spaceBetween: 30,
    slidesPerView: 1,
    loop: true,
    autoplay: true,
    autoplayStopOnLast: false, // loop false also
    breakpoints: {
        1024: {
            slidesPerView: 1.5,
            centeredSlides: true,
        },

        767: {
            slidesPerView: 1,
            centeredSlides: false,
            spaceBetweenSlides: 10
        }
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false
    },
});