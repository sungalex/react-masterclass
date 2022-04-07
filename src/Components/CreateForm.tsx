import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 200px;
  input {
    width: 100%;
  }
`;

const Input = styled.input`
  border-style: none;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 30px;
  text-align: center;
  ::placeholder {
    color: ${(props) => props.theme.boardColor};
  }
`;

interface IForm {
  boardId: string;
}

function CreateBoard() {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const addBoard = useSetRecoilState(toDoState);
  const onValid = ({ boardId }: IForm) => {
    addBoard((tasks) => {
      return { ...tasks, [boardId]: [] };
    });
    setValue("boardId", "");
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("boardId", { required: true })}
          type="text"
          placeholder="Create Board"
        />
      </Form>
    </Wrapper>
  );
}

export default CreateBoard;
