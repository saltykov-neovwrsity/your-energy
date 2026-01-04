const FAVORITES_KEY = 'favorites';

export function getFavorites() {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}

export function isFavorite(id) {
  return getFavorites().includes(id);
}

export function toggleFavorite(id) {
  const favorites = getFavorites();

  const index = favorites.indexOf(id);

  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

  return favorites;
}
