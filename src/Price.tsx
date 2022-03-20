import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory } from "./api";

const Container = styled.div`
  max-width: 440px;
  height: 200px;
  overflow: scroll;
`;

const Table = styled.table`
  padding: 20px 0px;
  width: 440px;
  border-collapse: collapse;
  border: 2px solid rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;

  thead {
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    font-weight: 400;
  }

  tbody {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }

  caption {
    padding: 10px;
    caption-side: bottom;
  }

  td,
  th {
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 5px;
    text-align: center;
    font-size: 13px;
  }
`;

interface PriceProps {
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

function Price({ coinId }: PriceProps) {
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
        <Container>
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((price) => (
                <tr key={price.time_open.toString()}>
                  <td>{price.time_close.toString().slice(0, 10)}</td>
                  <td>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 1,
                    }).format(price.open)}
                  </td>
                  <td>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 1,
                    }).format(price.high)}
                  </td>
                  <td>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 1,
                    }).format(price.low)}
                  </td>
                  <td>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 1,
                    }).format(price.close)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
}

export default Price;
