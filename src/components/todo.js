import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import generateId from '../utils/generate-id';
import DatePicker from 'react-datepicker';
import DateButton from './date-button.js';
import TodoList from './todo-list';
import 'react-datepicker/dist/react-datepicker.css';

function Todo() {
  const initialDate = () => new Date();
  const initialTodos = () =>
    JSON.parse(window.localStorage.getItem('todos')) || [];

  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState(initialDate);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((todos) =>
      todos.concat({
        text: input,
        id: generateId(),
        date: moment(dueDate).toString(),
      }),
    );
    setInput('');
    setDueDate(() => new Date());
  };

  const removeTodo = (id) =>
    setTodos((todos) => todos.filter((todo) => todo.id !== id));

  const handleDateChange = (date) => setDueDate(date);

  const getTodoCount = (filter) => {
    if (filter === 'all') {
      return todos.length;
    } else if (filter === 'today') {
      return todos.filter((x) => moment().isSame(x.date, 'day')).length;
    } else if (filter === 'week') {
      return todos.filter((x) =>
        moment(x.date).isSameOrBefore(moment().add(6, 'd'), 'day'),
      ).length;
    }
  };

  let todosFilteredBy;
  if (filter === 'all') {
    todosFilteredBy = 'Inbox';
  } else if (filter === 'today') {
    todosFilteredBy = 'Today';
  } else if (filter === 'week') {
    todosFilteredBy = 'Next 7 Days';
  }

  return (
    <Wrapper>
      <Header>
        <h2>{todosFilteredBy}</h2>
        <span>{moment().format('dddd, MMMM D')}</span>
      </Header>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="New Todo"
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="sumbit" disabled={!input.length}>
          Add Task
        </button>
      </Form>
      <DatePicker
        customInput={<DateButton />}
        selected={dueDate}
        minDate={new Date()}
        onChange={handleDateChange}
        dateFormat="MMMM d"
      />
      <br />

      <TabNav>
        <button onClick={() => setFilter('all')}>
          Inbox <span>{getTodoCount('all')}</span>
        </button>
        <button onClick={() => setFilter('today')}>
          Today <span>{getTodoCount('today')}</span>
        </button>
        <button onClick={() => setFilter('week')}>
          Next 7 Days <span>{getTodoCount('week')}</span>
        </button>
      </TabNav>

      <TodoList todos={todos} removeTodo={removeTodo} filterBy={filter} />
    </Wrapper>
  );
}

export default Todo;

const Wrapper = styled.div`
  max-width: 100%;
  width: 500px;
  margin: 40px auto;
  border: 1px solid black;
  padding: 30px;
  min-height: 630px;

  @media (max-width: 500px) {
    margin-top: 0;
    border: none;
  }
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
    border: 1px solid rgba(0, 0, 0, 0.3);
  }

  button {
    font-size: 20px;
    background-color: #fff;
    /* border: 1px solid rgba(0, 0, 0, 0.3); */
    height: 40px;
    padding: 0 10px;
  }
`;

const TabNav = styled.div`
  display: flex;
  margin-top: 30px;
  border-bottom: 1px solid black;

  button {
    font-size: 14px;
    height: 30px;
    padding: 0 15px 0 5px;
    border: none;
    outline: none;
    background-color: #ffffff;

    span {
      font-size: 80%;
      color: rgba(0, 0, 0, 0.4);
      margin-left: 5px;
    }
  }
`;
