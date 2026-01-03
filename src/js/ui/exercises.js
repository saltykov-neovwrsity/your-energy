import { getExercises } from '../api/exercisesApi';
import { renderExercises } from '../render/renderExercises';
import { renderPagination } from '../render/renderPagination';
import { state } from './state';

export async function fetchExercisesByCategory(filterType, value, page = 1) {
  try {
    state.currentPage = page;

    const params = new URLSearchParams({
      page: state.currentPage,
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

    const data = await getExercises(params.toString());

    state.totalPages = data.totalPages;

    renderExercises(data.results);
    renderPagination();
  } catch (error) {
    console.error(error);
  }
}
