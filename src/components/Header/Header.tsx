import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <div>
      <Link to='/'>
      <h1 className="text-center m-4 text-[#00006E]">
        TodoList
      </h1>
      </Link>
    </div>
  )
}
