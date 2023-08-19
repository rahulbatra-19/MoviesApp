import { data } from "../data";
import Navbar from "./Navbar";
import React from "react";
import MovieCard from "./MovieCard";
import { addMovies, addFavourite, setShowFavourites } from "../actions";

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
    const { movies } = this.props.store.getState();
    const isfavourite = movies.favourites.includes(movie);
    return isfavourite;
  };
  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  };
  render() {
    const { movies } = this.props.store.getState();
    const { list, favourites, showFavourites } = movies; // {list : [] , favourites :[]}
    console.log("Render", this.props.store.getState());
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${!showFavourites ? "" : "active-tabs"}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourites
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movies-${index}`}
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieFavorite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? (
            <div className="no-movies">No Movies to show</div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
