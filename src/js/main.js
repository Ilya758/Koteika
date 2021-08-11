$(document).ready(() => {
  const formWrapper = document.querySelector('.wrapper_elem_form');
  const popupWrapper = document.querySelector('.wrapper_elem_popup');
  const thanksWrapper = document.querySelector('.wrapper_elem_popup-thanks');
  const closeButton = document.querySelectorAll('.wrapper_elem_close-btn');

  const classHandler = (elem, cls, method) => {
    if (method === 'add') {
      elem.classList.add(cls);
    } else {
      elem.classList.remove(cls);
    }
  };

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

  const formButton = document.querySelector('#btn');
  const popupButton = document.querySelector('.btn_c_white');
  const roomsButton = document.querySelectorAll('.rooms__btn');
  const galleryButton = document.querySelector('.gallery__btn');

  const addListener = (cls, btns, type) => {

    if (type === 'NodeList') {
      if (Object.values(btns).length === 0) {
        return;
      }
    } else {
      if (btns === null) {
        return;
      }
    }

    if (Object.values(btns).length > 1) {
      for (let btn of btns) {
        btn.addEventListener('click', () => {
          classHandler(cls, 'active_anim', 'add');
        });
      }
    } else {
      btns.addEventListener('click', () => {
        classHandler(cls, 'active_anim', 'add');
      });
    }
  };

  addListener(formWrapper, formButton);
  addListener(popupWrapper, popupButton);
  addListener(popupWrapper, roomsButton, 'NodeList');
  addListener(popupWrapper, galleryButton);

  closeButton.forEach((b) => { // smoothly removes classes when generate the event
    b.addEventListener('click', () => {
      let sort = [];
      [formWrapper, popupWrapper, thanksWrapper].forEach((wrapper) => {
        if (wrapper !== null) {
          sort.push(wrapper);
        }
      });

      sort.forEach((wrap) => {
        if (wrap === formWrapper || document.documentElement.clientWidth > 1200) {
          wrap.style.cssText = 'transition: 0.5s ease-in; opacity: 0';
          wrap.style.opacity = '1';
        } else {
          wrap.style.cssText = 'transition: 0.5s ease-in; opacity: 0';
        }
      });

      sort.forEach((wrap) => {
        setTimeout(() => {
          wrap.classList.remove('active', 'active_anim');
          if (wrap !== formWrapper && document.documentElement.clientWidth < 1200) {
            wrap.style.cssText = 'display: none';
          }
        }, 510);
      });
    });
  });
});
