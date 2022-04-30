import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import AllTodos from './components/Todos/AllTodos/AllTodos';
import { UserTodos } from './components/Todos/UserTodo/UserTodos';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/:userId' element={<UserTodos />} />
        </Routes>
      </Router>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <AllTodos />
    </>
  )
}

export default App;
