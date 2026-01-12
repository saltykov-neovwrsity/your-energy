
import { state } from './state';
import { fetchExercisesByCategory } from './exercises';
import { renderFiltersPage } from './filters';

const paginationEl = document.querySelector('.pagination-list');

if (paginationEl) {
  paginationEl.addEventListener('click', event => {
    const btn = event.target.closest('.pagination-btn');
    if (!btn) return;

    const page = Number(btn.dataset.page);
    state.currentPage = page;

    if (state.activeFilter && state.selectedCategory) {
      fetchExercisesByCategory(
        state.activeFilter,
        state.selectedCategory,
        page
      );
    } else {
      renderFiltersPage();
    }
  });
}
