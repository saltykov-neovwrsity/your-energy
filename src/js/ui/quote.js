import { getQuote } from '../api/quoteApi';

const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');

async function initQuote() {
  try {
    const data = await getQuote();
    quoteText.textContent = data.quote;
    quoteAuthor.textContent = `-${data.author}`;
  } catch (error) {
    console.error(error);
  }
}

initQuote();