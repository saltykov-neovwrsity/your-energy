import { getFilters } from '../api/filtersApi';
import { renderFilters } from '../render/renderFilters';
import { renderPagination } from '../render/renderPagination';
import { fetchExercisesByCategory } from './exercises';
import { state } from './state';


const filtersEl = document.querySelector('.filters');
const filtersContentEl = document.querySelector('.filters-content');

filtersEl.addEventListener('click', async event => {
  const button = event.target.closest('.filter-tab');
  if (!button) return;

  state.activeFilter = button.dataset.filter;
  state.currentPage = 1;
  updateActiveTab();
  showFilters()
  clearExercises();
  hideSearch();

  await renderFiltersPage();
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
  const el = document.querySelector('.filters-content');
  if (el) el.classList.add('is-hidden');
}

function showFilters() {
  const el = document.querySelector('.filters-content');
  if (el) el.classList.remove('is-hidden');
}

function showExercises() {
  const el = document.querySelector('.exercises-list');
  if (el) el.classList.remove('is-hidden');
}

function clearExercises() {
  const el = document.querySelector('.exercises-list');
  if (el) el.classList.add('is-hidden');
}

function showSearch() {
  const el = document.querySelector('.search-form');
  if (el) el.classList.remove('is-hidden');
}

function hideSearch() {
  const el = document.querySelector('.search-form');
  if (el) el.classList.add('is-hidden');
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
  state.currentPage = 1;
  await renderFiltersPage();
})();

export async function renderFiltersPage() {
  try {
    const data = await getFilters({
      filter: state.activeFilter,
      page: state.currentPage,
      limit: state.filtersPerPage
    });

    state.totalPages = data.totalPages;
    renderFilters(data.results);
    renderPagination();
  } catch (error) {
    console.error(error);
  }
}
