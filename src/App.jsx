import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

uuidv4();

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showchecked, setshowchecked] = useState(true);

  useEffect(() => {
    const todostring = localStorage.getItem("todos");
    if (todostring) {
      const todos = JSON.parse(todostring);
      setTodos(todos);
    }
  }, []);

  const savels = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleEdit = (id) => {
    const t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    savels(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    savels(updatedTodos);
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;
    const newTodo = { id: uuidv4(), todo, iscompleted: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    savels(updatedTodos);
    setTodo("");
  };

  const handlechange = (e) => {
    setTodo(e.target.value);
  };

  const handlecheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const updatedTodos = [...todos];
    updatedTodos[index].iscompleted = !updatedTodos[index].iscompleted;
    setTodos(updatedTodos);
    savels(updatedTodos);
  };

  const togglefinished = () => {
    setshowchecked(!showchecked);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:mx-10 my-5 rounded-2xl p-5 bg-violet-100 min-h-[80vh] shadow-xl transition-all duration-300">
        <div className="addTodo my-5">
          <h2 className="text-lg md:text-xl font-bold mb-2 text-violet-800">Add a Todo</h2>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <input
              onChange={handlechange}
              value={todo}
              type="text"
              placeholder="Enter your task..."
              className="w-full sm:w-1/2 px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 px-4 py-2 text-sm font-bold text-white rounded-md transition duration-200"
            >
              Save
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 my-4">
          <input onChange={togglefinished} type="checkbox" checked={showchecked} />
          <label className="text-sm md:text-base text-gray-800">Show Finished</label>
        </div>

        <h2 className="text-lg md:text-xl font-bold text-violet-800 mb-4">Your Todos</h2>

        <div className="todos flex flex-col gap-3 max-w-2xl mx-auto">
          {todos
            .filter((item) => showchecked ? item.iscompleted : !item.iscompleted)
            .map((item) => (
              <div
                key={item.id}
                className="todo flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-md shadow-md"
              >
                <div className="flex items-center gap-3 w-full">
                  <input
                    name={item.id}
                    onChange={handlecheckbox}
                    type="checkbox"
                    checked={item.iscompleted}
                    className="h-4 w-4"
                  />
                  <div className={`flex-1 ${item.iscompleted ? "line-through text-gray-500" : ""}`}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md transition"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
