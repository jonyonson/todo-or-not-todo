import React, { useState } from 'react';
import generateId from '../../helpers/generate-id';
import './todo.css';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    setTodos(todos =>
      todos.concat({
        text: input,
        id: generateId(),
      })
    );
  };

  const removeTodo = id => setTodos(todos => todos.filter(t => t.id !== id));

  return (
    <>
      <input
        type="text"
        value={input}
        placeholder="New Todo"
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      <ul>
        {todos.map(({ text, id }) => (
          <li key={id}>
            <span>{text}</span>
            <button onClick={() => removeTodo(id)}>x</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todo;
