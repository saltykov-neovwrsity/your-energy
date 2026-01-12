const BASE_URL = 'https://your-energy.b.goit.study/api';

export async function getExercises(params) {
  const res = await fetch(`${BASE_URL}/exercises?${params}`);
  if (!res.ok) throw new Error('Exercises fetch error');
  return res.json();
}

export async function getExerciseById(id) {
  const res = await fetch(`${BASE_URL}/exercises/${id}`);
  if (!res.ok) throw new Error('Exercise fetch error');
  return res.json();
}


