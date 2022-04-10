import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet-async"; // using "react-helmet-async" rather than "react-helmet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
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
`;

const CoinList = styled.ul`
  font-size: 20px;
  font-weight: 400;
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 20px;
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
  font-size: 40px;
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

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-left: 20px;
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
  const setIsDark = useSetRecoilState(isDarkAtom);
  const toggleDark = () => setIsDark((currentMode) => !currentMode);
  return (
    <Container>
      {/* changing <head> tag */}
      <Helmet>
        <title>Crypto Tracker</title>
      </Helmet>
      <Header>
        <Title onClick={toggleDark}>Crypto Tracker</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`${coin.id}`} state={{ coinName: coin.name }}>
                <Img src={`/color/${coin.symbol.toLowerCase()}.png`} />
                {/* <Img
                  src={`https://cryptoicons.org/api/icon/${coin.symbol.toLowerCase()}/200`}
                  // crossOrigin="anonymous"
                /> */}
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
