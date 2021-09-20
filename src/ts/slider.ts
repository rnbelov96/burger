export {};

const imagesLength = 5;
let currentImage = 1;
const mode = 1;

const translateXPosList = [
  {
    mode: 3,
    pos: -100,
  },
  {
    mode: 2,
    pos: -200,
  },
  {
    mode: 1,
    pos: -400,
  },
];
const initTranslateXPos = translateXPosList.find(el => el.mode === mode)
  ?.pos as number;
let translateXPos = initTranslateXPos;
const translateStep = 100 / mode;
let offset: number;
let posInit: number;
let isDragging = false;

const imgBgElList = document.querySelectorAll('.slider__img-bg');
imgBgElList[currentImage + 3].classList.add('visually-hidden');

const imagesBoxEl = document.querySelector(
  '.slider__img-box',
) as HTMLDivElement;
const wrapperEl = document.querySelector('.slider__wrapper') as HTMLDivElement;

let wrapperCoords = wrapperEl.getBoundingClientRect();
let wrapperLeftCoords = wrapperCoords.left;
let wrapperWidth = wrapperCoords.width;

const prevBtnEl = document.querySelector(
  '.slider__btn-prev',
) as HTMLButtonElement;
const nextBtnEl = document.querySelector(
  '.slider__btn-next',
) as HTMLButtonElement;

const blockBtns = () => {
  nextBtnEl.disabled = true;
  prevBtnEl.disabled = true;
};

const activateBtns = () => {
  nextBtnEl.disabled = false;
  prevBtnEl.disabled = false;
};

window.addEventListener('resize', () => {
  wrapperCoords = wrapperEl.getBoundingClientRect();
  wrapperLeftCoords = wrapperCoords.left;
  wrapperWidth = wrapperCoords.width;
});

const dragAction = (e: MouseEvent) => {
  const posX = e.pageX - wrapperLeftCoords;
  offset = ((posInit - posX) / wrapperWidth) * 100;
  const newTranslateXPos = translateXPos - offset;
  imagesBoxEl.style.transform = `translate3d(${newTranslateXPos}%, 0px, 0px)`;
};

const swipeAction = (e: TouchEvent) => {
  const posX = e.touches[0].clientX - wrapperLeftCoords;
  offset = ((posInit - posX) / wrapperWidth) * 100;
  const newTranslateXPos = translateXPos - offset;
  imagesBoxEl.style.transform = `translate3d(${newTranslateXPos}%, 0px, 0px)`;
};

const dragStart = (e: MouseEvent) => {
  imgBgElList[currentImage + 3].classList.remove('visually-hidden');
  isDragging = true;
  posInit = e.pageX - wrapperLeftCoords;
  wrapperEl.addEventListener('mousemove', dragAction);
  wrapperEl.addEventListener('touchmove', swipeAction);
};

const swipeStart = (e: TouchEvent) => {
  imgBgElList[currentImage + 3].classList.remove('visually-hidden');
  isDragging = true;
  posInit = e.touches[0].clientX - wrapperLeftCoords;
  wrapperEl.addEventListener('mousemove', dragAction);
  wrapperEl.addEventListener('touchmove', swipeAction);
};

const swipeEnd = () => {
  blockBtns();
  const prevCurrentImage = currentImage;
  isDragging = false;
  imagesBoxEl.style.transition = 'transform .5s';
  wrapperEl.removeEventListener('mousemove', dragAction);
  wrapperEl.removeEventListener('touchmove', swipeAction);

  if (offset < -translateStep / 8) {
    translateXPos += translateStep;
    currentImage -= 1;
    if (currentImage === 0) {
      currentImage = imagesLength;
    }
  }

  if (offset > translateStep / 8) {
    translateXPos -= translateStep;
    currentImage += 1;
    if (currentImage === imagesLength + 1) {
      currentImage = 1;
    }
  }

  if (currentImage === imagesLength) {
    imgBgElList[3].classList.add('visually-hidden');

    setTimeout(() => {
      imgBgElList[currentImage + 3].classList.add('visually-hidden');
      imgBgElList[3].classList.remove('visually-hidden');
    }, 500);
  }

  if (currentImage === 1) {
    imgBgElList[4 + imagesLength].classList.add('visually-hidden');

    setTimeout(() => {
      imgBgElList[currentImage + 3].classList.add('visually-hidden');
      imgBgElList[4 + imagesLength].classList.remove('visually-hidden');
    }, 500);
  }

  imgBgElList[currentImage + 3].classList.add('visually-hidden');

  offset = 0;

  imagesBoxEl.style.transform = `translate3d(${translateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    imagesBoxEl.style.transition = '';
    if (currentImage === imagesLength && prevCurrentImage === 1) {
      translateXPos = initTranslateXPos - translateStep * (imagesLength - 1);
      imagesBoxEl.style.transform = `translate3d(${translateXPos}%, 0px, 0px)`;
    }

    if (currentImage === 1 && prevCurrentImage === imagesLength) {
      translateXPos = initTranslateXPos;
      imagesBoxEl.style.transform = `translate3d(${translateXPos}%, 0px, 0px)`;
    }
    activateBtns();
  }, 500);
};

const swipeLeave = () => {
  if (isDragging) {
    swipeEnd();
  }
};

prevBtnEl.addEventListener('click', () => {
  imgBgElList[currentImage + 3].classList.remove('visually-hidden');
  blockBtns();
  const prevCurrentImage = currentImage;
  imagesBoxEl.style.transition = 'transform .5s';
  translateXPos += translateStep;
  currentImage -= 1;
  if (currentImage === 0) {
    currentImage = imagesLength;
  }

  if (currentImage === imagesLength) {
    imgBgElList[3].classList.add('visually-hidden');

    setTimeout(() => {
      imgBgElList[currentImage + 3].classList.add('visually-hidden');
      imgBgElList[3].classList.remove('visually-hidden');
    }, 500);
  }

  if (currentImage === 1) {
    imgBgElList[4 + imagesLength].classList.add('visually-hidden');

    setTimeout(() => {
      imgBgElList[currentImage + 3].classList.add('visually-hidden');
      imgBgElList[4 + imagesLength].classList.remove('visually-hidden');
    }, 500);
  }

  imgBgElList[currentImage + 3].classList.add('visually-hidden');

  imagesBoxEl.style.transform = `translate3d(${translateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    imagesBoxEl.style.transition = '';
    if (currentImage === imagesLength && prevCurrentImage === 1) {
      translateXPos = initTranslateXPos - translateStep * (imagesLength - 1);
      imagesBoxEl.style.transform = `translate3d(${translateXPos}%, 0px, 0px)`;
    }
    activateBtns();
  }, 500);
});

nextBtnEl.addEventListener('click', () => {
  imgBgElList[currentImage + 3].classList.remove('visually-hidden');
  blockBtns();
  const prevCurrentImage = currentImage;
  imagesBoxEl.style.transition = 'transform .5s';
  translateXPos -= translateStep;
  currentImage += 1;
  if (currentImage === imagesLength + 1) {
    currentImage = 1;
  }

  if (currentImage === imagesLength) {
    imgBgElList[3].classList.add('visually-hidden');

    setTimeout(() => {
      imgBgElList[currentImage + 3].classList.add('visually-hidden');
      imgBgElList[3].classList.remove('visually-hidden');
    }, 500);
  }

  if (currentImage === 1) {
    imgBgElList[4 + imagesLength].classList.add('visually-hidden');

    setTimeout(() => {
      imgBgElList[currentImage + 3].classList.add('visually-hidden');
      imgBgElList[4 + imagesLength].classList.remove('visually-hidden');
    }, 500);
  }

  imgBgElList[currentImage + 3].classList.add('visually-hidden');

  imagesBoxEl.style.transform = `translate3d(${translateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    imagesBoxEl.style.transition = '';
    if (currentImage === 1 && prevCurrentImage === imagesLength) {
      translateXPos = initTranslateXPos;
      imagesBoxEl.style.transform = `translate3d(${translateXPos}%, 0px, 0px)`;
    }
    activateBtns();
  }, 500);
});

wrapperEl.addEventListener('mousedown', dragStart);
wrapperEl.addEventListener('touchstart', swipeStart);

wrapperEl.addEventListener('mouseup', swipeEnd);
wrapperEl.addEventListener('touchend', swipeEnd);

wrapperEl.addEventListener('mouseleave', swipeLeave);
