const BASE_URL = 'https://your-energy.b.goit.study/api';

export async function getFilters({ filter, page = 1, limit = 12 }) {
  const params = new URLSearchParams({ filter, page, limit });
  const res = await fetch(`${BASE_URL}/filters?${params}`);
  if (!res.ok) throw new Error('Filters fetch error');
  return res.json();
}
