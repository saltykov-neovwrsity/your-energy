import { isFavorite } from '../utils/favoritesStorage';

export function renderFavoriteButton(button, exerciseId) {
  if (isFavorite(exerciseId)) {
    button.textContent = 'Remove from favorites ♥';
    button.classList.add('is-active');
  } else {
    button.textContent = 'Add to favorites ♡';
    button.classList.remove('is-active');
  }
}
