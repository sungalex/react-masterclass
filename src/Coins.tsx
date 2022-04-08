import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet-async"; // using "react-helmet-async" rather than "react-helmet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
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
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.coinsColor};
  border-radius: 15px;
  margin-top: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 15px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Icon = styled.span`
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleDark = () => setIsDark((currentMode) => !currentMode);
  return (
    <Container>
      {/* changing <head> tag */}
      <Helmet>
        <title>Crypto Tracker</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleDark}>
          {isDark ? "Change to White Mode" : "Change to Dark Mode"}
        </button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`${coin.id}`} state={{ coinName: coin.name }}>
                {/* <Img src={`color/${coin.symbol.toLowerCase()}.png`} /> */}
                <Img
                  src={`https://cryptoicons.org/api/icon/${coin.symbol.toLowerCase()}/200`}
                  // crossOrigin="anonymous"
                />
                {coin.symbol} - {coin.name}
                <Icon>
                  <FontAwesomeIcon icon={faAngleDoubleRight} fade size="sm" />
                </Icon>
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
