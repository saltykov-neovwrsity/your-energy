import { getFilters } from '../api/filtersApi';
import { renderFilters } from '../render/renderFilters';
import { fetchExercisesByCategory } from './exercises';
import { state } from './state';

const filtersEl = document.querySelector('.filters');
const filtersContentEl = document.querySelector('.filters-content');

filtersEl.addEventListener('click', async event => {
  const button = event.target.closest('.filter-tab');
  if (!button) return;

  state.activeFilter = button.dataset.filter;
  updateActiveTab();
  showFilters()
  clearExercises();
  hideSearch();

  try {
    const data = await getFilters(state.activeFilter);
    renderFilters(data.results);
  } catch (error) {
    console.error(error);
  }
});

filtersContentEl.addEventListener('click', event => {
  const button = event.target.closest('.filter-item');
  if (!button) return;

  state.selectedCategory = button.dataset.value;

  hideFilters();
  showExercises();
  showSearch();

  fetchExercisesByCategory(state.activeFilter, state.selectedCategory);
});

function hideFilters() {
  document.querySelector('.filters-content').classList.add('is-hidden');
}

function showFilters() {
  document.querySelector('.filters-content').classList.remove('is-hidden');
}

function showExercises() {
  document.querySelector('.exercises-list').classList.remove('is-hidden');
}

function clearExercises() {
  document.querySelector('.exercises-list').classList.add('is-hidden');
}

function showSearch() {
  document.querySelector('.search-form').classList.remove('is-hidden');
}

function hideSearch() {
  document.querySelector('.search-form').classList.add('is-hidden');
}

function updateActiveTab() {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.toggle(
      'is-active',
      tab.dataset.filter === state.activeFilter
    );
  });
}

(async function initFilters() {
  const data = await getFilters(state.activeFilter);
  renderFilters(data.results);
})();
