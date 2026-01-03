const BASE_URL = 'https://your-energy.b.goit.study/api';

export async function getFilters(filter) {
  const res = await fetch(`${BASE_URL}/filters?filter=${filter}`);
  if (!res.ok) throw new Error('Filters fetch error');
  return res.json();
}
