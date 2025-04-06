import { createCardCourse } from '/src/js/createCard.js';

const itemsPerPage = 10;
let currentPage = 1;
let coursesData = [];
let filteredCourses = [];

document.addEventListener('DOMContentLoaded', () => {
  const cardCourseEl = document.getElementById('card-courses');

  cardCourseEl.style.setProperty('--cards-items-per-view', `${itemsPerPage}`);

  fetch('/courses/data-courses.json')
    .then(response => response.json())
    .then(data => {
      coursesData = data;

      filteredCourses = [...data];
      renderCourses(coursesData, currentPage);
      addPaginationControls();
      addSearchFunctionality();
      addSortingAndFiltering();
    })
    .catch(error => console.error(`Error loading data: ${error}`));
});

function renderCourses(courses, page) {
  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const coursesToDisplay = courses.slice(startIdx, endIdx);

  const cardListEl = document.getElementById('card-list');
  cardListEl.innerHTML = '';

  coursesToDisplay.forEach(course => {
    const divCardEl = createCardCourse(course);
    cardListEl.appendChild(divCardEl);
  });
}

function addPaginationControls() {
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginationEl = document.getElementById('pagination');

  paginationEl.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.classList.add('pagination-button');
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      renderCourses(filteredCourses, currentPage);
      updatePaginationControls(i, totalPages);
    });
    paginationEl.appendChild(button);
  }

  updatePaginationControls(currentPage, totalPages);
}

function updatePaginationControls(currentPage) {
  const buttons = document.querySelectorAll('.pagination-button');
  buttons.forEach(button => {
    if (parseInt(button.textContent) === currentPage) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  });
}

function addSearchFunctionality() {
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    filteredCourses = coursesData.filter(course => {
      return course.name.toLowerCase().includes(query);
    });

    currentPage = 1;
    renderCourses(filteredCourses, currentPage);
    addPaginationControls();
  });
}

function addSortingAndFiltering() {
  const sortSelect = document.getElementById('sort-select');
  const filterSelect = document.getElementById('filter-select');

  sortSelect.addEventListener('change', () => {
    const sortValue = sortSelect.value;
    if (sortValue === 'difficulty') {
      filteredCourses = [...filteredCourses].sort(
        (a, b) => a.difficulty - b.difficulty
      );
    } else if (sortValue === 'name') {
      filteredCourses = [...filteredCourses].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    renderCourses(filteredCourses, currentPage);
    addPaginationControls();
  });

  filterSelect.addEventListener('change', () => {
    const category = filterSelect.value;
    filteredCourses = [...coursesData];
    if (category === 'category1') {
      filteredCourses = filteredCourses.filter(course => {
        const duration = parseInt(course.duration);
        return duration <= 5;
      });
    } else if (category === 'category2') {
      filteredCourses = filteredCourses.filter(course => {
        const duration = parseInt(course.duration);
        return duration > 5 && duration <= 9;
      });
    }
    if (category === 'all') {
      filteredCourses = [...coursesData];
    }

    renderCourses(filteredCourses, currentPage);
    addPaginationControls();
  });
}
