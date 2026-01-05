import { state } from '../ui/state';
import { PAGINATION_VISIBLE_PAGES } from '../ui/state';

export function renderPagination() {
  const list = document.querySelector('.pagination-list');
  if (!list) return;

  const { totalPages, currentPage } = state;

  if (totalPages <= 1) {
    list.innerHTML = '';
    return;
  }

  const half = Math.floor(PAGINATION_VISIBLE_PAGES / 2);

  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + PAGINATION_VISIBLE_PAGES - 1);

  if (end - start + 1 < PAGINATION_VISIBLE_PAGES) {
    start = Math.max(1, end - PAGINATION_VISIBLE_PAGES + 1);
  }

  let html = '';

  if (start > 1) {
    html += pageButton(1);
    if (start > 2) html += dots();
  }

  for (let page = start; page <= end; page++) {
    html += pageButton(page, page === currentPage);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) html += dots();
    html += pageButton(totalPages);
  }

  list.innerHTML = html;
}

function pageButton(page, isActive = false) {
  return `
    <li>
      <button
        class="pagination-btn ${isActive ? 'is-active' : ''}"
        data-page="${page}"
        ${isActive ? 'disabled' : ''}
      >
        ${page}
      </button>
    </li>
  `;
}

function dots() {
  return `<li class="pagination-dots">…</li>`;
}
