import { getExercises } from '../api/exercisesApi';
import { renderExercises } from '../render/renderExercises';
import { renderPagination } from '../render/renderPagination';
import { state } from './state';

export async function fetchExercisesByCategory(filterType, value, page = 1, keyword = '') {
  try {
    state.currentPage = page;

    const params = new URLSearchParams({
      page: state.currentPage,
      limit: 10,
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

    if (keyword) {
      params.append('keyword', keyword);
    }

    const data = await getExercises(params.toString());

    state.totalPages = data.totalPages;

    renderExercises(data.results);
    renderPagination();
  } catch (error) {
    console.error(error);
  }
}
