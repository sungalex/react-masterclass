import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    border-radius: 100px;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 0px;
  }
`;
const Emoji = styled.span`
  font-size: 36px;
`;
const Box = styled.div`
  background-color: tomato;
  width: 200px;
  height: 200px;
  animation: ${rotationAnimation} 1s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  ${Emoji}:hover {
    font-size: 72px;
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji>🤩</Emoji>
      </Box>
      <Emoji>😍</Emoji>
    </Wrapper>
  );
}

export default App;
