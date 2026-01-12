import { getFavorites, toggleFavorite } from '../utils/favoritesStorage';
import { getExerciseById } from '../api/exercisesApi';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

const listEl = document.querySelector('.favorites-list');
const emptyMessageEl = document.querySelector('.favorites-empty-message');

export async function initFavorites() {
  if (!listEl) return;

  const favoriteIds = getFavorites();

  if (favoriteIds.length === 0) {
    showEmptyState();
    return;
  }

  try {
    const promises = favoriteIds.map(id => getExerciseById(id));
    const exercises = await Promise.all(promises);
    renderFavoritesList(exercises);
  } catch (error) {
    console.error('Error fetching favorites:', error);
  }
}

function showEmptyState() {
  if (emptyMessageEl) {
    emptyMessageEl.style.display = 'block';
  }
}

function renderFavoritesList(exercises) {
  const html = exercises.map(item => `
    <li class="exercise-card favorite-card" data-id="${item._id}">
      <div class="exercise-card__header">
        <div class="exercise-card__meta">
          <span class="exercise-card__badge">WORKOUT</span>
        </div>

        <button class="favorite-btn--trash" data-id="${item._id}" aria-label="Remove">
          <svg width="16" height="16">
            <use href="./img/icons/trash.svg#trash"></use> 
          </svg>
        </button>

        <button class="exercise-card__start start-btn" data-id="${item._id}">
            Start
            <svg width="14" height="14">
              <use href="./img/icons/icon.svg#arrow"></use>
            </svg>
        </button>
      </div>

      <div class="exercise-card__title-row">
        <div class="exercise-icon-wrapper">
             <svg width="24" height="24">
                <use href="./img/icons/human.svg#icon-human"></use>
            </svg>
        </div>
        <h3 class="exercise-card__title">${capitalizeFirstLetter(item.name)}</h3>
      </div>

      <p class="exercise-card__info">
        <span class="info-item">Burned calories: <span class="info-value">${item.burnedCalories} / ${item.time} min</span></span>
        <span class="info-item">Body part: <span class="info-value">${capitalizeFirstLetter(item.bodyPart)}</span></span>
        <span class="info-item">Target: <span class="info-value">${capitalizeFirstLetter(item.target)}</span></span>
      </p>
    </li>
  `).join('');

  listEl.innerHTML = html;

  document.querySelectorAll('.favorite-btn--trash').forEach(btn => {
    btn.addEventListener('click', handleRemoveFavorite);
  });
}

async function handleRemoveFavorite(event) {
  const btn = event.target.closest('.favorite-btn--trash');
  if (!btn) return;

  const id = btn.dataset.id;
  toggleFavorite(id);

  await initFavorites();
}

if (document.querySelector('.favorites-list')) {
  initFavorites();
}
