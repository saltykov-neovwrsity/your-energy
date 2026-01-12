import { fetchExercisesByCategory } from './exercises';
import { state } from './state';

const searchForm = document.querySelector('.search-form');

if (searchForm) {
  searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const keyword = new FormData(searchForm)
      .get('keyword')
      .trim();

    if (!keyword || !state.selectedCategory) return;

    fetchExercisesByCategory(
      state.activeFilter,
      state.selectedCategory,
      1,
      keyword
    );
  });
}