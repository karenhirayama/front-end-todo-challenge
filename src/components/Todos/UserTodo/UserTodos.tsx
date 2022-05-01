import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getUserAllTodos, patchTodo } from "../../ApiTodo/ApiTodo";
import { AddTodo } from "./AddTodo";
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export const UserTodos = () => {
  const [userTodos, setUserTodos] = useState<any[]>([]);
  const [addTodo, setAddTodo] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [todoChanged, setTodoChanged] = useState<any[]>([]);

  const params = useParams();
  const userId: any = params?.userId;

  useEffect(() => {
    async function getUserTodos() {
      return await fetch(getUserAllTodos(userId))
        .then((response) => response.json())
        .then((data) => setUserTodos(data))
        .catch((error) => console.error(error));
    }
    getUserTodos();
    setIsLoading(false)
  }, [userId]);

  async function changeCompletedState(id: number, isCompleted: boolean) {
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
      .then((data) => setTodoChanged(data))
      .catch((error) => console.error(error));
  };

  const handleIsCompleted = (completed: boolean, id: number) => {
    setIsCompleted(completed);
    changeCompletedState(id, isCompleted);
  };

  console.log(todoChanged)

  return (
    <div className="max-w-7xl mx-auto">
      <div className='m-3'>
        <h1>
          <span className="font-bold">User:</span> {params?.userId}
        </h1>
        <div>
          <AddTodo userId={userId} setAddTodo={setAddTodo} addTodo={addTodo} setIsLoading={setIsLoading} />
        </div>
        <div>
        </div>
        {isLoading ? <h1>Loading</h1>
          : <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {addTodo.slice(0).reverse().map((todo, index) => (
              <div key={todo.id + index}
                className='box-border border-2 border-gray-400 rounded-md p-2 m-2 flex flex-col justify-between'
              >
                <div className="text-left">
                  <p>
                    <span className="font-bold">Task:</span> {todo.title}
                  </p>
                </div>
                <div>
                  <div className="flex ml-0 flex-row justify-around my-2">
                    <div className="flex items-center">
                      <span className={todo.completed ? 'text-green-700' : 'text-gray-300'}
                      >
                        <FaCheckCircle />
                      </span>
                      <span className="ml-1">Completed</span>
                    </div>
                    <div className="flex items-center">
                      <span className={!todo.completed ? 'text-orange-500' : 'text-gray-300'}
                      >
                        <FaExclamationCircle />
                      </span>
                      <span className="ml-1">Incompleted</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {userTodos.map((todo) => (
              <div key={todo.id}
                className='box-border border-2 border-gray-400 rounded-md p-2 m-2 flex flex-col justify-between'
              >
                <div className="text-left">
                  <p>
                    <span className="font-bold">Task:</span> {todo.title}
                  </p>
                </div>
                <div>
                  <div className="flex ml-0 flex-row justify-around my-2">
                    <div className="flex items-center">
                      <span className={todo.completed ? 'text-green-700' : 'text-gray-300'}
                        onClick={(e) => handleIsCompleted(!todo.completed, todo.id)}
                      >
                        <FaCheckCircle />
                      </span>
                      <span className="ml-1">Completed</span>
                    </div>
                    <div className="flex items-center">
                      <span className={!todo.completed ? 'text-orange-500' : 'text-gray-300'}
                        onClick={(e) => handleIsCompleted(!todo.completed, todo.id)}
                      >
                        <FaExclamationCircle />
                      </span>
                      <span className="ml-1">Incompleted</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>}
      </div>
    </div>
  )
};
