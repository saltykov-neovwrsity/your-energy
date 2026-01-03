export function capitalizeFirstLetter(value) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const keyword = formData.get('keyword').trim();

  if (!keyword) return;

  fetchExercisesByKeyword(keyword);
});