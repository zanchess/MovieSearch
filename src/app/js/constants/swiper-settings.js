const swiperSettings = {
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },
  slidesPerView: 4,
  spaceBetween: 70,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    310: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    720: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    980: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1260: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
};

export default swiperSettings;
