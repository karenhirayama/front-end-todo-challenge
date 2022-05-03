import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { patchTodo } from "../../ApiTodo/ApiTodo";
import { AddTodo } from "./AddTodo";
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTodos } from "../../../store/actions/Actions";

export const UserTodos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params?.userId as any;
  const userTodos = useSelector((state: any) => state?.todos);

  useEffect(() => {
    dispatch<any>(fetchUserTodos(userId));
    setIsLoading(false)
  }, [userId]);

  async function handleChangeToggleTodo(id: number, isCompleted: boolean) {
    return await fetch(patchTodo(id), {
      method: 'PATCH',
      body: JSON.stringify({
        completed: isCompleted,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => dispatch({
        type: "TOGGLE_TODO",
        payload: id
      }))
      .catch((error) => console.error(error));
  };

  const handleChangeTodo = (completed: boolean, id: number) => {
    handleChangeToggleTodo(id, completed);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className='m-3'>
        <h1>
          <span className="font-bold">User:</span> {params?.userId}
        </h1>
        <div>
          <AddTodo userId={userId} />
        </div>
        <div>
        </div>
        {isLoading ? <h1>Loading</h1>
          :
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {userTodos.map((todo: any) => (
              <div key={todo.id}
                className='box-border border-2 border-gray-400 rounded-md p-2 m-2 flex flex-col justify-between'
              >
                <div className="text-left">
                  <p>
                    <span className="font-bold">Task:</span> {todo.title}
                  </p>
                </div>
                <div>
                  <div className="flex ml-0 flex-row justify-around my-2 md:text-[15px]">
                    <div className="flex items-center">
                      <span className={todo.completed ? 'text-green-700' : 'text-gray-300'}
                        onClick={(e) => handleChangeTodo(todo.completed, todo.id)}
                      >
                        <FaCheckCircle />
                      </span>
                      <span className="ml-1">Completed</span>
                    </div>
                    <div className="flex items-center ml-2">
                      <span className={!todo.completed ? 'text-orange-500' : 'text-gray-300'}
                        onClick={(e) => handleChangeTodo(todo.completed, todo.id)}
                      >
                        <FaExclamationCircle />
                      </span>
                      <span className="ml-1">Incompleted</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
            }
          </div>}
      </div>
    </div>
  )
};
