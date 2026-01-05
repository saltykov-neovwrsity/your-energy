// ui/pagination.js
import { state } from './state';
import { fetchExercisesByCategory } from './exercises';
import { renderFiltersPage } from './filters';

const paginationEl = document.querySelector('.pagination-list');

paginationEl.addEventListener('click', event => {
  const btn = event.target.closest('.pagination-btn');
  if (!btn) return;

  const page = Number(btn.dataset.page);

  if (state.selectedCategory) {
    fetchExercisesByCategory(
      state.activeFilter,
      state.selectedCategory,
      page
    );
    return;
  }

  state.filtersPage = page;
  renderFiltersPage();
});
