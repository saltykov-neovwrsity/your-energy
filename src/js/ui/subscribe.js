import { subscribe } from '../api/subscribeApi';

const subscriptionForm = document.querySelector('.footer__form');
const subscriptionInput = document.querySelector('.subscription__input');
subscriptionForm.addEventListener('submit', async event => {
  event.preventDefault();

  const email = subscriptionInput.value.trim();
  if (!email) return;
  try {
    const result = await subscribe(email);
  } catch (error) {
    alert(error.message);
  }
});
