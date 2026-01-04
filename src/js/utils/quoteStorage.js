const STORAGE_KEY = 'dailyQuote';

export function getStoredQuote() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

export function saveQuote(quote, author) {
  const today = new Date().toISOString().slice(0, 10);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ quote, author, date: today })
  );
}
