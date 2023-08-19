import { data } from "../data";
import Navbar from "./Navbar";
import React from "react";
import MovieCard from "./MovieCard";
import { addMovies, addFavourite } from "../actions";

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    store.subscribe(() => {
      console.log("UPDATED");
      this.forceUpdate();
    });
    // make api call
    // dispatch action
    store.dispatch(addMovies(data));
    console.log("State", this.props.store.getState());
  }
  isMovieFavorite = (movie) => {
    const { favourites } = this.props.store.getState();
    const isfavourite = favourites.includes(movie);
    return isfavourite;
  };
  render() {
    const { list } = this.props.store.getState(); // {list : [] , favourites :[]}
    console.log("Render", this.props.store.getState());
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourites</div>
          </div>
          <div className="list">
            {list.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movies-${index}`}
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieFavorite(movie)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
