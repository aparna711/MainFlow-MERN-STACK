const MovieCard = ({movie: {id, original_language, original_title, title, overview, poster_path, release_date,vote_average, }} ) => {
    //  <li key={movie.id}>{movie.title}</li>
 return(
      
        <div className="movie-card">
                <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}`: '/post_not_found.png'} alt={title} className='card_img' />
                <div className='mt-4'>
                        <h3>{title}</h3>
                        <div className="content">
                                 <div className="rating">
                                        <img src="star.svg" />
                                        <p>{vote_average? vote_average.toFixed(1):'N/A'}</p>
                                </div>      
                        <span>•</span>
                        <p className='lang'>{original_language}</p>
                        <span>•</span>
                        <p className='year'>{release_date?release_date.split('-')[0]:'N/A'}</p>
                        </div>
                </div>
                {/* <div className="mt-4">
                        <h3 className='text-lg font-semibold'>{title}</h3>
                        <p className='text-sm text-gray-400'>Release Date: {release_date}</p>
                        <p className='text-sm text-gray-400'>Language: {original_language}</p>
                        <p className='text-sm text-gray-400'>Overview: {overview}</p>
                </div> */}
                
        </div>
    
)
}
export default MovieCard;