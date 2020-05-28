import React from 'react';
import ToDoItem from './ToDoItem';
import ToDoItemSplit from './ToDoItemSplit';

const ToDoList = (props) => {
  // Funkcje sortujące
  const compareDate = (a, b) => {
    const A = a.date;
    const B = b.date;

    let comparison = 0;
    if (A > B) {
      comparison = 1;
    } else if (A < B) {
      comparison = -1;
    }
    return comparison;
  };

  // Zmienianie widoczności tablicy
  let itemsToMap = [];
  if (props.visibility === 'all') itemsToMap = props.toDoItems;
  else if (props.visibility === 'done') {
    props.toDoItems.forEach((e) => {
      if (e.isMade) itemsToMap.push(e);
    });
  } else if (props.visibility === 'undone') {
    props.toDoItems.forEach((e) => {
      if (!e.isMade) itemsToMap.push(e);
    });
  }

  // Sortowanie tablicy
  itemsToMap.sort(compareDate);
  if (props.sortBy === 'nDate') itemsToMap.reverse();

  // Renderowanie itemow z zaleznosci od ich rodzaju
  const items = itemsToMap.map((e) => {
    if (props.visibleItems === 'normal') {
      if (!e.split) {
        return (
          <ToDoItem
            key={e.key}
            value={e}
            deleteItem={props.deleteItem}
            onClickMadeItem={props.onClickMadeItem}
          />
        );
      }
    } else if (props.visibleItems === 'split') {
      if (e.split) {
        return (
          <ToDoItemSplit
            key={e.key}
            value={e}
            deleteItem={props.deleteItem}
            onClickMadeItem={props.onClickMadeItem}
            onItemCheckboxCheck={props.onItemCheckboxCheck}
          />
        );
      }
    } else {
      if (e.split) {
        return (
          <ToDoItemSplit
            key={e.key}
            value={e}
            deleteItem={props.deleteItem}
            onClickMadeItem={props.onClickMadeItem}
            onItemCheckboxCheck={props.onItemCheckboxCheck}
          />
        );
      } else {
        return (
          <ToDoItem
            key={e.key}
            value={e}
            deleteItem={props.deleteItem}
            onClickMadeItem={props.onClickMadeItem}
          />
        );
      }
    }
    return null;
  });

  return (
    <div
      className="ui cards"
      style={{ width: '81%', marginLeft: 'auto', marginRight: 'auto' }}
    >
      {items}
    </div>
  );
};

export default ToDoList;
