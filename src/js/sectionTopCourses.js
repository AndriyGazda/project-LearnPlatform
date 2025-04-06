import { createCardCourse } from '/src/js/createCard.js';

let courselItemsPerView = 3;
let courselItemWidthPx = 300;
let courselItemGapPx = 24;
let currendSlide = 0;
let amountOfSlides = 0;
let coursesData;

document.addEventListener('DOMContentLoaded', () => {
  const mediaQuery768 = window.matchMedia('(max-width: 768px)');
  const mediaQuery480 = window.matchMedia('(max-width: 480px)');
  function handleMediaChange(e) {
    if (mediaQuery480.matches) {
      courselItemsPerView = 1;
    } else if (mediaQuery768.matches) {
      courselItemsPerView = 2;
    } else {
      courselItemsPerView = 3; // або значення за замовчуванням для великих екранів
    }

    console.log(coursesData);
    setCoruselConfig();
    displayCarouselItems(coursesData);
  }

  mediaQuery768.addEventListener('change', handleMediaChange);
  mediaQuery480.addEventListener('change', handleMediaChange);

  const cardCourseEl = document.getElementById('card-courses');

  function setCoruselConfig() {
    cardCourseEl.style.setProperty('--card-width', `${courselItemWidthPx}px`);
    cardCourseEl.style.setProperty('--cards-gap', `${courselItemGapPx}px`);
    cardCourseEl.style.setProperty(
      '--cards-items-per-view',
      `${courselItemsPerView}`
    );
  }
  fetch('/courses/data-courses.json')
    .then(response => response.json())
    .then(data => {
      // handleMediaChange();
      setCoruselConfig();
      coursesData = data;
      handleMediaChange();
      displayCarouselItems();
      addCarouselButtons();
    })
    .catch(error => console.error(`Error loading data: ${error}`));
});

function displayCarouselItems() {
  const sortCourses = getCoursesForCarousel(coursesData);
  const chunkedCourses = chunkArray(sortCourses, courselItemsPerView);
  amountOfSlides = Math.ceil(sortCourses.length / courselItemsPerView) - 1;

  appendCardToCarousel(chunkedCourses);
}

function chunkArray(arrayKeys, size) {
  const arrayOfArray = [];
  for (let i = 0; i < arrayKeys.length; i += size) {
    arrayOfArray.push(arrayKeys.slice(i, i + size));
  }
  return arrayOfArray;
}

function getCoursesForCarousel(data) {
  return data.sort((a, b) => a.difficulty - b.difficulty).slice(0, 6);
}

function appendCardToCarousel(chunkedCourses) {
  const cardListEl = document.getElementById('card-list');
  cardListEl.innerHTML = '';
  chunkedCourses.forEach(slide => {
    const divSlideEl = document.createElement('div');
    divSlideEl.classList.add('slide');

    slide.forEach(course => {
      const divCardEl = createCardCourse(course);
      divSlideEl.appendChild(divCardEl);
    });
    cardListEl.appendChild(divSlideEl);
  });
}

function addCarouselButtons() {
  const cardListEl = document.getElementById('card-list');
  const btnBackEl = document.getElementById('back');
  const btnNextEl = document.getElementById('next');

  btnBackEl.addEventListener('click', () => {
    if (currendSlide > 0) {
      currendSlide--;
      cardListEl.style.transform = `translateX(-${currendSlide * 100}%)`;
    }
  });
  btnNextEl.addEventListener('click', () => {
    if (currendSlide < amountOfSlides) {
      currendSlide++;
      cardListEl.style.transform = `translateX(-${currendSlide * 100}%)`;
    }
  });
}
