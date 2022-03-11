import React from "react";
import styled from "styled-components";
import { Reset } from "styled-reset";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  return (
    <>
      <Reset />
      <Container>
        <H1>Protected</H1>
      </Container>
    </>
  );
}

export default App;
