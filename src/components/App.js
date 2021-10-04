import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TybeBar from './TypeBar';
import ToDoList from './ToDoList';
import SortList from './SortList';

// TODO: Przenieść cały state to Redux
class App extends React.Component {
  state = {
    toDoItems: [],
    sortBy: 'date',
    visibility: 'all',
    splitDesc: false,
    visibleItems: 'all',
  };

  onSortChange = (sortType) => this.setState({ sortBy: sortType });

  onVisibilityChange = (e) => this.setState({ visibility: e });

  onVisibileItemsChange = (e) => this.setState({ visibleItems: e });

  onCheckboxCheck = (e) => this.setState({ splitDesc: e });

  onItemCheckboxCheck = (e1, e2, bool) => {
    let tempArr = [...this.state.toDoItems];
    const index1 = tempArr.indexOf(e1);
    const index2 = tempArr[index1].desc.indexOf(e2);
    tempArr[index1].desc[index2].isMade = bool;

    let numOfDone = 0;
    tempArr[index1].desc.forEach((e) => {
      if (e.isMade) numOfDone += 1;
    });
    if (numOfDone === tempArr[index1].desc.length)
      this.onClickMadeItem(e1, true);
    else this.onClickMadeItem(e1, false);

    this.setState({ toDoItems: tempArr });
  };

  deleteItem = (e) => {
    this.setState({
      toDoItems: this.state.toDoItems.filter((element) => {
        return element !== e;
      }),
    });
  };

  onTypeSubmit = (title1, desc1) => {
    // Wyciągnięcie daty
    // TODO: usuwanie po 30 dniach (jak się zaznaczy)
    const date = new Date();
    let hours = date.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let seconds = date.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;
    let day = date.getUTCDate();
    day = day < 10 ? '0' + day : day;
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    const dateCompare = `${day}.${month} | ${hours}:${minutes}:${seconds}`;
    const dateString = `${hours}:${minutes} | ${day}.${month}`;

    if (!this.state.splitDesc) {
      this.setState({
        toDoItems: [
          ...this.state.toDoItems,
          {
            title: title1,
            desc: desc1,
            key: uuidv4(),
            isMade: false,
            date: dateCompare,
            dateS: dateString,
            split: false,
          },
        ],
      });
    } else {
      let tempDesc = desc1
        .replace(/\s*,\s*/g, ',')
        .split(',')
        .map((e) => {
          return { item: e, isMade: false };
        });

      this.setState({
        toDoItems: [
          ...this.state.toDoItems,
          {
            title: title1,
            desc: tempDesc,
            key: uuidv4(),
            isMade: false,
            date: dateCompare,
            dateS: dateString,
            split: true,
          },
        ],
      });
    }
  };

  onClickMadeItem = (e, bool) => {
    let tempArr = this.state.toDoItems;
    const index = tempArr.indexOf(e);
    tempArr[index].isMade = bool;

    this.setState({ toDoItems: tempArr });
  };

  componentDidUpdate() {
    // Nadpisywanie tablicy do pamięci przeglądarki
    localStorage.setItem('toDoItems', JSON.stringify(this.state.toDoItems));
    localStorage.setItem('visibility', this.state.visibility);
    localStorage.setItem('sortBy', this.state.sortBy);
    localStorage.setItem('splitDesc', this.state.splitDesc);
    localStorage.setItem('visibleItems', this.state.visibleItems);
  }

  componentDidMount() {
    // Załadowanie tablicy z pamięci przeglądarki
    const localToDoItems = JSON.parse(localStorage.getItem('toDoItems'));
    if (localToDoItems) this.setState({ toDoItems: localToDoItems });

    const localVisibility = localStorage.getItem('visibility');
    if (localVisibility) this.setState({ visibility: localVisibility });

    const localVisibileItems = localStorage.getItem('visibleItems');
    if (localVisibileItems) this.setState({ visibleItems: localVisibileItems });

    const localSortBy = localStorage.getItem('sortBy');
    if (localSortBy) this.setState({ sortBy: localSortBy });

    const localSplitDesc = JSON.parse(
      localStorage.getItem('splitDesc', this.state.splitDesc)
    );
    if (localSplitDesc) this.setState({ splitDesc: localSplitDesc });
  }

  render() {
    return (
      <div className="ui container" style={{ marginTop: 10 }}>
        <TybeBar onTypeSubmit={this.onTypeSubmit} />
        <SortList
          onSortChange={this.onSortChange}
          onVisibilityChange={this.onVisibilityChange}
          onCheckboxCheck={this.onCheckboxCheck}
          onVisibileItemsChange={this.onVisibileItemsChange}
        />
        <div className="ui divider"></div>
        <ToDoList
          visibility={this.state.visibility}
          visibleItems={this.state.visibleItems}
          sortBy={this.state.sortBy}
          toDoItems={this.state.toDoItems}
          deleteItem={this.deleteItem}
          onClickMadeItem={this.onClickMadeItem}
          onItemCheckboxCheck={this.onItemCheckboxCheck}
        />
      </div>
    );
  }
}

export default App;
