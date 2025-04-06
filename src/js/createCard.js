// Create card course
export function createCardCourse(course) {
  const divCardEl = document.createElement('div');
  divCardEl.classList.add('card');
  divCardEl.innerHTML = `
      <h2>${course.name}</h2>
      <img  src="${course.img}" alt="${course.name}" class="slide-course-img"/>
      <a href="/html/course.html?id=${course.id}" id="more-info">More info</a>
    `;
  return divCardEl;
}
