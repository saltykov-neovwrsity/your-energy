import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

export function renderFilters(items) {
  const container = document.querySelector('.filters-content');
  if (!container) return;

  container.innerHTML = items
    .map(
      item => `
        <button
          class="filter-item"
          data-filter="${item.filter}"
          data-value="${item.name}"
          style="background-image: url('${item.imgURL}')"
        >
          <span class="filter-item__overlay"></span>
          <div class="filter-item__text">
            <span class="filter-item__title">
              ${capitalizeFirstLetter(item.name)}
            </span>
            <span class="filter-item__subtitle">
              ${capitalizeFirstLetter(item.filter)}
            </span>
          </div>
        </button>
      `
    )
    .join('');
}
