

((function(){
    let swiper = new Swiper(".myMainSwiper", {
        centeredSlides: true,
        autoplay: {
          delay: 4500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: false,
        },
        navigation: {
          nextEl: ".mySwiper > .swiper-button-next",
          prevEl: ".mySwiper > .swiper-button-prev",
        },
      });
    
})());


