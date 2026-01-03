const BASE_URL = 'https://your-energy.b.goit.study/api';

export async function sendExerciseRating(id, payload) {
  const res = await fetch(
    `${BASE_URL}/exercises/${id}/rating`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Rating error');
  }

  return res.json();
}
