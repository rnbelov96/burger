export {};

const imagesLength = 13;
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

// wok
const wokimagesLength = 7;
let wokcurrentImage = 1;
const wokmode = 1;

const wokinitTranslateXPos = translateXPosList.find(el => el.mode === wokmode)
  ?.pos as number;
let woktranslateXPos = wokinitTranslateXPos;
const woktranslateStep = 100 / wokmode;
let wokoffset: number;
let wokposInit: number;
let wokisDragging = false;

const wokimgBgElList = document.querySelectorAll('.wok-slider__img-bg');
wokimgBgElList[wokcurrentImage + 3].classList.add('visually-hidden');

const wokimagesBoxEl = document.querySelector(
  '.wok-slider__img-box',
) as HTMLDivElement;
const wokwrapperEl = document.querySelector(
  '.wok-slider__wrapper',
) as HTMLDivElement;

let wokwrapperCoords = wokwrapperEl.getBoundingClientRect();
let wokwrapperLeftCoords = wokwrapperCoords.left;
let wokwrapperWidth = wokwrapperCoords.width;

const wokprevBtnEl = document.querySelector(
  '.wok-slider__btn-prev',
) as HTMLButtonElement;
const woknextBtnEl = document.querySelector(
  '.wok-slider__btn-next',
) as HTMLButtonElement;

const wokblockBtns = () => {
  woknextBtnEl.disabled = true;
  wokprevBtnEl.disabled = true;
};

const wokactivateBtns = () => {
  woknextBtnEl.disabled = false;
  wokprevBtnEl.disabled = false;
};

window.addEventListener('resize', () => {
  wokwrapperCoords = wokwrapperEl.getBoundingClientRect();
  wokwrapperLeftCoords = wokwrapperCoords.left;
  wokwrapperWidth = wokwrapperCoords.width;
});

const wokdragAction = (e: MouseEvent) => {
  const posX = e.pageX - wokwrapperLeftCoords;
  wokoffset = ((wokposInit - posX) / wokwrapperWidth) * 100;
  const newTranslateXPos = woktranslateXPos - wokoffset;
  wokimagesBoxEl.style.transform = `translate3d(${newTranslateXPos}%, 0px, 0px)`;
};

const wokswipeAction = (e: TouchEvent) => {
  const posX = e.touches[0].clientX - wokwrapperLeftCoords;
  wokoffset = ((wokposInit - posX) / wokwrapperWidth) * 100;
  const newTranslateXPos = woktranslateXPos - wokoffset;
  wokimagesBoxEl.style.transform = `translate3d(${newTranslateXPos}%, 0px, 0px)`;
};

const wokdragStart = (e: MouseEvent) => {
  wokimgBgElList[wokcurrentImage + 3].classList.remove('visually-hidden');
  wokisDragging = true;
  wokposInit = e.pageX - wokwrapperLeftCoords;
  wokwrapperEl.addEventListener('mousemove', wokdragAction);
  wokwrapperEl.addEventListener('touchmove', wokswipeAction);
};

const wokswipeStart = (e: TouchEvent) => {
  wokimgBgElList[wokcurrentImage + 3].classList.remove('visually-hidden');
  wokisDragging = true;
  wokposInit = e.touches[0].clientX - wokwrapperLeftCoords;
  wokwrapperEl.addEventListener('mousemove', wokdragAction);
  wokwrapperEl.addEventListener('touchmove', wokswipeAction);
};

const wokswipeEnd = () => {
  wokblockBtns();
  const prevCurrentImage = wokcurrentImage;
  wokisDragging = false;
  wokimagesBoxEl.style.transition = 'transform .5s';
  wokwrapperEl.removeEventListener('mousemove', wokdragAction);
  wokwrapperEl.removeEventListener('touchmove', wokswipeAction);

  if (wokoffset < -woktranslateStep / 8) {
    woktranslateXPos += woktranslateStep;
    wokcurrentImage -= 1;
    if (wokcurrentImage === 0) {
      wokcurrentImage = wokimagesLength;
    }
  }

  if (wokoffset > woktranslateStep / 8) {
    woktranslateXPos -= woktranslateStep;
    wokcurrentImage += 1;
    if (wokcurrentImage === wokimagesLength + 1) {
      wokcurrentImage = 1;
    }
  }

  if (wokcurrentImage === wokimagesLength) {
    wokimgBgElList[3].classList.add('visually-hidden');

    setTimeout(() => {
      wokimgBgElList[wokcurrentImage + 3].classList.add('visually-hidden');
      wokimgBgElList[3].classList.remove('visually-hidden');
    }, 500);
  }

  if (wokcurrentImage === 1) {
    wokimgBgElList[4 + wokimagesLength].classList.add('visually-hidden');

    setTimeout(() => {
      wokimgBgElList[wokcurrentImage + 3].classList.add('visually-hidden');
      wokimgBgElList[4 + wokimagesLength].classList.remove('visually-hidden');
    }, 500);
  }

  wokimgBgElList[wokcurrentImage + 3].classList.add('visually-hidden');

  wokoffset = 0;

  wokimagesBoxEl.style.transform = `translate3d(${woktranslateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    wokimagesBoxEl.style.transition = '';
    if (wokcurrentImage === wokimagesLength && prevCurrentImage === 1) {
      woktranslateXPos = wokinitTranslateXPos - woktranslateStep * (wokimagesLength - 1);
      wokimagesBoxEl.style.transform = `translate3d(${woktranslateXPos}%, 0px, 0px)`;
    }

    if (wokcurrentImage === 1 && prevCurrentImage === wokimagesLength) {
      woktranslateXPos = wokinitTranslateXPos;
      wokimagesBoxEl.style.transform = `translate3d(${woktranslateXPos}%, 0px, 0px)`;
    }
    wokactivateBtns();
  }, 500);
};

const wokswipeLeave = () => {
  if (wokisDragging) {
    wokswipeEnd();
  }
};

wokprevBtnEl.addEventListener('click', () => {
  wokimgBgElList[wokcurrentImage + 3].classList.remove('visually-hidden');
  wokblockBtns();
  const prevCurrentImage = wokcurrentImage;
  wokimagesBoxEl.style.transition = 'transform .5s';
  woktranslateXPos += woktranslateStep;
  wokcurrentImage -= 1;
  if (wokcurrentImage === 0) {
    wokcurrentImage = wokimagesLength;
  }

  if (wokcurrentImage === wokimagesLength) {
    wokimgBgElList[3].classList.add('visually-hidden');

    setTimeout(() => {
      wokimgBgElList[wokcurrentImage + 3].classList.add('visually-hidden');
      wokimgBgElList[3].classList.remove('visually-hidden');
    }, 500);
  }

  if (wokcurrentImage === 1) {
    wokimgBgElList[4 + wokimagesLength].classList.add('visually-hidden');

    setTimeout(() => {
      wokimgBgElList[wokcurrentImage + 3].classList.add('visually-hidden');
      wokimgBgElList[4 + wokimagesLength].classList.remove('visually-hidden');
    }, 500);
  }

  wokimgBgElList[wokcurrentImage + 3].classList.add('visually-hidden');

  wokimagesBoxEl.style.transform = `translate3d(${woktranslateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    wokimagesBoxEl.style.transition = '';
    if (wokcurrentImage === wokimagesLength && prevCurrentImage === 1) {
      woktranslateXPos = wokinitTranslateXPos - woktranslateStep * (wokimagesLength - 1);
      wokimagesBoxEl.style.transform = `translate3d(${woktranslateXPos}%, 0px, 0px)`;
    }
    wokactivateBtns();
  }, 500);
});

woknextBtnEl.addEventListener('click', () => {
  wokimgBgElList[wokcurrentImage + 3].classList.remove('visually-hidden');
  wokblockBtns();
  const prevCurrentImage = wokcurrentImage;
  wokimagesBoxEl.style.transition = 'transform .5s';
  woktranslateXPos -= woktranslateStep;
  wokcurrentImage += 1;
  if (wokcurrentImage === wokimagesLength + 1) {
    wokcurrentImage = 1;
  }

  if (wokcurrentImage === wokimagesLength) {
    wokimgBgElList[3].classList.add('visually-hidden');

    setTimeout(() => {
      wokimgBgElList[wokcurrentImage + 3].classList.add('visually-hidden');
      wokimgBgElList[3].classList.remove('visually-hidden');
    }, 500);
  }

  if (wokcurrentImage === 1) {
    wokimgBgElList[4 + wokimagesLength].classList.add('visually-hidden');

    setTimeout(() => {
      wokimgBgElList[wokcurrentImage + 3].classList.add('visually-hidden');
      wokimgBgElList[4 + wokimagesLength].classList.remove('visually-hidden');
    }, 500);
  }

  wokimgBgElList[wokcurrentImage + 3].classList.add('visually-hidden');

  wokimagesBoxEl.style.transform = `translate3d(${woktranslateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    wokimagesBoxEl.style.transition = '';
    if (wokcurrentImage === 1 && prevCurrentImage === wokimagesLength) {
      woktranslateXPos = wokinitTranslateXPos;
      wokimagesBoxEl.style.transform = `translate3d(${woktranslateXPos}%, 0px, 0px)`;
    }
    wokactivateBtns();
  }, 500);
});

wokwrapperEl.addEventListener('mousedown', wokdragStart);
wokwrapperEl.addEventListener('touchstart', wokswipeStart);

wokwrapperEl.addEventListener('mouseup', wokswipeEnd);
wokwrapperEl.addEventListener('touchend', wokswipeEnd);

wokwrapperEl.addEventListener('mouseleave', wokswipeLeave);

// appet
export {};

const appetimagesLength = 8;
let appetcurrentImage = 1;
const appetmode = 1;

const appetinitTranslateXPos = translateXPosList.find(
  el => el.mode === appetmode,
)?.pos as number;
let appettranslateXPos = appetinitTranslateXPos;
const appettranslateStep = 100 / appetmode;
let appetoffset: number;
let appetposInit: number;
let appetisDragging = false;

const appetimgBgElList = document.querySelectorAll('.appet-slider__img-bg');
appetimgBgElList[appetcurrentImage + 3].classList.add('visually-hidden');

const appetimagesBoxEl = document.querySelector(
  '.appet-slider__img-box',
) as HTMLDivElement;
const appetwrapperEl = document.querySelector(
  '.appet-slider__wrapper',
) as HTMLDivElement;

let appetwrapperCoords = appetwrapperEl.getBoundingClientRect();
let appetwrapperLeftCoords = appetwrapperCoords.left;
let appetwrapperWidth = appetwrapperCoords.width;

const appetprevBtnEl = document.querySelector(
  '.appet-slider__btn-prev',
) as HTMLButtonElement;
const appetnextBtnEl = document.querySelector(
  '.appet-slider__btn-next',
) as HTMLButtonElement;

const appetblockBtns = () => {
  appetnextBtnEl.disabled = true;
  appetprevBtnEl.disabled = true;
};

const appetactivateBtns = () => {
  appetnextBtnEl.disabled = false;
  appetprevBtnEl.disabled = false;
};

window.addEventListener('resize', () => {
  appetwrapperCoords = appetwrapperEl.getBoundingClientRect();
  appetwrapperLeftCoords = appetwrapperCoords.left;
  appetwrapperWidth = appetwrapperCoords.width;
});

const appetdragAction = (e: MouseEvent) => {
  const posX = e.pageX - appetwrapperLeftCoords;
  appetoffset = ((appetposInit - posX) / appetwrapperWidth) * 100;
  const newTranslateXPos = appettranslateXPos - appetoffset;
  appetimagesBoxEl.style.transform = `translate3d(${newTranslateXPos}%, 0px, 0px)`;
};

const appetswipeAction = (e: TouchEvent) => {
  const posX = e.touches[0].clientX - appetwrapperLeftCoords;
  appetoffset = ((appetposInit - posX) / appetwrapperWidth) * 100;
  const newTranslateXPos = appettranslateXPos - appetoffset;
  appetimagesBoxEl.style.transform = `translate3d(${newTranslateXPos}%, 0px, 0px)`;
};

const appetdragStart = (e: MouseEvent) => {
  appetimgBgElList[appetcurrentImage + 3].classList.remove('visually-hidden');
  appetisDragging = true;
  appetposInit = e.pageX - appetwrapperLeftCoords;
  appetwrapperEl.addEventListener('mousemove', appetdragAction);
  appetwrapperEl.addEventListener('touchmove', appetswipeAction);
};

const appetswipeStart = (e: TouchEvent) => {
  appetimgBgElList[appetcurrentImage + 3].classList.remove('visually-hidden');
  appetisDragging = true;
  appetposInit = e.touches[0].clientX - appetwrapperLeftCoords;
  appetwrapperEl.addEventListener('mousemove', appetdragAction);
  appetwrapperEl.addEventListener('touchmove', appetswipeAction);
};

const appetswipeEnd = () => {
  appetblockBtns();
  const prevCurrentImage = appetcurrentImage;
  appetisDragging = false;
  appetimagesBoxEl.style.transition = 'transform .5s';
  appetwrapperEl.removeEventListener('mousemove', appetdragAction);
  appetwrapperEl.removeEventListener('touchmove', appetswipeAction);

  if (appetoffset < -appettranslateStep / 8) {
    appettranslateXPos += appettranslateStep;
    appetcurrentImage -= 1;
    if (appetcurrentImage === 0) {
      appetcurrentImage = appetimagesLength;
    }
  }

  if (appetoffset > appettranslateStep / 8) {
    appettranslateXPos -= appettranslateStep;
    appetcurrentImage += 1;
    if (appetcurrentImage === appetimagesLength + 1) {
      appetcurrentImage = 1;
    }
  }

  if (appetcurrentImage === appetimagesLength) {
    appetimgBgElList[3].classList.add('visually-hidden');

    setTimeout(() => {
      appetimgBgElList[appetcurrentImage + 3].classList.add('visually-hidden');
      appetimgBgElList[3].classList.remove('visually-hidden');
    }, 500);
  }

  if (appetcurrentImage === 1) {
    appetimgBgElList[4 + appetimagesLength].classList.add('visually-hidden');

    setTimeout(() => {
      appetimgBgElList[appetcurrentImage + 3].classList.add('visually-hidden');
      appetimgBgElList[4 + appetimagesLength].classList.remove(
        'visually-hidden',
      );
    }, 500);
  }

  appetimgBgElList[appetcurrentImage + 3].classList.add('visually-hidden');

  appetoffset = 0;

  appetimagesBoxEl.style.transform = `translate3d(${appettranslateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    appetimagesBoxEl.style.transition = '';
    if (appetcurrentImage === appetimagesLength && prevCurrentImage === 1) {
      appettranslateXPos = appetinitTranslateXPos - appettranslateStep * (appetimagesLength - 1);
      appetimagesBoxEl.style.transform = `translate3d(${appettranslateXPos}%, 0px, 0px)`;
    }

    if (appetcurrentImage === 1 && prevCurrentImage === appetimagesLength) {
      appettranslateXPos = appetinitTranslateXPos;
      appetimagesBoxEl.style.transform = `translate3d(${appettranslateXPos}%, 0px, 0px)`;
    }
    appetactivateBtns();
  }, 500);
};

const appetswipeLeave = () => {
  if (appetisDragging) {
    appetswipeEnd();
  }
};

appetprevBtnEl.addEventListener('click', () => {
  appetimgBgElList[appetcurrentImage + 3].classList.remove('visually-hidden');
  appetblockBtns();
  const prevCurrentImage = appetcurrentImage;
  appetimagesBoxEl.style.transition = 'transform .5s';
  appettranslateXPos += appettranslateStep;
  appetcurrentImage -= 1;
  if (appetcurrentImage === 0) {
    appetcurrentImage = appetimagesLength;
  }

  if (appetcurrentImage === appetimagesLength) {
    appetimgBgElList[3].classList.add('visually-hidden');

    setTimeout(() => {
      appetimgBgElList[appetcurrentImage + 3].classList.add('visually-hidden');
      appetimgBgElList[3].classList.remove('visually-hidden');
    }, 500);
  }

  if (appetcurrentImage === 1) {
    appetimgBgElList[4 + appetimagesLength].classList.add('visually-hidden');

    setTimeout(() => {
      appetimgBgElList[appetcurrentImage + 3].classList.add('visually-hidden');
      appetimgBgElList[4 + appetimagesLength].classList.remove(
        'visually-hidden',
      );
    }, 500);
  }

  appetimgBgElList[appetcurrentImage + 3].classList.add('visually-hidden');

  appetimagesBoxEl.style.transform = `translate3d(${appettranslateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    appetimagesBoxEl.style.transition = '';
    if (appetcurrentImage === appetimagesLength && prevCurrentImage === 1) {
      appettranslateXPos = appetinitTranslateXPos - appettranslateStep * (appetimagesLength - 1);
      appetimagesBoxEl.style.transform = `translate3d(${appettranslateXPos}%, 0px, 0px)`;
    }
    appetactivateBtns();
  }, 500);
});

appetnextBtnEl.addEventListener('click', () => {
  appetimgBgElList[appetcurrentImage + 3].classList.remove('visually-hidden');
  appetblockBtns();
  const prevCurrentImage = appetcurrentImage;
  appetimagesBoxEl.style.transition = 'transform .5s';
  appettranslateXPos -= appettranslateStep;
  appetcurrentImage += 1;
  if (appetcurrentImage === appetimagesLength + 1) {
    appetcurrentImage = 1;
  }

  if (appetcurrentImage === appetimagesLength) {
    appetimgBgElList[3].classList.add('visually-hidden');

    setTimeout(() => {
      appetimgBgElList[appetcurrentImage + 3].classList.add('visually-hidden');
      appetimgBgElList[3].classList.remove('visually-hidden');
    }, 500);
  }

  if (appetcurrentImage === 1) {
    appetimgBgElList[4 + appetimagesLength].classList.add('visually-hidden');

    setTimeout(() => {
      appetimgBgElList[appetcurrentImage + 3].classList.add('visually-hidden');
      appetimgBgElList[4 + appetimagesLength].classList.remove(
        'visually-hidden',
      );
    }, 500);
  }

  appetimgBgElList[appetcurrentImage + 3].classList.add('visually-hidden');

  appetimagesBoxEl.style.transform = `translate3d(${appettranslateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    appetimagesBoxEl.style.transition = '';
    if (appetcurrentImage === 1 && prevCurrentImage === appetimagesLength) {
      appettranslateXPos = appetinitTranslateXPos;
      appetimagesBoxEl.style.transform = `translate3d(${appettranslateXPos}%, 0px, 0px)`;
    }
    appetactivateBtns();
  }, 500);
});

appetwrapperEl.addEventListener('mousedown', appetdragStart);
appetwrapperEl.addEventListener('touchstart', appetswipeStart);

appetwrapperEl.addEventListener('mouseup', appetswipeEnd);
appetwrapperEl.addEventListener('touchend', appetswipeEnd);

appetwrapperEl.addEventListener('mouseleave', appetswipeLeave);

// deserts
export {};

const desertimagesLength = 4;
let desertcurrentImage = 1;
const desertmode = 1;

const desertinitTranslateXPos = translateXPosList.find(
  el => el.mode === desertmode,
)?.pos as number;
let deserttranslateXPos = desertinitTranslateXPos;
const deserttranslateStep = 100 / desertmode;
let desertoffset: number;
let desertposInit: number;
let desertisDragging = false;

const desertimgBgElList = document.querySelectorAll('.deserts-slider__img-bg');
desertimgBgElList[desertcurrentImage + 3].classList.add('visually-hidden');

const desertimagesBoxEl = document.querySelector(
  '.deserts-slider__img-box',
) as HTMLDivElement;
const desertwrapperEl = document.querySelector(
  '.deserts-slider__wrapper',
) as HTMLDivElement;

let desertwrapperCoords = desertwrapperEl.getBoundingClientRect();
let desertwrapperLeftCoords = desertwrapperCoords.left;
let desertwrapperWidth = desertwrapperCoords.width;

const desertprevBtnEl = document.querySelector(
  '.deserts-slider__btn-prev',
) as HTMLButtonElement;
const desertnextBtnEl = document.querySelector(
  '.deserts-slider__btn-next',
) as HTMLButtonElement;

const desertblockBtns = () => {
  desertnextBtnEl.disabled = true;
  desertprevBtnEl.disabled = true;
};

const desertactivateBtns = () => {
  desertnextBtnEl.disabled = false;
  desertprevBtnEl.disabled = false;
};

window.addEventListener('resize', () => {
  desertwrapperCoords = desertwrapperEl.getBoundingClientRect();
  desertwrapperLeftCoords = desertwrapperCoords.left;
  desertwrapperWidth = desertwrapperCoords.width;
});

const desertdragAction = (e: MouseEvent) => {
  const posX = e.pageX - desertwrapperLeftCoords;
  desertoffset = ((desertposInit - posX) / desertwrapperWidth) * 100;
  const newTranslateXPos = deserttranslateXPos - desertoffset;
  desertimagesBoxEl.style.transform = `translate3d(${newTranslateXPos}%, 0px, 0px)`;
};

const desertswipeAction = (e: TouchEvent) => {
  const posX = e.touches[0].clientX - desertwrapperLeftCoords;
  desertoffset = ((desertposInit - posX) / desertwrapperWidth) * 100;
  const newTranslateXPos = deserttranslateXPos - desertoffset;
  desertimagesBoxEl.style.transform = `translate3d(${newTranslateXPos}%, 0px, 0px)`;
};

const desertdragStart = (e: MouseEvent) => {
  desertimgBgElList[desertcurrentImage + 3].classList.remove('visually-hidden');
  desertisDragging = true;
  desertposInit = e.pageX - desertwrapperLeftCoords;
  desertwrapperEl.addEventListener('mousemove', desertdragAction);
  desertwrapperEl.addEventListener('touchmove', desertswipeAction);
};

const desertswipeStart = (e: TouchEvent) => {
  desertimgBgElList[desertcurrentImage + 3].classList.remove('visually-hidden');
  desertisDragging = true;
  desertposInit = e.touches[0].clientX - desertwrapperLeftCoords;
  desertwrapperEl.addEventListener('mousemove', desertdragAction);
  desertwrapperEl.addEventListener('touchmove', desertswipeAction);
};

const desertswipeEnd = () => {
  desertblockBtns();
  const prevCurrentImage = desertcurrentImage;
  desertisDragging = false;
  desertimagesBoxEl.style.transition = 'transform .5s';
  desertwrapperEl.removeEventListener('mousemove', desertdragAction);
  desertwrapperEl.removeEventListener('touchmove', desertswipeAction);

  if (desertoffset < -deserttranslateStep / 8) {
    deserttranslateXPos += deserttranslateStep;
    desertcurrentImage -= 1;
    if (desertcurrentImage === 0) {
      desertcurrentImage = desertimagesLength;
    }
  }

  if (desertoffset > deserttranslateStep / 8) {
    deserttranslateXPos -= deserttranslateStep;
    desertcurrentImage += 1;
    if (desertcurrentImage === desertimagesLength + 1) {
      desertcurrentImage = 1;
    }
  }

  if (desertcurrentImage === desertimagesLength) {
    desertimgBgElList[3].classList.add('visually-hidden');

    setTimeout(() => {
      desertimgBgElList[desertcurrentImage + 3].classList.add(
        'visually-hidden',
      );
      desertimgBgElList[3].classList.remove('visually-hidden');
    }, 500);
  }

  if (desertcurrentImage === 1) {
    desertimgBgElList[4 + desertimagesLength].classList.add('visually-hidden');

    setTimeout(() => {
      desertimgBgElList[desertcurrentImage + 3].classList.add(
        'visually-hidden',
      );
      desertimgBgElList[4 + desertimagesLength].classList.remove(
        'visually-hidden',
      );
    }, 500);
  }

  desertimgBgElList[desertcurrentImage + 3].classList.add('visually-hidden');

  desertoffset = 0;

  desertimagesBoxEl.style.transform = `translate3d(${deserttranslateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    desertimagesBoxEl.style.transition = '';
    if (desertcurrentImage === desertimagesLength && prevCurrentImage === 1) {
      deserttranslateXPos = desertinitTranslateXPos
        - deserttranslateStep * (desertimagesLength - 1);
      desertimagesBoxEl.style.transform = `translate3d(${deserttranslateXPos}%, 0px, 0px)`;
    }

    if (desertcurrentImage === 1 && prevCurrentImage === desertimagesLength) {
      deserttranslateXPos = desertinitTranslateXPos;
      desertimagesBoxEl.style.transform = `translate3d(${deserttranslateXPos}%, 0px, 0px)`;
    }
    desertactivateBtns();
  }, 500);
};

const desertswipeLeave = () => {
  if (desertisDragging) {
    desertswipeEnd();
  }
};

desertprevBtnEl.addEventListener('click', () => {
  desertimgBgElList[desertcurrentImage + 3].classList.remove('visually-hidden');
  desertblockBtns();
  const prevCurrentImage = desertcurrentImage;
  desertimagesBoxEl.style.transition = 'transform .5s';
  deserttranslateXPos += deserttranslateStep;
  desertcurrentImage -= 1;
  if (desertcurrentImage === 0) {
    desertcurrentImage = desertimagesLength;
  }

  if (desertcurrentImage === desertimagesLength) {
    desertimgBgElList[3].classList.add('visually-hidden');

    setTimeout(() => {
      desertimgBgElList[desertcurrentImage + 3].classList.add(
        'visually-hidden',
      );
      desertimgBgElList[3].classList.remove('visually-hidden');
    }, 500);
  }

  if (desertcurrentImage === 1) {
    desertimgBgElList[4 + desertimagesLength].classList.add('visually-hidden');

    setTimeout(() => {
      desertimgBgElList[desertcurrentImage + 3].classList.add(
        'visually-hidden',
      );
      desertimgBgElList[4 + desertimagesLength].classList.remove(
        'visually-hidden',
      );
    }, 500);
  }

  desertimgBgElList[desertcurrentImage + 3].classList.add('visually-hidden');

  desertimagesBoxEl.style.transform = `translate3d(${deserttranslateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    desertimagesBoxEl.style.transition = '';
    if (desertcurrentImage === desertimagesLength && prevCurrentImage === 1) {
      deserttranslateXPos = desertinitTranslateXPos
        - deserttranslateStep * (desertimagesLength - 1);
      desertimagesBoxEl.style.transform = `translate3d(${deserttranslateXPos}%, 0px, 0px)`;
    }
    desertactivateBtns();
  }, 500);
});

desertnextBtnEl.addEventListener('click', () => {
  desertimgBgElList[desertcurrentImage + 3].classList.remove('visually-hidden');
  desertblockBtns();
  const prevCurrentImage = desertcurrentImage;
  desertimagesBoxEl.style.transition = 'transform .5s';
  deserttranslateXPos -= deserttranslateStep;
  desertcurrentImage += 1;
  if (desertcurrentImage === desertimagesLength + 1) {
    desertcurrentImage = 1;
  }

  if (desertcurrentImage === desertimagesLength) {
    desertimgBgElList[3].classList.add('visually-hidden');

    setTimeout(() => {
      desertimgBgElList[desertcurrentImage + 3].classList.add(
        'visually-hidden',
      );
      desertimgBgElList[3].classList.remove('visually-hidden');
    }, 500);
  }

  if (desertcurrentImage === 1) {
    desertimgBgElList[4 + desertimagesLength].classList.add('visually-hidden');

    setTimeout(() => {
      desertimgBgElList[desertcurrentImage + 3].classList.add(
        'visually-hidden',
      );
      desertimgBgElList[4 + desertimagesLength].classList.remove(
        'visually-hidden',
      );
    }, 500);
  }

  desertimgBgElList[desertcurrentImage + 3].classList.add('visually-hidden');

  desertimagesBoxEl.style.transform = `translate3d(${deserttranslateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    desertimagesBoxEl.style.transition = '';
    if (desertcurrentImage === 1 && prevCurrentImage === desertimagesLength) {
      deserttranslateXPos = desertinitTranslateXPos;
      desertimagesBoxEl.style.transform = `translate3d(${deserttranslateXPos}%, 0px, 0px)`;
    }
    desertactivateBtns();
  }, 500);
});

desertwrapperEl.addEventListener('mousedown', desertdragStart);
desertwrapperEl.addEventListener('touchstart', desertswipeStart);

desertwrapperEl.addEventListener('mouseup', desertswipeEnd);
desertwrapperEl.addEventListener('touchend', desertswipeEnd);

desertwrapperEl.addEventListener('mouseleave', desertswipeLeave);

// drinks
export {};

const drinksimagesLength = 5;
let drinkscurrentImage = 1;
const drinksmode = 1;

const drinksinitTranslateXPos = translateXPosList.find(
  el => el.mode === drinksmode,
)?.pos as number;
let drinkstranslateXPos = drinksinitTranslateXPos;
const drinkstranslateStep = 100 / drinksmode;
let drinksoffset: number;
let drinksposInit: number;
let drinksisDragging = false;

const drinksimgBgElList = document.querySelectorAll('.drinks-slider__img-bg');
drinksimgBgElList[drinkscurrentImage + 3].classList.add('visually-hidden');

const drinksimagesBoxEl = document.querySelector(
  '.drinks-slider__img-box',
) as HTMLDivElement;
const drinkswrapperEl = document.querySelector(
  '.drinks-slider__wrapper',
) as HTMLDivElement;

let drinkswrapperCoords = drinkswrapperEl.getBoundingClientRect();
let drinkswrapperLeftCoords = drinkswrapperCoords.left;
let drinkswrapperWidth = drinkswrapperCoords.width;

const drinksprevBtnEl = document.querySelector(
  '.drinks-slider__btn-prev',
) as HTMLButtonElement;
const drinksnextBtnEl = document.querySelector(
  '.drinks-slider__btn-next',
) as HTMLButtonElement;

const drinksblockBtns = () => {
  drinksnextBtnEl.disabled = true;
  drinksprevBtnEl.disabled = true;
};

const drinksactivateBtns = () => {
  drinksnextBtnEl.disabled = false;
  drinksprevBtnEl.disabled = false;
};

window.addEventListener('resize', () => {
  drinkswrapperCoords = drinkswrapperEl.getBoundingClientRect();
  drinkswrapperLeftCoords = drinkswrapperCoords.left;
  drinkswrapperWidth = drinkswrapperCoords.width;
});

const drinksdragAction = (e: MouseEvent) => {
  const posX = e.pageX - drinkswrapperLeftCoords;
  drinksoffset = ((drinksposInit - posX) / drinkswrapperWidth) * 100;
  const newTranslateXPos = drinkstranslateXPos - drinksoffset;
  drinksimagesBoxEl.style.transform = `translate3d(${newTranslateXPos}%, 0px, 0px)`;
};

const drinksswipeAction = (e: TouchEvent) => {
  const posX = e.touches[0].clientX - drinkswrapperLeftCoords;
  drinksoffset = ((drinksposInit - posX) / drinkswrapperWidth) * 100;
  const newTranslateXPos = drinkstranslateXPos - drinksoffset;
  drinksimagesBoxEl.style.transform = `translate3d(${newTranslateXPos}%, 0px, 0px)`;
};

const drinksdragStart = (e: MouseEvent) => {
  drinksimgBgElList[drinkscurrentImage + 3].classList.remove('visually-hidden');
  drinksisDragging = true;
  drinksposInit = e.pageX - drinkswrapperLeftCoords;
  drinkswrapperEl.addEventListener('mousemove', drinksdragAction);
  drinkswrapperEl.addEventListener('touchmove', drinksswipeAction);
};

const drinksswipeStart = (e: TouchEvent) => {
  drinksimgBgElList[drinkscurrentImage + 3].classList.remove('visually-hidden');
  drinksisDragging = true;
  drinksposInit = e.touches[0].clientX - drinkswrapperLeftCoords;
  drinkswrapperEl.addEventListener('mousemove', drinksdragAction);
  drinkswrapperEl.addEventListener('touchmove', drinksswipeAction);
};

const drinksswipeEnd = () => {
  drinksblockBtns();
  const prevCurrentImage = drinkscurrentImage;
  drinksisDragging = false;
  drinksimagesBoxEl.style.transition = 'transform .5s';
  drinkswrapperEl.removeEventListener('mousemove', drinksdragAction);
  drinkswrapperEl.removeEventListener('touchmove', drinksswipeAction);

  if (drinksoffset < -drinkstranslateStep / 8) {
    drinkstranslateXPos += drinkstranslateStep;
    drinkscurrentImage -= 1;
    if (drinkscurrentImage === 0) {
      drinkscurrentImage = drinksimagesLength;
    }
  }

  if (drinksoffset > drinkstranslateStep / 8) {
    drinkstranslateXPos -= drinkstranslateStep;
    drinkscurrentImage += 1;
    if (drinkscurrentImage === drinksimagesLength + 1) {
      drinkscurrentImage = 1;
    }
  }

  if (drinkscurrentImage === drinksimagesLength) {
    drinksimgBgElList[3].classList.add('visually-hidden');

    setTimeout(() => {
      drinksimgBgElList[drinkscurrentImage + 3].classList.add(
        'visually-hidden',
      );
      drinksimgBgElList[3].classList.remove('visually-hidden');
    }, 500);
  }

  if (drinkscurrentImage === 1) {
    drinksimgBgElList[4 + drinksimagesLength].classList.add('visually-hidden');

    setTimeout(() => {
      drinksimgBgElList[drinkscurrentImage + 3].classList.add(
        'visually-hidden',
      );
      drinksimgBgElList[4 + drinksimagesLength].classList.remove(
        'visually-hidden',
      );
    }, 500);
  }

  drinksimgBgElList[drinkscurrentImage + 3].classList.add('visually-hidden');

  drinksoffset = 0;

  drinksimagesBoxEl.style.transform = `translate3d(${drinkstranslateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    drinksimagesBoxEl.style.transition = '';
    if (drinkscurrentImage === drinksimagesLength && prevCurrentImage === 1) {
      drinkstranslateXPos = drinksinitTranslateXPos
        - drinkstranslateStep * (drinksimagesLength - 1);
      drinksimagesBoxEl.style.transform = `translate3d(${drinkstranslateXPos}%, 0px, 0px)`;
    }

    if (drinkscurrentImage === 1 && prevCurrentImage === drinksimagesLength) {
      drinkstranslateXPos = drinksinitTranslateXPos;
      drinksimagesBoxEl.style.transform = `translate3d(${drinkstranslateXPos}%, 0px, 0px)`;
    }
    drinksactivateBtns();
  }, 500);
};

const drinksswipeLeave = () => {
  if (drinksisDragging) {
    drinksswipeEnd();
  }
};

drinksprevBtnEl.addEventListener('click', () => {
  drinksimgBgElList[drinkscurrentImage + 3].classList.remove('visually-hidden');
  drinksblockBtns();
  const prevCurrentImage = drinkscurrentImage;
  drinksimagesBoxEl.style.transition = 'transform .5s';
  drinkstranslateXPos += drinkstranslateStep;
  drinkscurrentImage -= 1;
  if (drinkscurrentImage === 0) {
    drinkscurrentImage = drinksimagesLength;
  }

  if (drinkscurrentImage === drinksimagesLength) {
    drinksimgBgElList[3].classList.add('visually-hidden');

    setTimeout(() => {
      drinksimgBgElList[drinkscurrentImage + 3].classList.add(
        'visually-hidden',
      );
      drinksimgBgElList[3].classList.remove('visually-hidden');
    }, 500);
  }

  if (drinkscurrentImage === 1) {
    drinksimgBgElList[4 + drinksimagesLength].classList.add('visually-hidden');

    setTimeout(() => {
      drinksimgBgElList[drinkscurrentImage + 3].classList.add(
        'visually-hidden',
      );
      drinksimgBgElList[4 + drinksimagesLength].classList.remove(
        'visually-hidden',
      );
    }, 500);
  }

  drinksimgBgElList[drinkscurrentImage + 3].classList.add('visually-hidden');

  drinksimagesBoxEl.style.transform = `translate3d(${drinkstranslateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    drinksimagesBoxEl.style.transition = '';
    if (drinkscurrentImage === drinksimagesLength && prevCurrentImage === 1) {
      drinkstranslateXPos = drinksinitTranslateXPos
        - drinkstranslateStep * (drinksimagesLength - 1);
      drinksimagesBoxEl.style.transform = `translate3d(${drinkstranslateXPos}%, 0px, 0px)`;
    }
    drinksactivateBtns();
  }, 500);
});

drinksnextBtnEl.addEventListener('click', () => {
  drinksimgBgElList[drinkscurrentImage + 3].classList.remove('visually-hidden');
  drinksblockBtns();
  const prevCurrentImage = drinkscurrentImage;
  drinksimagesBoxEl.style.transition = 'transform .5s';
  drinkstranslateXPos -= drinkstranslateStep;
  drinkscurrentImage += 1;
  if (drinkscurrentImage === drinksimagesLength + 1) {
    drinkscurrentImage = 1;
  }

  if (drinkscurrentImage === drinksimagesLength) {
    drinksimgBgElList[3].classList.add('visually-hidden');

    setTimeout(() => {
      drinksimgBgElList[drinkscurrentImage + 3].classList.add(
        'visually-hidden',
      );
      drinksimgBgElList[3].classList.remove('visually-hidden');
    }, 500);
  }

  if (drinkscurrentImage === 1) {
    drinksimgBgElList[4 + drinksimagesLength].classList.add('visually-hidden');

    setTimeout(() => {
      drinksimgBgElList[drinkscurrentImage + 3].classList.add(
        'visually-hidden',
      );
      drinksimgBgElList[4 + drinksimagesLength].classList.remove(
        'visually-hidden',
      );
    }, 500);
  }

  drinksimgBgElList[drinkscurrentImage + 3].classList.add('visually-hidden');

  drinksimagesBoxEl.style.transform = `translate3d(${drinkstranslateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    drinksimagesBoxEl.style.transition = '';
    if (drinkscurrentImage === 1 && prevCurrentImage === drinksimagesLength) {
      drinkstranslateXPos = drinksinitTranslateXPos;
      drinksimagesBoxEl.style.transform = `translate3d(${drinkstranslateXPos}%, 0px, 0px)`;
    }
    drinksactivateBtns();
  }, 500);
});

drinkswrapperEl.addEventListener('mousedown', drinksdragStart);
drinkswrapperEl.addEventListener('touchstart', drinksswipeStart);

drinkswrapperEl.addEventListener('mouseup', drinksswipeEnd);
drinkswrapperEl.addEventListener('touchend', drinksswipeEnd);

drinkswrapperEl.addEventListener('mouseleave', drinksswipeLeave);

// tabs
const tabListEl = document.querySelector('.slider__tab-list');
const sliderElList = document.querySelectorAll('.js-slider');
let currentTab = 1;

tabListEl?.addEventListener('click', (e: Event) => {
  const clickedTab = e.target as HTMLLIElement;

  if (clickedTab.classList.contains('slider__tab_active')) {
    return;
  }

  clickedTab.classList.add('slider__tab_active');
  sliderElList[currentTab - 1].classList.add('visually-hidden');
  tabListEl.children[currentTab - 1].classList.remove('slider__tab_active');
  currentTab = Number(clickedTab.dataset.tabNumber);
  sliderElList[currentTab - 1].classList.remove('visually-hidden');

  wrapperCoords = wrapperEl.getBoundingClientRect();
  wrapperLeftCoords = wrapperCoords.left;
  wrapperWidth = wrapperCoords.width;

  wokwrapperCoords = wokwrapperEl.getBoundingClientRect();
  wokwrapperLeftCoords = wokwrapperCoords.left;
  wokwrapperWidth = wokwrapperCoords.width;

  desertwrapperCoords = desertwrapperEl.getBoundingClientRect();
  desertwrapperLeftCoords = desertwrapperCoords.left;
  desertwrapperWidth = desertwrapperCoords.width;

  drinkswrapperCoords = drinkswrapperEl.getBoundingClientRect();
  drinkswrapperLeftCoords = drinkswrapperCoords.left;
  drinkswrapperWidth = drinkswrapperCoords.width;

  appetwrapperCoords = appetwrapperEl.getBoundingClientRect();
  appetwrapperLeftCoords = appetwrapperCoords.left;
  appetwrapperWidth = appetwrapperCoords.width;
});
