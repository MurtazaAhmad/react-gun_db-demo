import { useState, useEffect } from "react";
import "./App.css";
//importing Gun
import Gun from "gun";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  //creating a new gun instance
  const gun = Gun({
    peers: ["http:localhost:5000/gun"], // Put the relay node that you want here
  });

  useEffect(() => {
    gun.get("todos").on((data) => {
      console.log("Data Refetched!", data);
      const allTodos = [];
      for (let key in data) {
        if (key !== "_") {
          allTodos.push(...JSON.parse(data[key]));
        }
      }
      setTodos(allTodos);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Todo to be inserted:", todo);

    const singleTodo = gun.get("todos");
    singleTodo.put({ todos: JSON.stringify([...todos, todo]) });

    setTodos([...todos, todo]);
    setTodo("");
  };

  return (
    <>
      <div>
        <h2>Todos</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
        <br />
        <hr />
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
