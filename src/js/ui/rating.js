import { sendExerciseRating } from '../api/ratingApi';
import { state } from './state';
import { openModal, closeModal } from './modalExercises'

const ratingModal = document.querySelector('.rating-modal');
const starsContainer = document.querySelector('.rating-modal__stars');
const form = document.querySelector('.rating-modal__form');

let selectedRate = 0;

/* open */
document.querySelector('.btn-outline').addEventListener('click', () => {
  openRatingModal();
  closeModal();
});

/* close */
ratingModal.addEventListener('click', event => {
  if (
    event.target.classList.contains('rating-modal__backdrop') ||
    event.target.classList.contains('rating-modal__close')
  ) {
    closeRatingModal();
    openModal();
  }
});

function openRatingModal() {
  ratingModal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeRatingModal() {
  ratingModal.classList.add('is-hidden');
  document.body.style.overflow = '';
}


/* stars */
starsContainer.addEventListener('click', event => {
  const star = event.target.closest('[data-star]');
  if (!star) return;

  selectedRate = Number(star.dataset.star);
  highlightStars(selectedRate);
});

function highlightStars(rate) {
  const stars = starsContainer.querySelectorAll('button');

  stars.forEach(star => {
    const starValue = Number(star.dataset.star);
    star.classList.toggle('is-active', starValue <= rate);
  });
}

/* submit */
form.addEventListener('submit', async e => {
  e.preventDefault();

  if (!selectedRate || selectedRate < 1 || selectedRate > 5) return;

  const formData = new FormData(form);

  const payload = {
    rate: selectedRate,
    email: formData.get('email'),
    review: formData.get('review')?.trim() || ' '
  };

  await sendExerciseRating(state.currentExerciseId, payload);

  closeRatingModal();
  openModal();
});

