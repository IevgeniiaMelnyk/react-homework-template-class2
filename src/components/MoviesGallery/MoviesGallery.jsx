const MoviesGallery = ({ movies, showModal }) => {
  const elements = movies.map(
    ({ id, title, vote_count: votes, backdrop_path: img }) => {
      return (
        <li key={id}>
          <p>{title}</p>
          <p>Votes: {votes}</p>
          <button
            type="button"
            onClick={() => {
              showModal({ src: img, alt: title });
            }}
          >
            Show poster
          </button>
        </li>
      );
    }
  );
  return <ul>{elements}</ul>;
};

export default MoviesGallery;
