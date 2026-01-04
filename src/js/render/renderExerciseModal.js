import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import { renderStars } from './renderStars';
import { renderFavoriteButton } from './renderFavoriteButton';
import { state } from '../ui/state';

export function renderExerciseModal(modalEl, item) {
  const img = modalEl.querySelector('.modal-gif');
  img.src = item.gifUrl;
  img.alt = item.name;

  modalEl.querySelector('.modal-title').textContent =
    capitalizeFirstLetter(item.name);

  modalEl.querySelector('.modal-description').textContent =
    capitalizeFirstLetter(item.description);

  modalEl.querySelector('.modal-bodypart').textContent =
    capitalizeFirstLetter(item.bodyPart);

  modalEl.querySelector('.modal-equipment').textContent =
    capitalizeFirstLetter(item.equipment);

  modalEl.querySelector('.modal-target').textContent =
    capitalizeFirstLetter(item.target);

  modalEl.querySelector('.modal-popularity').textContent =
    item.popularity ?? '—';

  modalEl.querySelector('.modal-calories').textContent =
    item.burnedCalories ?? '—';

  modalEl.querySelector('.modal-time').textContent =
    item.time ? `${item.time} min` : '—';

  const rating =
    typeof item.rating === 'number' ? item.rating : 0;

  modalEl.querySelector('.modal-rating').innerHTML = `
    <span class="modal__rating-value">${rating.toFixed(1)}</span>
    <div class="modal__stars">
      ${renderStars(rating)}
    </div>
  `;
  const favoriteBtn = modalEl.querySelector('.js-favorite-btn');

  renderFavoriteButton(favoriteBtn, state.currentExerciseId);
}
