/* eslint-disable no-param-reassign */
export {};

const leftColor = '#debf36';
const rightColor = '#d7d6d4';

const rangeElList = document.querySelectorAll('.js-range');

const burgerRange = document.querySelector(
  '.js-burger-range',
) as HTMLInputElement;
const wokRange = document.querySelector('.js-wok-range') as HTMLInputElement;
const snackRange = document.querySelector(
  '.js-snack-range',
) as HTMLInputElement;
const drinkRange = document.querySelector(
  '.js-drink-range',
) as HTMLInputElement;
const dessertRange = document.querySelector(
  '.js-dessert-range',
) as HTMLInputElement;

const resultLabelEl = document.querySelector(
  '.js-calc-result',
) as HTMLSpanElement;

let result: number;

let burgerCurrentStep = 2;
let wokCurrentStep = 2;
let snackCurrentStep = 2;
let drinkCurrentStep = 2;
let dessertCurrentStep = 2;

const calcResult = () => {
  result = (Number(burgerRange.value) * 400
      + Number(wokRange.value) * 220
      + Number(snackRange.value) * 150
      + Number(drinkRange.value) * 130
      + Number(dessertRange.value) * 150)
    * 0.2;
  resultLabelEl.textContent = result.toLocaleString();
  return result;
};

calcResult();

rangeElList.forEach(el => {
  const rangeEl = el as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const currentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (currentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (currentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;
});

burgerRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  burgerCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (burgerCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (burgerCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});

wokRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  wokCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (wokCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (wokCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});

snackRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  snackCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (snackCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (snackCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});

dessertRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  dessertCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (dessertCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (dessertCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});

drinkRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  drinkCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (drinkCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (drinkCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});
