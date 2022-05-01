import { FC, useState } from "react";
import { getAddTodo } from "../../ApiTodo/ApiTodo";
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

interface AddTodoProps {
  userId?: number;
  addTodo?: any;
  setAddTodo?: any;
  setIsLoading?: any;
};

export const AddTodo: FC<AddTodoProps> = ({ userId, setAddTodo, addTodo, setIsLoading}) => {
  // const [addTodo, setAddTodo] = useState<any[]>([]);
  const [valuesInput, setValuesInput] = useState({
    title: '',
    completed: false
  });

  async function createTodo() {
    return await fetch(getAddTodo, {
      method: 'POST',
      body: JSON.stringify({
        "userId": userId,
        "title": valuesInput.title,
        "completed": valuesInput.completed
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => setAddTodo([...addTodo, data]));
  };

  const handleAddTodo = () => {
    createTodo();
    setValuesInput({
      title: '',
      completed: false
    });
    setIsLoading(false)
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
          <div className="flex sm:ml-3 ml-0 sm:flex-col flex-row justify-around sm:mt-0 my-3">
            <div className="flex items-center">
              <span className={valuesInput.completed ? 'text-green-700' : 'text-gray-300'}
                onClick={(e) => setValuesInput(values => ({ ...valuesInput, completed: true }))}
              >
                <FaCheckCircle />
              </span>
              <span className="ml-1">Completed</span>
            </div>
            <div className="flex items-center">
              <span className={!valuesInput.completed ? 'text-orange-500' : 'text-gray-300'}
                onClick={(e) => setValuesInput(values => ({ ...valuesInput, completed: false }))}
              >
                <FaExclamationCircle />
              </span>
              <span className="ml-1">Incompleted</span>
            </div>
          </div>
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
