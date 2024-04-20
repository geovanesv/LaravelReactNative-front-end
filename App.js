import TodoList from './components/TodoList';

import axios from 'axios';

axios.defaults.baseURL = "http://localhost";

export default function App() {
  return (
      <TodoList />
  );
}


