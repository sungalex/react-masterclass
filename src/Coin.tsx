import { useEffect } from "react";
import { useState } from "react";
import { useParams, useLocation } from "react-router";
import styled from "styled-components";

const Title = styled.h1`
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
  time_open: Date;
  time_close: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const {
    state: { coinName },
  } = useLocation() as IRouteState;
  const [infoData, setInfo] = useState<IInfoData>();
  const [priceData, setPriceInfo] = useState<IPriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      setInfo(infoData);
      const priceData = await (
        await fetch(
          `https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/today`
        )
      ).json();
      setPriceInfo(priceData);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title> {coinName || "Loading..."} </Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
