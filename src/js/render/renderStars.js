export function renderStars(rating) {
  const rounded = Math.round(rating);

  return Array.from({ length: 5 }, (_, i) =>
    `<span class="modal__star ${i < rounded ? 'is-active' : ''}">★</span>`
  ).join('');
}
