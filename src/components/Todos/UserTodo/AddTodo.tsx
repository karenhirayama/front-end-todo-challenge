import { FC, useState } from "react";
import { getAddTodo } from "../../ApiTodo/ApiTodo";
import { useDispatch } from "react-redux";

interface AddTodoProps {
  userId?: number;
};

export const AddTodo: FC<AddTodoProps> = ({ userId }) => {
  const [valuesInput, setValuesInput] = useState({
    title: ''
  });

  const dispatch = useDispatch();

  async function createTodo() {
    return await fetch(getAddTodo, {
      method: 'POST',
      body: JSON.stringify({
        "userId": userId,
        "title": valuesInput.title,
        "completed": false
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => dispatch({
        type: "ADD_TODO",
        payload: data
      }));
  };

  const handleAddTodo = () => {
    createTodo();
    setValuesInput({
      title: ''
    });
  }

  return (
    <div className="m-2">
      <h1>
        Add todo to your list
      </h1>
      <div>
        <div className="flex sm:flex-row flex-col">
          <input type='text' maxLength={70} value={valuesInput.title}
            className="w-full mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
            placeholder="Add your todo" onChange={(e) => setValuesInput(values => ({ ...valuesInput, title: e.target.value }))} />
        </div>
      </div>
      <div>
        <h1
          className="w-fit box-border border-2 px-3 py-1 mt-2 cursor-pointer border-[#00ABFB] hover:border-[#00006E] rounded-md "
          onClick={(e) => { handleAddTodo() }}>
          Add todo
        </h1>
      </div>
    </div>
  )
}
