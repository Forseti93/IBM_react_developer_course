import React, { useEffect } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  /*   todos = [{
        id: nanoid(),
        text: todo.trim(),
        completed: false,
      }, ...]; */
  const [todo, setTodo] = React.useState(""); // text from main input
  const [editingTodoId, setEditingTodoId] = React.useState(""); //an editing todo's id
  const [editingTodoText, setEditingTodoText] = React.useState(""); //text from edit input

  useEffect(() => {
    const todosJson = localStorage.getItem("todo-list-IBM");
    const loadedTodos = JSON.parse(todosJson);
    if (todosJson !== "[]") {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const jsonTodos = JSON.stringify(todos);
    localStorage.setItem("todo-list-IBM", jsonTodos);
  }, [todos]);

  // Add the handlesubmit code here
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: nanoid(),
      text: todo.trim(),
      completed: false,
    };

    if (newTodo.text.length > 0) {
      setTodos([...todos, newTodo]);
    } else {
      alert("Enter your task");
    }
    setTodo("");
  };

  // Add the deleteToDo code here
  const deleteToDo = (key) => {
    const newTodoList = todos.filter((todoInstance) => {
      return todoInstance.id !== key;
    });
    setTodos(newTodoList);
  };

  // Add the toggleComplete code here
  const toggleComplete = (key) => {
    if (editingTodoId) return;
    const newTodoList = todos.map((todoObject) => {
      if (todoObject.id === key) {
        todoObject.completed = !todoObject.completed;
      }
      return todoObject;
    });
    setTodos(newTodoList);
  };
  // Add the submitEdits code here
  const editToDo = (key) => {
    setEditingTodoId(key);
    setEditingTodoText(todos.find((todo) => todo.id === key).text);
  };

  const submitEditedToDo = (key) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === key) {
          todo.text = editingTodoText;
        }
        return todo;
      })
    );
    setEditingTodoId("");
    setEditingTodoText("");
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={todo}
          type="text"
          align="right"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteToDo={deleteToDo}
        editToDo={editToDo}
        editingTodoId={editingTodoId}
        setEditingTodoText={setEditingTodoText}
        editingTodoText={editingTodoText}
        submitEditedToDo={submitEditedToDo}
      />
    </div>
  );
};
export default App;
