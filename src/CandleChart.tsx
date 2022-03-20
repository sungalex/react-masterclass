interface ICandleChart {
  coinId: string;
}

function CandleChart({ coinId }: ICandleChart) {
  return <h1>Candle Chart</h1>;
}

export default CandleChart;
