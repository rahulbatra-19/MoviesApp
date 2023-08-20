import React from "react";

import { data } from "../data";
import { addMovies, handleMovieSearch, addFavourite } from "../actions";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchResults: true,
      searchText: "",
    };
  }
  handleSearch = () => {
    const { searchText } = this.state;
    this.props.dispatch(handleMovieSearch(searchText));
  };
  handleChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };
  render() {
    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleChange} value={this.state.searchText} />
          <button id="search-btn" onClick={this.handleSearch}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Navbar;

// export default connect()(Navbar);
