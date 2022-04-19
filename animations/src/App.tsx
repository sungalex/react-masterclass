import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const BoxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Box = styled(motion.div)`
  width: 300px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled(motion.button)<IButton>`
  border-style: none;
  background-color: white;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isSwitch ? "#e17055" : "#0984e3")};
  :hover {
    cursor: pointer;
  }
  :active {
    font-size: 20px;
  }
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)", marginBottom: "40px" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const overlayBox = {
  hidden: {},
  visible: {
    width: "400px",
    height: "300px",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  exit: {},
};

interface IButton {
  isSwitch: boolean;
}

export default function App() {
  const [isSwitch, setSwitch] = useState(false);
  const [boxId, setBoxId] = useState<null | string>(null);
  const toggleSwitch = () => {
    setSwitch((prev) => !prev);
  };
  return (
    <Wrapper>
      <BoxGrid>
        <Box layoutId="1" onClick={() => setBoxId("1")} />
        <Box layoutId="2" onClick={() => setBoxId("2")}>
          {!isSwitch ? <Circle layoutId="circle" /> : null}
        </Box>
        <Box layoutId="3" onClick={() => setBoxId("3")}>
          {isSwitch ? <Circle layoutId="circle" /> : null}
        </Box>
        <Box layoutId="4" onClick={() => setBoxId("4")} />
      </BoxGrid>
      <AnimatePresence>
        {boxId ? (
          <Overlay
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setBoxId(null)}>
            <Box layoutId={boxId} variants={overlayBox} />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <ButtonWrapper>
        <Button onClick={toggleSwitch} isSwitch={isSwitch}>
          Switch
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
}
