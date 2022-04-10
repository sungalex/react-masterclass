const BASE_URL = "https://api.coinpaprika.com/v1";

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

export function fetchCoinHistory(coinId: string, interval: number) {
  const end = Math.floor(Date.now() / 1000);
  const start = end - 60 * 60 * 24 * 7 * interval;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${start}&end=${end}`
  ).then((response) => response.json());
}