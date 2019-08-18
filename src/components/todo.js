import React, { useState } from 'react';
import styled from 'styled-components';
import generateId from '../helpers/generate-id';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setTodos(todos =>
      todos.concat({
        text: input,
        id: generateId(),
      }),
    );
    setInput('');
  };

  const removeTodo = id =>
    setTodos(todos => todos.filter(todo => todo.id !== id));

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="New Todo"
          onChange={e => setInput(e.target.value)}
        />
        <button type="sumbit">Submit</button>
      </Form>

      <TodosList>
        {todos.map(({ text, id }) => (
          <li key={id}>
            <span>{text}</span>
            <button onClick={() => removeTodo(id)}>REMOVE</button>
          </li>
        ))}
      </TodosList>
    </Wrapper>
  );
}

export default Todo;

const Wrapper = styled.div`
  max-width: 100%;
  width: 500px;
  margin: 0 auto;
  border: 1px solid black;
`;

const Form = styled.form`
  padding: 30px;
  display: flex;

  input {
    outline: none;
    margin-right: 10px;
    font-size: 20px;
    padding-left: 5px;
    flex: 1;
    min-width: 100px;
  }

  button {
    font-size: 20px;
    background-color: #fff;
    border: 1px solid black;
    height: 40px;
    padding: 0 10px;
  }
`;

const TodosList = styled.ul`
  list-style-type: none;
  padding: 30px;

  li {
    display: flex;
    border: 1px solid black;

    span {
      flex: 1;
    }
  }
`;
