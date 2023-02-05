import React from "react";

const TodoList = (props) => {
  return (
    <div className="todos-list">
      {props.todos.map((todoElement) => (
        <div
          className="todos-list-todo spread-between width80 center"
          key={todoElement.id}
        >
          <div
            className={todoElement.completed ? "crossed-out" : ""}
            onClick={() => props.toggleComplete(todoElement.id)}
          >
            {todoElement.id === props.editingTodoId ? (
              <input
                type="text"
                value={props.editingTodoText}
                onChange={(e) => props.setEditingTodoText(e.target.value)}
              />
            ) : (
              todoElement.text
            )}
          </div>
          {todoElement.id === props.editingTodoId ? (
            <button onClick={() => props.submitEditedToDo(todoElement.id)}>
              Submit
            </button>
          ) : (
            <button onClick={() => props.editToDo(todoElement.id)}>Edit</button>
          )}
          <button onClick={() => props.deleteToDo(todoElement.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
