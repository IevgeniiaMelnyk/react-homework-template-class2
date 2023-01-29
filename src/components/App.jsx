import { Component } from 'react';
import Button from './Button/Button';
import fetchMovies from './services/moviesApi';
import MoviesGallery from './MoviesGallery/MoviesGallery';
import Modal from './Button/Modal/Modal';
export class App extends Component {
  state = {
    isMoviesShow: false,
    page: 1,
    movies: [],
    isLoading: false,
    currentImg: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { isMoviesShow, page } = this.state;
    if (
      (prevState.isMoviesShow !== isMoviesShow && isMoviesShow) ||
      (prevState.page !== page && isMoviesShow)
    ) {
      this.getMovies();
    }

    if (!isMoviesShow && isMoviesShow !== prevState.isMoviesShow) {
      this.setState({ movies: [], page: 1 });
    }
  }

  showFilmsList = () => {
    this.setState(prevState => ({
      isMoviesShow: !prevState.isMoviesShow,
    }));
  };

  getMovies = () => {
    this.setState({ isLoading: true });
    fetchMovies(this.state.page)
      .then(({ data: { results } }) => {
        this.setState(prevState => ({
          movies: [...prevState.movies, ...results],
        }));
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = data => {
    this.setState({ currentImg: data });
  };

  closeModal = () => {
    this.setState({ currentImg: null });
  };

  render() {
    const { isMoviesShow, movies, currentImg } = this.state;
    const { showFilmsList, loadMore, openModal, closeModal } = this;

    return (
      <>
        <Button
          clickHandler={showFilmsList}
          text={isMoviesShow ? 'Hide movies list' : 'Show movies list'}
        />
        {isMoviesShow && (
          <>
            <MoviesGallery movies={movies} showModal={openModal} />{' '}
            <Button clickHandler={loadMore} text="Load more" />
          </>
        )}
        {currentImg && (
          <Modal currentImg={currentImg} closeModal={closeModal} />
        )}
      </>
    );
  }
}
