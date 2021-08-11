$(document).ready(() => {
  $('.rooms__slider').slick({
    dots: true,
    slidesToShow: 1,
    adaptiveHeight: true,
    variableWidth: true,
    centerMode: true,
    appendDots: '.rooms__controls-dots',
    appendArrows: '.rooms__controls-arrows',
  });

  $('.reviews__slider').slick({
    dots: true,
    slidesToShow: 1,
    adaptiveHeight: true,
    variableWidth: true,
    appendDots: '.reviews__controls-dots',
    appendArrows: '.reviews__controls-arrows',
    responsive: [{
      breakpoint: 768,
      settings: {
        centerMode: true,
      }
    }],
  });
});
