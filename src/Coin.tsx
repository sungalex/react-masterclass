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

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();

  const {
    state: { coinName },
  } = useLocation() as IRouteState;
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
