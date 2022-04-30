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
        <h1 className="text-center font-bold">
          List of Todos - all users
        </h1>
      </div>
      <div>
        {isLoading ? <h1>Loading</h1>
          : <div>
            {todos.map((todo) => (
              <div key={todo.id} onClick={(e) => { showUserTodos(todo.userId) }} >
                <div>
                  <h4>
                    User: {todo.userId}
                  </h4>
                  <p>
                    Task: {todo.title}
                  </p>
                </div>
                <div>
                  <h5>
                    {todo.completed}
                  </h5>
                </div>
              </div>
            ))}
          </div>}
      </div>
    </div>
  )
};
