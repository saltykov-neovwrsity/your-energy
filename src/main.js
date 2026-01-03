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

  if (!Array.isArray(items)) {
    console.error('renderExercises expected array, got:', items);
    return;
  }

  list.innerHTML = items
    .map(
      item => `
        <li class="exercise-card">
          <img src="${item.gifUrl}" alt="${item.name}" width="200" />
          <h3>${item.name}</h3>
          <p>Target: ${item.target}</p>
          <p>Rating: ${item.rating}</p>
        </li>
      `
    )
    .join('');
}
