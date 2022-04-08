import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";

interface ChartProps {
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

function AreaChart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    [coinId, "historical"],
    () => fetchCoinHistory(coinId, 4),
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
              name: "Price",
              data: data!.map((price) => price.close),
            },
          ]}
          type="area"
          options={{
            labels: data!.map((price) => {
              const tickerDate = price.time_close;
              return tickerDate.toString();
            }),
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.4,
                stops: [0, 90, 100],
              },
            },
            chart: {
              stacked: false,
              zoom: {
                type: "x",
                enabled: true,
                autoScaleYaxis: true,
              },
              toolbar: {
                autoSelected: "zoom",
              },
              foreColor: "#f5f6fa",
              background: "transparent",
            },
            markers: {
              size: 2,
            },
            dataLabels: {
              enabled: false,
            },
            title: {
              text: "Historical Tickers(Close)",
              align: "left",
            },
            xaxis: {
              type: "datetime",
              labels: {
                format: "'yy-MM-dd",
                rotate: -45,
              },
              title: { text: "Date" },
            },
            yaxis: {
              labels: {
                formatter: function (value: number) {
                  return new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(value);
                },
              },
              title: {
                text: "Price",
              },
            },
            grid: {
              borderColor: "#576574",
              row: {
                colors: ["#535c68", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
            tooltip: {
              enabled: true,
              theme: "dark",
              shared: false,
              x: { show: false, format: "yyyy-MM-dd" },
              y: {
                formatter: function (
                  value,
                  { series, seriesIndex, dataPointIndex, w }
                ) {
                  return new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 2,
                  }).format(value);
                },
              },
            },
          }}
        />
      )}
    </>
  );
}

export default AreaChart;
