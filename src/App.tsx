import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e429cd;
  display: grid;
  grid-template-rows: 5fr 1fr;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BoxGrid = styled(motion.div)`
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 5px;
  grid-template-columns: repeat(2, 1fr);
`;

const Box = styled(motion.div)<IBox>`
  width: 300px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    width: 105%;
    height: 105%;
    justify-self: ${(props) => (props.isLeft ? "flex-end" : "flex-start")};
    align-self: ${(props) => (props.isUp ? "flex-end" : "flex-start")};
  }
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
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OverlayBox = styled(motion.div)`
  width: 400px;
  height: 300px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Button = styled.button<IButton>`
  border-style: none;
  background-color: white;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  font-weight: 600;
  :hover {
    cursor: pointer;
  }
  :active {
    font-size: 20px;
  }
  color: ${(props) => (props.isSwitch ? "#e17055" : "#6c5ce7")};
`;

// const boxVariant = {
//   initial: { opecity: 0 },
//   visable: { opecity: 1 },
//   exit: { opecity: 0 },
// };

interface IBox {
  isUp: boolean;
  isLeft: boolean;
  layoutId: string;
}

interface IButton {
  isSwitch: boolean;
}

export default function App() {
  const [isSwitch, setSwitch] = useState(false);
  const [isOverlay, setOverlay] = useState(false);
  const [boxId, setBoxId] = useState("");
  const toggleSwitch = () => {
    setSwitch((prev) => !prev);
  };
  const onOverlay = (boxId: string) => {
    setOverlay((prev) => !prev);
    setBoxId(boxId);
  };
  return (
    <Wrapper>
      <Boards>
        <AnimatePresence>
          <BoxGrid>
            <Box
              isUp={true}
              isLeft={true}
              layoutId="one"
              onClick={() => onOverlay("one")}
            />
            <Box
              isUp={true}
              isLeft={false}
              layoutId="two"
              onClick={() => onOverlay("two")}>
              {!isSwitch ? <Circle layoutId="circle" /> : null}
            </Box>
            <Box
              isUp={false}
              isLeft={true}
              layoutId="three"
              onClick={() => onOverlay("three")}>
              {isSwitch ? <Circle layoutId="circle" /> : null}
            </Box>
            <Box
              isUp={false}
              isLeft={false}
              layoutId="four"
              onClick={() => onOverlay("four")}
            />
          </BoxGrid>
          {isOverlay ? (
            <Overlay onClick={() => onOverlay("")}>
              <OverlayBox
                layoutId={boxId}
                // variants={boxVariant}
                // initial="initial"
                // animate="visable"
                // exit="exit"
              />
            </Overlay>
          ) : null}
        </AnimatePresence>
      </Boards>
      <ButtonWrapper>
        <Button isSwitch={isSwitch} onClick={toggleSwitch}>
          Switch
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
}
