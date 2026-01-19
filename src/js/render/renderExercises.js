import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';



export function renderExercises(items) {
  const list = document.querySelector('.exercises-list');
  if (!list) return;

  list.innerHTML = items
    .map(
      item => `
<li class="exercise-card">
  <div class="exercise-card__header">
    <div class="exercise-card__meta">
      <span class="exercise-card__badge">WORKOUT</span>
      <span class="exercise-card__rating">
        ${item.rating.toFixed(1)}
        <span class="exercise-card__star">★</span>
      </span>
    </div>

    <button class="exercise-card__start start-btn" data-id="${item._id}">
      Start <span>→</span>
    </button>
  </div>

  <h3 class="exercise-card__title">${capitalizeFirstLetter(item.name)}</h3>

  <div class="exercise-card__info">
    <div>
      <span class="exercise-card__info-label">Burned calories:</span>
      <span class="exercise-card__info-value">${item.burnedCalories} / ${item.time} min</span>
    </div>
    <div>
      <span class="exercise-card__info-label">Body part:</span>
      <span class="exercise-card__info-value">${capitalizeFirstLetter(item.bodyPart)}</span>
    </div>
    <div>
      <span class="exercise-card__info-label">Target:</span>
      <span class="exercise-card__info-value">${capitalizeFirstLetter(item.target)}</span>
    </div>
  </div>
</li>
      `
    )
    .join('');
}
