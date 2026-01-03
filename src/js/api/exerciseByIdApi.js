const BASE_URL = 'https://your-energy.b.goit.study/api';

export async function getExerciseById(id) {
  const res = await fetch(`${BASE_URL}/exercises/${id}`);
  if (!res.ok) throw new Error('Exercises fetch error');
  return res.json();
}