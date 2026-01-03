import { state } from '../ui/state';

export function renderPagination() {
  const list = document.querySelector('.pagination-list');
  if (!list || state.totalPages <= 1) {
    list.innerHTML = '';
    return;
  }

  list.innerHTML = Array.from(
    { length: state.totalPages },
    (_, i) => {
      const page = i + 1;
      return `
        <li>
          <button
            class="pagination-btn ${page === state.currentPage ? 'is-active' : ''}"
            data-page="${page}"
            ${page === state.currentPage ? 'disabled' : ''}
          >
            ${page}
          </button>
        </li>
      `;
    }
  ).join('');
}
