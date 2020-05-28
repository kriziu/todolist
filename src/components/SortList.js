import React from 'react';
import './SortList.css';

class SortList extends React.Component {
  state = {
    sortBy: 'date',
    visibility: 'all',
    splitDesc: false,
    visibleItems: 'all',
  };

  onSortChange = (e) => {
    this.setState({ sortBy: e.target.value });
    this.props.onSortChange(e.target.value);
  };

  onVisibilityChange = (e) => {
    this.setState({ visibility: e.target.value });
    this.props.onVisibilityChange(e.target.value);
  };

  onVisibileItemsChange = (e) => {
    this.setState({ visibleItems: e.target.value });
    this.props.onVisibileItemsChange(e.target.value);
  };

  componentDidMount() {
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
      <div style={{ height: '65px' }}>
        <div
          className="ui checkbox"
          style={{ margin: '5px', marginTop: '10px' }}
        >
          <input
            type="checkbox"
            id="multipleOptionsCheck"
            name="multipleOptionsCheck"
            onChange={(e) => {
              this.props.onCheckboxCheck(e.target.checked);
              this.setState({ splitDesc: e.target.checked });
            }}
            checked={this.state.splitDesc}
          />
          <label htmlFor="multipleOptionsCheck">
            Rozdziel rzeczy po przecinku
          </label>
        </div>

        <br />

        <div className="select-style" style={{ margin: '5px', float: 'left' }}>
          <select value={this.state.sortBy} onChange={this.onSortChange}>
            <option value="date">Najstarsze</option>
            <option value="nDate">Najnowsze</option>
          </select>
        </div>

        <div className="select-style" style={{ margin: '5px', float: 'left' }}>
          <select
            value={this.state.visibility}
            onChange={this.onVisibilityChange}
          >
            <option value="all">Wszystko</option>
            <option value="done">Zrobione</option>
            <option value="undone">Nie Zrobione</option>
          </select>
        </div>

        <div className="select-style" style={{ margin: '5px', float: 'left' }}>
          <select
            value={this.state.visibleItems}
            onChange={this.onVisibileItemsChange}
          >
            <option value="all">Wszystkie</option>
            <option value="normal">Normalne</option>
            <option value="split">Rozdzielone</option>
          </select>
        </div>
      </div>
    );
  }
}

export default SortList;
