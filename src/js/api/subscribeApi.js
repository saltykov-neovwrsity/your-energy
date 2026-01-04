const BASE_URL = 'https://your-energy.b.goit.study/api';

export async function subscribe(email) {
  const res = await fetch(`${BASE_URL}/subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Subscription error');
  }

  return data;
}
