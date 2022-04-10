import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams, useLocation } from "react-router";
import { Link, useMatch, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import { Helmet } from "react-helmet-async"; // using "react-helmet-async" rather than "react-helmet"
import CandleChart from "./CandleChart";
import AreaChart from "./AreaChart";
import Price from "./Price";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atom";

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
  position: relative;
`;

const HomeBtn = styled.div`
  position: absolute;
  top: suto;
  left: 0;
  padding: 3px 10px;
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Loader = styled.div`
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColor};
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
  max-height: 110px;
  overflow: scroll;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-weight: 400;
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  padding: 7px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface ILocation {
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
  const { coinId } = useParams();
  const { state } = useLocation() as ILocation;
  const chartMatch = useMatch("/react-masterclass/:coinId/chart");
  const priceMatch = useMatch("/react-masterclass/:coinId/price");
  const areaMatch = useMatch("/react-masterclass/:coinId/area-chart");
  const setIsDark = useSetRecoilState(isDarkAtom);
  const toggleDark = () => setIsDark((currentMode) => !currentMode);

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    [coinId, "info"],
    () => fetchCoinInfo(coinId!) // ! => Non-null assertion operator
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    [coinId, "tickers"],
    () => fetchCoinTickers(coinId ? coinId : ""),
    {
      refetchInterval: 5000,
    }
  );
  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      {/* changing <head> tag */}
      <Helmet>
        <title>
          {state?.coinName || (loading ? "Loading..." : infoData?.name)}
        </title>
      </Helmet>
      <Header>
        <HomeBtn>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faAngleDoubleLeft} size="lg" />
          </Link>
        </HomeBtn>
        <Title onClick={toggleDark}>
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
              <span>Price</span>
              <span>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 3,
                }).format(tickersData?.quotes?.USD.price || 0)}
              </span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Market Cap</span>
              <span>
                $
                {new Intl.NumberFormat().format(
                  tickersData?.quotes?.USD.market_cap || 0
                )}
              </span>
            </OverviewItem>
            <OverviewItem>
              <span>ATH</span>
              <span>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "USD",
                }).format(tickersData?.quotes?.USD.ath_price || 0)}
              </span>
            </OverviewItem>
            <OverviewItem>
              <span>24h Change</span>
              <span>
                {new Intl.NumberFormat().format(
                  tickersData?.quotes?.USD.percent_change_24h || 0
                )}
                %
              </span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`chart`}>Candle Chart</Link>
            </Tab>
            <Tab isActive={areaMatch !== null}>
              <Link to={`area-chart`}>Area Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`price`}>Price</Link>
            </Tab>
          </Tabs>
          {/* Nested Router:
            https://reactrouter.com/docs/en/v6/getting-started/overview#nested-routes
            */
          /* <Outlet /> */}
          <Routes>
            <Route path="chart" element={<CandleChart coinId={coinId!} />} />
            <Route path="area-chart" element={<AreaChart coinId={coinId!} />} />
            <Route path="price" element={<Price coinId={coinId!} />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
