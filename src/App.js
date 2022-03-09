import styled from "styled-components";

const Father = styled.div`
  display: flex;
  flex-direction: column;
`;
const Box = styled.div`
  background-color: ${(props) => props.backgroundColor};
  width: 100px;
  height: 100px;
`;
const Circle = styled(Box)`
  border-radius: 50px;
`;
const Button = styled.button`
  background-color: tomato;
  color: white;
  border-radius: 15px;
`;
const Input = styled.input.attrs({ required: true })`
  background-color: teal;
`;

function App() {
  return (
    <Father>
      <Box backgroundColor="teal" />
      <Circle backgroundColor="tomato" />
      <Input />
      <Input />
      <Input />
      <Button>Log in</Button>
      <Button as="a" href="/">
        Link
      </Button>
    </Father>
  );
}

export default App;
