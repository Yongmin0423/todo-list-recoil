import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector } from "./atoms";
import ToDo from "./ToDo";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface IForm {
  newCategory: string;
}

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [categories, setCategories] = useRecoilState(categoryState);
  const [selectedCategory, setSelectedCategory] = useState<Categories>(
    categories[0]
  );

  // 카테고리 변경 함수수
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.currentTarget.value as Categories);
  };

  const { register, handleSubmit } = useForm<IForm>();
  const addCategory = ({ newCategory }: IForm) => {
    if (categories.includes(newCategory as Categories)) {
      alert("This category already exists!");
      return;
    }
    setCategories((prevCategories) => [
      ...prevCategories,
      newCategory as Categories,
    ]);
  };
  return (
    <>
      <div>
        <h1>To Dos</h1>
        <hr />
        <select value={selectedCategory} onInput={onInput}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <form onSubmit={handleSubmit(addCategory)}>
          <input
            {...register("newCategory")}
            type="text"
            placeholder="New Category"
          />

          <button>Add</button>
        </form>
        <CreateToDo />

        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </div>
    </>
  );
}
export default ToDoList;
