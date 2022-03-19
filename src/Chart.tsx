import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery([coinId, "history"], () =>
    fetchCoinHistory(coinId)
  );
  console.log(data);

  return <>{isLoading ? "Loading..." : null}</>;
}

export default Chart;
