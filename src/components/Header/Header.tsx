import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <div>
      <Link to='/'>
      <h1 className="text-center font-bold">
        TodoList
      </h1>
      </Link>
    </div>
  )
}
