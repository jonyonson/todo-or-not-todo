import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import generateId from '../helpers/generate-id';

function Todo() {
  const initialTodos = () =>
    JSON.parse(window.localStorage.getItem('todos')) || [];

  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState('');

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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
      <Header>
        <h2>Today</h2>
        <span>{moment().format('dddd, MMMM D')}</span>
      </Header>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="New Todo"
          onChange={e => setInput(e.target.value)}
        />
        <button type="sumbit" disabled={!input.length}>
          Add Task
        </button>
      </Form>

      <TodoList>
        {todos.map(({ text, id }) => (
          <li key={id}>
            <span>{text}</span>
            <button onClick={() => removeTodo(id)}>REMOVE</button>
          </li>
        ))}
      </TodoList>
    </Wrapper>
  );
}

export default Todo;

const Wrapper = styled.div`
  max-width: 100%;
  width: 500px;
  margin: 0 auto;
  border: 1px solid black;
  padding: 30px;
`;

const Header = styled.div`
  margin-bottom: 30px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.6);
  padding-bottom: 5px;
`;

const Form = styled.form`
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

const TodoList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  padding-top: 30px;

  li {
    display: flex;
    border: 1px solid black;
    padding: 10px;
    margin-bottom: 20px;

    span {
      flex: 1;
    }
  }
`;
