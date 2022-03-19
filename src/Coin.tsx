import { useEffect } from "react";
import { useState } from "react";
import { useParams, useLocation } from "react-router";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 24px;
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 5px;

  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.div`
  margin: 20px 10px;
  font-weight: 300;
`;

interface IRouteState {
  pathname: string;
  search: string;
  hash: string;
  state: { coinName: string }; // Location.state is unknown type
  key: string;
}

// JSON 데이터를 타입스크립트 타입으로 빠르게 변환시켜주는 사이트
// https://app.quicktype.io/

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  tags: Tag[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: Date;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: Date;
  last_data_at: Date;
}

interface Tag {
  id: string;
  name: string;
  coin_counter: number;
  ico_counter: number;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: Quotes;
}

interface Quotes {
  USD: {
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_15m: number;
    percent_change_30m: number;
    percent_change_1h: number;
    percent_change_6h: number;
    percent_change_12h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_1y: number;
    ath_price: number;
    ath_date: Date;
    percent_from_price_ath: number;
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const { state } = useLocation() as IRouteState;
  const [infoData, setInfo] = useState<IInfoData>();
  const [priceData, setPriceInfo] = useState<IPriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      setInfo(infoData);
      console.log(infoData);
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setPriceInfo(priceData);
      console.log(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>
          {state?.coinName || (loading ? "Loading..." : infoData?.name)}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Market Cap</span>
              <span>
                $
                {new Intl.NumberFormat().format(
                  priceData?.quotes.USD.market_cap || 0
                )}
              </span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>ATH</span>
              <span>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "USD",
                }).format(priceData?.quotes.USD.ath_price || 0)}
              </span>
            </OverviewItem>
            <OverviewItem>
              <span>24h Change</span>
              <span>
                {new Intl.NumberFormat().format(
                  priceData?.quotes.USD.percent_change_24h || 0
                )}
                %
              </span>
            </OverviewItem>
            <OverviewItem>
              <span>Price</span>
              <span>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 2,
                }).format(priceData?.quotes.USD.price || 0)}
              </span>
            </OverviewItem>
          </Overview>
          {/*
            Nested Router:
            https://reactrouter.com/docs/en/v6/getting-started/overview#nested-routes
            */}
          <Outlet />
        </>
      )}
    </Container>
  );
}

export default Coin;
