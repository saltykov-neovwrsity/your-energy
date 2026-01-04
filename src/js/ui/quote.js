import { getQuote } from '../api/quoteApi';
import { getStoredQuote, saveQuote } from '../utils/quoteStorage';

const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');

function renderQuote({ quote, author }) {
  quoteText.textContent = quote;
  quoteAuthor.textContent = `— ${author}`;
}

async function initQuote() {

  const stored = getStoredQuote();
  const today = new Date().toISOString().slice(0, 10);

  if (stored && stored.date === today) {
    renderQuote(stored);
    return;
  }

  try {
    const data = await getQuote();
    quoteText.textContent = data.quote;
    quoteAuthor.textContent = `-${data.author}`;
    saveQuote(data.quote, data.author);
  } catch (error) {
    console.error(error);
  }
}

initQuote();