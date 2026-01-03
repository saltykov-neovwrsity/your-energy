export function renderQuote(data) {
  const quoteElement = document.querySelector('.quote-text');
  const authorElement = document.querySelector('.quote-author');
  quoteElement.textContent = data.quote;
  authorElement.textContent = `-${data.author}`;
}