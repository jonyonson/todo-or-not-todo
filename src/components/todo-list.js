import React from 'react';
import styled from 'styled-components';
import formatDate from '../helpers/format-date';
import moment from 'moment';
import { FiTrash2 as Trash } from 'react-icons/fi';
import complete from '../assets/complete.svg';

function TodoList(props) {
  let todos, message;
  if (props.filterBy === 'all') {
    todos = props.todos;
    message = 'All Clear!';
  } else if (props.filterBy === 'today') {
    todos = props.todos.filter((x) => moment().isSame(x.date, 'day'));
    message = "You're all done for the day!";
  } else if (props.filterBy === 'week') {
    todos = props.todos.filter((x) =>
      moment(x.date).isSameOrBefore(moment().add(6, 'd'), 'day'),
    );
    message = "You're all done for the week!";
  }

  return (
    <List>
      {todos.map(({ text, id, date }) => {
        return (
          <Item key={id}>
            <span>{text}</span>
            <TrashIcon onClick={() => props.removeTodo(id)} />
            <div>{formatDate(date)}</div>
          </Item>
        );
      })}

      {!todos.length && (
        <ImageWrapper>
          <img src={complete} alt="" />
          <span>{message}</span>
        </ImageWrapper>
      )}
    </List>
  );
}

export default TodoList;

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  padding-top: 30px;
`;

const Item = styled.li`
  display: flex;
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 20px;
  align-items: center;

  span {
    flex: 1;
  }

  div {
    text-align: right;
    width: 90px;
    font-size: 12px;
  }
`;

const TrashIcon = styled(Trash)`
  cursor: pointer;
  transition: all 0.2s ease;
  display: none;

  &:hover {
    transform: scale(1.1);
    transition: all 0.2s ease;
  }

  ${Item}:hover & {
    display: block;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 60%;
    margin-bottom: 15px;
  }
`;
