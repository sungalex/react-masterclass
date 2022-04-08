import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchCoinHistory } from "./api";
import { isDarkAtom } from "./atom";

interface ICandleChart {
  coinId: string;
}

interface IHistorical {
  time_open: Date;
  time_close: Date;
  open: number;
  high: number;
  close: number;
  low: number;
  market_cap: number;
  volume: number;
}

function CandleChart({ coinId }: ICandleChart) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    [coinId, "historical"],
    () => fetchCoinHistory(coinId, 8),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexCharts
          series={[
            {
              data: data!.map((price) => {
                return {
                  x: price.time_close,
                  y: [price.open, price.high, price.low, price.close],
                };
              }),
            },
          ]}
          type="candlestick"
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              background: "transparent",
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: false,
              },
              labels: {
                formatter: (value) => {
                  return new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(value);
                },
              },
            },
            grid: {
              borderColor: "#576574",
            },
          }}
        />
      )}
    </>
  );
}

export default CandleChart;
