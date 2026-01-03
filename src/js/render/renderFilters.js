import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

export function renderFilters(items) {
  const container = document.querySelector('.filters-content');
  if (!container) return;

  if (!Array.isArray(items)) {
    console.error('renderFilters expected array, got:', items);
    return;
  }

  container.innerHTML = items
    .map(
      item => `
        <button 
          class="filter-item" 
          data-filter="${item.filter}"
          data-value="${item.name}"
        >
          ${capitalizeFirstLetter(item.name)}
        </button>
      `
    )
    .join('');
}