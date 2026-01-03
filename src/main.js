let currentExerciseId = null;
let selectedCategory = null;
let currentPage = 1;
let totalPages = 1;

const QUOTE_URL = 'https://your-energy.b.goit.study/api/quote';

async function fetchQuote() {
  try {
    const response = await fetch(QUOTE_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }

    const data = await response.json();
    renderQuote(data);
  } catch (error) {
    console.error(error);
  }
}

fetchQuote();

function renderQuote(data) {
  const quoteElement = document.querySelector('.quote-text');
  const authorElement = document.querySelector('.quote-author');
  quoteElement.textContent = data.quote;
  authorElement.textContent = `-${data.author}`;
}

let activeFilter = 'Muscles';

const filtersEl = document.querySelector('.filters');

filtersEl.addEventListener('click', event => {
  const button = event.target.closest('.filter-tab');
  if (!button) return;

  activeFilter = button.dataset.filter;
  updateActiveTab();

  fetchFilters(activeFilter);
});

function updateActiveTab() {
  const tabs = document.querySelectorAll('.filter-tab');

  tabs.forEach(tab => {
    const isActive = tab.dataset.filter === activeFilter;
    tab.classList.toggle('is-active', isActive);
  });
}

const FILTERS_URL = 'https://your-energy.b.goit.study/api/filters';

async function fetchFilters(filterName) {
  try {
    const response = await fetch(`${FILTERS_URL}?filter=${filterName}`);

    if (!response.ok) {
      throw new Error('Failed to fetch filters');
    }

    const data = await response.json();

    renderFilters(data.results);
  } catch (error) {
    console.error(error);
  }
}


function renderFilters(items) {
  const container = document.querySelector('.filters-content');
  if (!container) return;

  if (!Array.isArray(items)) {
    console.error('renderFilters expected array, got:', items);
    return;
  }

  container.innerHTML = items
    .map(
      item => `
        <button 
          class="filter-item" 
          data-filter="${item.filter}"
          data-value="${item.name}"
        >
          ${capitalizeFirstLetter(item.name)}
        </button>
      `
    )
    .join('');
}



fetchFilters(activeFilter);

const filtersContentEl = document.querySelector('.filters-content');

filtersContentEl.addEventListener('click', event => {
  const button = event.target.closest('.filter-item');
  if (!button) return;

  const value = button.dataset.value;
  selectedCategory = button.dataset.value;
  fetchExercisesByCategory(activeFilter, value);
});


const EXERCISES_URL = 'https://your-energy.b.goit.study/api/exercises';

async function fetchExercisesByCategory(filterType, value, page = 1) {
  try {
    currentPage = page;

    const params = new URLSearchParams({
      page,
      limit: 6,
    });

    if (filterType === 'Muscles') {
      params.append('muscles', value);
    }

    if (filterType === 'Body parts') {
      params.append('bodypart', value);
    }

    if (filterType === 'Equipment') {
      params.append('equipment', value);
    }

    const response = await fetch(
      `${EXERCISES_URL}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch exercises');
    }

    const data = await response.json();

    totalPages = data.totalPages;

    renderExercises(data.results);
    renderPagination();
  } catch (error) {
    console.error(error);
  }
}

// function renderStars(rating) {
//   const fullStars = Math.round(rating);
//   const maxStars = 5;

//   return Array.from({ length: maxStars }, (_, index) => {
//     return `
//       <span class="star ${index < fullStars ? 'star-filled' : ''}">
//         ★
//       </span>
//     `;
//   }).join('');
// }



function renderExercises(items) {
  const list = document.querySelector('.exercises-list');
  if (!list) return;

  list.innerHTML = items
    .map(
      item => `
<li class="exercise-card">
  <div class="exercise-card__header">
    <div class="exercise-card__meta">
      <span class="exercise-card__badge">WORKOUT</span>
      <span class="exercise-card__rating">
        ${item.rating.toFixed(1)}
        <span class="exercise-card__star">★</span>
      </span>
    </div>

    <button class="exercise-card__start start-btn" data-id="${item._id}">
      Start →
    </button>
  </div>

  <h3 class="exercise-card__title">${capitalizeFirstLetter(item.name)}</h3>

  <p class="exercise-card__info">
    Burned calories: ${item.burnedCalories} / ${item.time} min ·
    Body part: ${item.bodyPart} ·
    Target: ${item.target}
  </p>
</li>
      `
    )
    .join('');
}




const exercisesListEl = document.querySelector('.exercises-list');
const modalEl = document.querySelector('.modal');

exercisesListEl.addEventListener('click', event => {
  const button = event.target.closest('.start-btn');
  if (!button) return;

  const exerciseId = button.dataset.id;
  fetchExerciseById(exerciseId);
});

async function fetchExerciseById(id) {
  try {
    currentExerciseId = id;
    const response = await fetch(
      `https://your-energy.b.goit.study/api/exercises/${id}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch exercise');
    }

    const data = await response.json();
    renderExerciseModal(data);
    openModal();
  } catch (error) {
    console.error(error);
  }
}



function renderExerciseModal(item) {
  const img = modalEl.querySelector('.modal-gif');
  img.src = item.gifUrl;
  img.alt = item.name;

  modalEl.querySelector('.modal-title').textContent = capitalizeFirstLetter(item.name) || item.name;
  modalEl.querySelector('.modal-description').textContent =
    capitalizeFirstLetter(item.description) || item.description;

  modalEl.querySelector('.modal-bodypart').textContent =
    capitalizeFirstLetter(item.bodyPart) || item.bodyPart;

  modalEl.querySelector('.modal-equipment').textContent =
    capitalizeFirstLetter(item.equipment) || item.equipment;
  modalEl.querySelector('.modal-calories').textContent =
  item.burnedCalories;

  modalEl.querySelector('.modal-target').textContent =
    capitalizeFirstLetter(item.target) || item.target;
  modalEl.querySelector('.modal-popularity').textContent =
    item.popularity;
  modalEl.querySelector('.modal-time').textContent =
  `${item.time} min`;

  modalEl.querySelector('.modal-rating').innerHTML = `
  <span class="modal__rating-value">${item.rating.toFixed(1)}</span>
  <div class="modal__stars">
    ${renderStars(item.rating)}
  </div>
`;
}

function renderStars(rating) {
  const rounded = Math.round(rating);

  return Array.from({ length: 5 }, (_, i) =>
    `<span class="modal__star ${i < rounded ? 'is-active' : ''}">★</span>`
  ).join('');
}


function openModal() {
  modalEl.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalEl.classList.add('is-hidden');
  document.body.style.overflow = '';
}


modalEl.addEventListener('click', e => {
  if (
    e.target.classList.contains('modal__backdrop') ||
    e.target.classList.contains('modal__close')
  ) {
    closeModal();
  }
});




async function sendExerciseRating(id, ratingData) {
  try {
    const response = await fetch(
      `https://your-energy.b.goit.study/api/exercises/${id}/rating`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingData),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to send rating');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const ratingForm = document.querySelector('.rating-form');

ratingForm.addEventListener('submit', async event => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const payload = {
    rate: Number(formData.get('rate')),
    email: formData.get('email'),
    review: formData.get('review') || '',
  };

  const updatedExercise = await sendExerciseRating(
    currentExerciseId,
    payload
  );

  if (updatedExercise) {
    // оновлюємо рейтинг у модалці
    modalEl.querySelector('.modal-rating').textContent =
      updatedExercise.rating;

    event.target.reset();
  }
});

function capitalizeFirstLetter(value) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const keyword = formData.get('keyword').trim();

  if (!keyword) return;

  fetchExercisesByKeyword(keyword);
});

async function fetchExercisesByKeyword(keyword, page = 1) {
  if (!selectedCategory) return;

  try {
    currentPage = page;

    const params = new URLSearchParams({
      keyword,
      page,
      limit: 6,
    });

    if (activeFilter === 'Muscles') {
      params.append('muscles', selectedCategory);
    }

    if (activeFilter === 'Body parts') {
      params.append('bodypart', selectedCategory);
    }

    if (activeFilter === 'Equipment') {
      params.append('equipment', selectedCategory);
    }

    const response = await fetch(
      `${EXERCISES_URL}?${params.toString()}`
    );

    if (response.status === 409) {
      renderExercises([]);
      renderPagination(0);
      return;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch exercises by keyword');
    }

    const data = await response.json();

    totalPages = data.totalPages;

    renderExercises(data.results);
    renderPagination(keyword);
  } catch (error) {
    console.error(error);
  }
}

function renderPagination(keyword = null) {
  const list = document.querySelector('.pagination-list');
  if (!list) return;

  if (totalPages <= 1) {
    list.innerHTML = '';
    return;
  }

  list.innerHTML = Array.from(
    { length: totalPages },
    (_, index) => {
      const page = index + 1;
      return `
        <li>
          <button 
            class="pagination-btn ${page === currentPage ? 'is-active' : ''}"
            data-page="${page}"
            ${page === currentPage ? 'disabled' : ''}
          >
            ${page}
          </button>
        </li>
      `;
    }
  ).join('');
}

const paginationEl = document.querySelector('.pagination-list');

paginationEl.addEventListener('click', event => {
  const button = event.target.closest('.pagination-btn');
  if (!button) return;

  const page = Number(button.dataset.page);

  if (searchForm.keyword?.value) {
    fetchExercisesByKeyword(searchForm.keyword.value, page);
  } else {
    fetchExercisesByCategory(activeFilter, selectedCategory, page);
  }
});




