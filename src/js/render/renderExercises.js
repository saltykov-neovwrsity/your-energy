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
      Start →
    </button>
  </div>

  <h3 class="exercise-card__title">${capitalizeFirstLetter(item.name)}</h3>

  <p class="exercise-card__info">
    Burned calories: ${item.burnedCalories} / ${item.time} min ·
    Body part: ${item.bodyPart} ·
    Target: ${item.target}
  </p>
</li>
      `
    )
    .join('');
}
