const MovieCard = ({movie: {id,original_language, original_title, title, overview, poster_path, release_date}})=>{
    //  <li key={movie.id}>{movie.title}</li>
 return(
      
        <div className="movie-card">
                <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}`: '/post_not_found.png'} alt="Movie Image" className='card_img' />
                <h3>Movie title: {title}</h3>
        </div>
    
)
}
export default MovieCard;