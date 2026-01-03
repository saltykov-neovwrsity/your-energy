import { fetchExercisesByCategory } from './exercises';
import { state } from './state';

const paginationEl = document.querySelector('.pagination-list');

paginationEl.addEventListener('click', event => {
  const button = event.target.closest('.pagination-btn');
  if (!button) return;

  const page = Number(button.dataset.page);

  fetchExercisesByCategory(
    state.activeFilter,
    state.selectedCategory,
    page
  );
});
