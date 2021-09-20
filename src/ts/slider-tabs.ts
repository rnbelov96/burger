export {};

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
});
