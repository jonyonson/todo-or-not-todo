import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import generateId from '../helpers/generate-id';
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

  const getCount = (filter) => {
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

  let title;
  if (filter === 'all') title = 'Inbox';
  else if (filter === 'today') title = 'Today';
  else if (filter === 'week') title = 'Next 7 Days';

  return (
    <Wrapper>
      <Header>
        <h2>{title}</h2>
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
          Inbox <span>{getCount('all')}</span>
        </button>
        <button onClick={() => setFilter('today')}>
          Today <span>{getCount('today')}</span>
        </button>
        <button onClick={() => setFilter('week')}>
          Next 7 Days <span>{getCount('week')}</span>
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

const TabNav = styled.div`
  display: flex;
  margin-top: 30px;
  border-bottom: 1px solid black;

  button {
    font-size: 14px;
    height: 30px;
    padding: 0 15px 0 5px;
    /* border: 1px solid black; */
    /* border-bottom: none; */
    border: none;
    outline: none;

    span {
      font-size: 80%;
      color: rgba(0, 0, 0, 0.4);
      margin-left: 5px;
    }
  }
`;

// const ImageWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   img {
//     width: 60%;
//     margin-bottom: 15px;
//   }
// `;
