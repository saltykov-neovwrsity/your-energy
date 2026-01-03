const BASE_URL = 'https://your-energy.b.goit.study/api';

export async function getExercises(params) {
  const res = await fetch(`${BASE_URL}/exercises?${params}`);
  if (!res.ok) throw new Error('Exercises fetch error');
  return res.json();
}


