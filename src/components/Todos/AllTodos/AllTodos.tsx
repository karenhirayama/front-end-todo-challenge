import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTodos } from "../../ApiTodo/ApiTodo";
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function AllTodos() {
  const [todos, setTodos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function getTodos() {
      return await fetch(getAllTodos)
        .then((response) => response.json())
        .then((data) => setTodos(data))
        .catch(error => console.error(error));
    }
    getTodos();
    setIsLoading(false);
  }, []);

  const showUserTodos = (id: number) => {
    navigate(`/user/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <h1 className="text-center text-[#00ABFB] mt-2">
          List of Todos - all users
        </h1>
      </div>
      <div className="m-5">
        {isLoading ? <h1>Loading</h1>
          : <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {todos.map((todo) => (
              <div key={todo.id} onClick={(e) => { showUserTodos(todo.userId) }}
                className='box-border border-2 border-gray-400 hover:border-[#00006E] rounded-md cursor-pointer p-2 flex flex-col justify-between'
              >
                <div className="text-left">
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4>
                          <span className="font-bold">User:</span> {todo.userId}
                        </h4>
                      </div>
                      {todo.completed ?
                        <div className="text-green-700 text-lg">
                          <FaCheckCircle />
                        </div>
                        :
                        <div className="text-orange-500 text-lg">
                          <FaExclamationCircle />
                        </div>
                      }
                    </div>
                    <p>
                      <span className="font-bold">Task:</span> {todo.title}
                    </p>
                  </div>
                </div>
                <div>
                  <h5>
                    {todo.completed ?
                      <div className="text-green-700 text-lg">
                        <h1>
                          Complete
                        </h1>
                      </div>
                      :
                      <div className="text-orange-500 text-lg">
                        <h1>
                          Incomplete
                        </h1>
                      </div>
                    }
                  </h5>
                </div>
              </div>
            ))}
          </div>}
      </div>
    </div>
  )
};
