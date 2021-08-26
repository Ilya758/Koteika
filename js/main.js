$(document).ready(() => {

  const formWrapper = document.querySelector('.wrapper_elem_form');
  const popupWrapper = document.querySelector('.wrapper_elem_popup');
  const thanksWrapper = document.querySelector('.wrapper_elem_popup-thanks');
  const closeButton = document.querySelectorAll('.wrapper_elem_close-btn');

  const headerObjects = {
    '.header-inner': 'header_height_static',
    '.header-inner__nav': 'dropdown__content-nav',
    '.header-inner__list': 'active',
    '.dropdown__btn': 'dropdown__btn_st_active',
  };

  const classHandler = (elem, cls, method) => {
    if (method === 'add') {
      elem.classList.add(cls);
    } else {
      elem.classList.remove(cls);
    }
  };

  const classToggler = (obj, method) => {
    for (let elem in obj) {
      (method === 'remove') ? $(elem).removeClass(obj[elem]) : $(elem).toggleClass(obj[elem]);
    }
  };

  const dropBtn = document.querySelector('.dropdown__btn');
  dropBtn.addEventListener('click', () => {
    classToggler(headerObjects);
  });

  const header = document.querySelector('.header-inner');

  header.addEventListener('touchstart', handleTouchStart, false);
  header.addEventListener('touchmove', handleTouchMove, false);

  let xDown = null;
  let yDown = null;

  function getTouches(evt) { // returns standard method of evt.target or do the same things, but with using jQuery
    return evt.touches ||
      evt.originalEvent.touches;
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        classToggler(headerObjects);
      }
    }

    xDown = null;
    yDown = null;
  }

  (() => { // fixClass on resize
    window.addEventListener('resize', () => {
      if (document.documentElement.clientWidth > 768) {
        classToggler(headerObjects, 'remove');
      }
      if (document.documentElement.clientWidth > 1200) {
        if (formWrapper) {
          formWrapper.style.opacity = 1;
        }
      }
    });
  })();

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

  (() => { // handler of sort list
    const list = document.querySelector('.apartments__dropdown-content');
    const item = document.querySelectorAll('.apartments__dropdown-item');

    item.forEach((i) => {
      if (item) { // check existence of list items
        item[0].classList.add('act');
      }
      i.addEventListener('click', (event) => {

        if (event.target !== i) {
          i.classList.toggle('item_no_margin');
          list.classList.toggle('arrow_st_rotate');
          list.classList.toggle('visible');

          item.forEach((e) => { // enumeration of elem and remove active class for all of them, then add him to event.target
            e.classList.remove('act');
            event.target.parentElement.classList.add('act');
          });
        }
      });
    });

  })();

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

  const client = document.querySelector('#client');
  const pet = document.querySelector('#pet');
  const phone = document.querySelector('#phone');
  const email = document.querySelector('#email');
  const date = document.querySelectorAll('.popup__date');
  const regName = /[A-Za-zа-яА-я]{3,}/gim;
  const regEmail = /[_\s0-9]*^[a-z][a-z-0-9-A-Z_]*@[a-z]{2,}\.[a-z]{2,}$/gi;
  const textForClientName = document.querySelector('.name');
  const textForPetName = document.querySelector('.pet');
  const textForPhone = document.querySelector('.phone');
  const textForEmail = document.querySelector('.email');
  const textForDate = document.querySelector('.date');
  const submitBtn = document.querySelector('.popup__btn');
  const form = document.querySelector('form');
  const thanks = document.querySelector('.wrapper_elem_popup-thanks');

  const formSubmit = (event) => {
    event.preventDefault();
    checkName(textForClientName, client, regName);
    checkName(textForPetName, pet, regName);
    checkPhone(textForPhone, phone);
    checkEmail(textForEmail, email, regEmail);
    checkDate(textForDate, date);
    const input = document.querySelectorAll('.popup__input, .popup__date');
    let inputThatHaveError = [];
    input.forEach((inp) => {

      if (inp.classList.contains('error')) {
        inputThatHaveError.push(inp);
      }

    });
    inputThatHaveError.length === 0 ? thanks.classList.add('active') : event.preventDefault();
  };

  submitBtn.addEventListener('click', formSubmit);

  $('#phone').mask('+37529 999-99-99');

  const checkName = (text, input, regExp) => {
    if (input.length < 3 || !input.value.match(regExp)) {
      [text, input].forEach((e) => {
        classHandler(e, 'error', 'add');
      });
    } else {
      [text, input].forEach((e) => {
        classHandler(e, 'error');
      });
    }
  };

  const checkPhone = (text, input) => {
    if (phone.value.length !== 16) {
      [text, input].forEach((e) => {
        classHandler(e, 'error', 'add');
      });
    } else {
      [text, input].forEach((e) => {
        classHandler(e, 'error');
      });
    }
  };

  const checkEmail = (text, input, regExp) => {

    if (!input.value.match(regExp)) {
      [text, input].forEach((e) => {
        classHandler(e, 'error', 'add');
      });
    } else {
      [text, input].forEach((e) => {
        classHandler(e, 'error');
      });
    }

  };

  const checkDate = (text, input) => {
    const startDate = document.querySelector('input[name="date-min"]');
    const endDate = document.querySelector('input[name="date-max"]');
    [startDate, endDate].forEach((elem) => {
      if (elem.value.length === 0) {
        [text, input].forEach((e) => {
          if (e === input) {
            Array.from(e).forEach((j) => {
              classHandler(j, 'error', 'add');
            });
          } else {
            classHandler(e, 'error', 'add');
          }
        });
      } else {
        [text, input].forEach((e) => {
          if (e === input) {
            Array.from(e).forEach((j) => {
              classHandler(j, 'error');
            });
          } else {
            classHandler(e, 'error');
          }
        });
      }
    });
  };

  const btnSubmitForm = document.querySelectorAll('.btn_type_submit-form');

  btnSubmitForm.forEach((elem) => {
    elem.addEventListener('click', () => {
      form.submit();
    });
  });

  (() => {
    $('.gallery__pics-secondary a').fancybox();
  })();

  document.addEventListener('touchstart', (event) => { // delete the class when will be generated touchstart at document
    const checkingClass = 'active_anim';
    if (event.target.classList.contains(checkingClass)) {
      event.target.classList.remove(checkingClass);
    }
  });
});

