import React from 'react';
import './ToDoItem.css';

//TODO: Dodać edycje itemu
const ToDoItemSplit = (props) => {
  const descItems = props.value.desc.map((e, i) => {
    return (
      <li key={i} className={e.isMade ? 'item-did' : 'item'}>
        <input
          style={{ float: 'right' }}
          type="checkbox"
          id={`isChecked${i}`}
          name={`isChecked${i}`}
          onChange={(v) =>
            props.onItemCheckboxCheck(props.value, e, v.target.checked)
          }
          checked={e.isMade}
        />
        <label htmlFor={`isChecked${i}`}>{e.item}</label>
      </li>
    );
  });

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
          <ul style={{ paddingLeft: 14, marginLeft: '0' }}>{descItems}</ul>
        </div>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
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

export default ToDoItemSplit;
