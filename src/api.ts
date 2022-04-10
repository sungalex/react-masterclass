const BASE_URL = "https://api.coinpaprika.com/v1";
const ICON_URL = `https://cryptoicons.org/api/icon`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string, term: number) {
  const end = Math.floor(Date.now() / 1000);
  const start = end - 60 * 60 * 24 * 7 * term;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${start}&end=${end}`
  ).then((response) => response.json());
}

export async function fetchIcon(coinId: string) {
  const response = await fetch(`${ICON_URL}/${coinId.toLowerCase()}/200`);
  const blob = await response.blob();
  return blob;
}
