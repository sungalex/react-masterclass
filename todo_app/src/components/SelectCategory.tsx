import { useRecoilState } from "recoil";
import { categoryState, Catetories } from "../atoms";

function SelectCategory() {
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Catetories);
  };

  return (
    <select value={category} onInput={onInput}>
      <option value={Catetories.TO_DO}>To Do</option>
      <option value={Catetories.DOING}>Doing</option>
      <option value={Catetories.DONE}>Done</option>
    </select>
  );
}

export default SelectCategory;
