import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTodos } from "../../ApiTodo/ApiTodo";


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
    <div>
      <div>
        <h1 className="text-center font-bold text-[#00ABFB] mt-2">
          List of Todos - all users
        </h1>
      </div>
      <div className="m-5">
        {isLoading ? <h1>Loading</h1>
          : <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {todos.map((todo) => (
              <div key={todo.id} onClick={(e) => { showUserTodos(todo.userId) }}
                className='box-border border-2 border-[#EFA0CB] cursor-pointer p-2'
              >
                <div className="text-left">
                  <div>

                    <h4>
                      User: {todo.userId}
                    </h4>
                    <p>
                      Task: {todo.title}
                    </p>
                  </div>
                  <div>
                    {/* ICON */}
                  </div>
                </div>
                <div>
                  <h5>
                    {todo.completed ?
                      <div>
                        <h1>
                          Complete
                        </h1>
                      </div>
                      :
                      <div>
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
