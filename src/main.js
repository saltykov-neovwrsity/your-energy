let currentExerciseId = null;
let selectedCategory = null;

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
          ${item.name}
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

async function fetchExercisesByCategory(filterType, value) {
  try {
    const params = new URLSearchParams();

    if (filterType === 'Muscles') {
      params.append('muscles', value);
    }

    if (filterType === 'Body parts') {
      params.append('bodypart', value);
    }

    if (filterType === 'Equipment') {
      params.append('equipment', value);
    }

    params.append('page', 1);
    params.append('limit', 6);

    const response = await fetch(`${EXERCISES_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to fetch exercises');
    }

    const data = await response.json();
    renderExercises(data.results);
  } catch (error) {
    console.error(error);
  }
}

function renderExercises(items) {
  const list = document.querySelector('.exercises-list');
  if (!list) return;

  list.innerHTML = items
    .map(
      item => `
        <li class="exercise-card">
          <img src="${item.gifUrl}" alt="${item.name}" width="200" />
          <h3>${item.name}</h3>
          <p>Target: ${item.target}</p>
          <p>Rating: ${item.rating}</p>
          <button class="start-btn" data-id="${item._id}">
            Start
          </button>
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
  modalEl.querySelector('.modal-gif').src = item.gifUrl;
  modalEl.querySelector('.modal-gif').alt = item.name;

  modalEl.querySelector('.modal-title').textContent = item.name;
  modalEl.querySelector('.modal-description').textContent = item.description;

  modalEl.querySelector('.modal-bodypart').textContent = item.bodyPart;
  modalEl.querySelector('.modal-equipment').textContent = item.equipment;
  modalEl.querySelector('.modal-target').textContent = item.target;
  modalEl.querySelector('.modal-rating').textContent = item.rating;
}

function openModal() {
  modalEl.classList.remove('is-hidden');
}

function closeModal() {
  modalEl.classList.add('is-hidden');
}

modalEl.addEventListener('click', event => {
  if (
    event.target.classList.contains('modal') ||
    event.target.classList.contains('modal-close')
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


const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const keyword = formData.get('keyword').trim();

  if (!keyword) return;

  fetchExercisesByKeyword(keyword);
});

async function fetchExercisesByKeyword(keyword) {
  if (!selectedCategory) {
    console.warn('Select a filter category before searching');
    return;
  }

  try {
    const params = new URLSearchParams({
      keyword,
      page: 1,
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
      return;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch exercises by keyword');
    }

    const data = await response.json();
    renderExercises(data.results);
  } catch (error) {
    console.error(error);
  }
}




