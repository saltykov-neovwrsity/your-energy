const BASE_URL = 'https://your-energy.b.goit.study/api';

export async function getQuote() {
  const res = await fetch(`${BASE_URL}/quote`);
  if (!res.ok) throw new Error('Quote fetch error');
  return res.json();
}
