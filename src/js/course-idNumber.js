document.addEventListener('DOMContentLoaded', () => {
  const divCourseInfoEl = document.getElementById('course');
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('id');

  fetch('/courses/data-courses.json')
    .then(response => response.json())
    .then(data => {
      const course = data.find(c => c.id == courseId);
      if (course) {
        const divCourseEl = createCourseBlock(course);
        divCourseInfoEl.appendChild(divCourseEl);

        difficultyCourse(course.difficulty);
      } else {
        console.error('The course with this ID was not found.');
      }
    })
    .catch(error => console.error('Помилка Error loading data:', error));
});

function createCourseBlock(course) {
  const divCourseEl = document.createElement('div');
  divCourseEl.classList.add('course-container');

  divCourseEl.innerHTML = `
        <h1 class="main-title-course">Course on the topic: "${course.name}"</h1>
        <section class="course-block">
            <img src=${course.img} alt="${course.name}" class="course-img"/>
            <div class="course-info">
                <p class="course-info-description">${course.description}</p>
                <ul class="course-info-topics">
                    <p>Topics you will cove:</p>
                    ${course.topics.map(topic => `<li>${topic}</li>`).join('')}
                </ul>
                <p class="course-info-difficulty"><strong>Course Difficulty:</strong> <span id="difficulty"> </span>    (${course.difficulty}/10)</p>
                <p><strong>Course Duration:</strong> ${course.duration}.</p>
                <p class="course-info-instructor"><strong>Your instructor for the course on <em>"${course.name}"</em> will be:</strong> <u> ${course.instructor} </u></p>
            </div>
        </section>
        <a href="/html/contact.html"><button class="course-info-advice-button" name="advice">Consultation</button></a>
    `;
  return divCourseEl;
}

function difficultyCourse(difficulty) {
  const difficultyContainer = document.getElementById('difficulty');

  if (!difficultyContainer || difficulty === undefined) return;

  const maxLevel = 10;

  for (let i = 1; i <= maxLevel; i++) {
    const star = document.createElement('span');
    star.textContent = i <= difficulty ? '✔️' : '❌';
    difficultyContainer.appendChild(star);
  }
}
