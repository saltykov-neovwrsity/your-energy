import { getExerciseById } from '../api/exerciseByIdApi';
import { renderExerciseModal } from '../render/renderExerciseModal';
import { state } from './state';
import { toggleFavorite } from '../utils/favoritesStorage';
import { renderFavoriteButton } from '../render/renderFavoriteButton';

const modalEl = document.querySelector('.modal');
const exercisesListEl = document.querySelector('.exercises-list');

exercisesListEl.addEventListener('click', async event => {
  const button = event.target.closest('.start-btn');
  if (!button) return;

  try {
    state.currentExerciseId = button.dataset.id;

    const data = await getExerciseById(state.currentExerciseId);
    renderExerciseModal(modalEl, data);
    openModal();
  } catch (error) {
    console.error(error);
  }
});

export function openModal() {
  modalEl.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  modalEl.classList.add('is-hidden');
  document.body.style.overflow = '';
}

modalEl.addEventListener('click', event => {
  const favBtn = event.target.closest('.js-favorite-btn');

  if (favBtn) {
    toggleFavorite(state.currentExerciseId);
    renderFavoriteButton(favBtn, state.currentExerciseId);
    return;
  }

  if (
    event.target.classList.contains('modal__backdrop') ||
    event.target.classList.contains('modal__close')
  ) {
    closeModal();
  }
});

