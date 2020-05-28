import React from 'react';

class TypeBar extends React.Component {
  state = { titleValue: '', descValue: '' };

  onFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.titleValue && this.state.descValue) {
      this.props.onTypeSubmit(this.state.titleValue, this.state.descValue);
      this.setState({ titleValue: '', descValue: '' });
    }
  };

  render() {
    return (
      <form
        onSubmit={this.onFormSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') this.onFormSubmit(e);
        }}
        className="ui fluid action input"
      >
        <input
          placeholder="Tytuł..."
          type="text"
          value={this.state.titleValue}
          onChange={(e) => this.setState({ titleValue: e.target.value })}
        />
        <input
          placeholder="Opis..."
          type="text"
          value={this.state.descValue}
          onChange={(e) => this.setState({ descValue: e.target.value })}
        />
        <div className="ui button" onClick={this.onFormSubmit}>
          Enter
        </div>
      </form>
    );
  }
}

export default TypeBar;
