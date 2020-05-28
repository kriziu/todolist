import React from 'react';
import './ToDoItem.css';

//TODO: Dodać edycje itemu
const ToDoItem = (props) => {
  return (
    <div className="card">
      <div className="content">
        <div className={props.value.isMade ? 'item-did header' : 'item header'}>
          {props.value.title}
        </div>
        <div className={props.value.isMade ? 'item-did meta' : 'item meta'}>
          {props.value.dateS}
        </div>
        <div
          className={
            props.value.isMade ? 'item-did description' : 'item description'
          }
        >
          {props.value.desc}
        </div>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          <div
            className={
              props.value.isMade
                ? 'ui basic black button'
                : 'ui basic green button'
            }
            onClick={() => {
              props.value.isMade
                ? props.onClickMadeItem(props.value, false)
                : props.onClickMadeItem(props.value, true);
            }}
          >
            Zrobione
          </div>
          <div
            className="ui basic red button"
            onClick={() => props.deleteItem(props.value)}
          >
            Usuń
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoItem;
