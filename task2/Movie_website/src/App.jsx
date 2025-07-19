
import { useState, useEffect } from 'react'
import Header from './components/Header'
import './App.css'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS ={
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage(''); // Clear any previous error messages
    try{
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      //  alert(response)
      //throw new Error(`HTTP error! status: ${response.status}`);
      
      
      const data = await response.json();
      console.log(data);
      if(data.Response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      // Process the data as needed, e.g., set it to state or display it
      setErrorMessage(''); // Clear any previous error messages
      setMovieList(data.results || []);
    }
    catch(error){
      console.error('Error fetching movies:', error);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    }
    finally{
      // Any cleanup or final actions can be performed here
      setIsLoading(false);
    }
  }
  
  
  useEffect(() => {
    fetchMovies()
  }, []);


  return (
    
      <>
      <Header />
       
      <section className="text-white">
       {/* <h2 className='m-3 text-xl'>All Movies</h2> */}
       <h3 className=' m-4 text-xl text-center'>
          Find <span className='text-gradient'> Your Movies </span> Without any Hassel <span className='text-gradient text-3xl'>....</span>
        </h3>
       
        {/* {errorMessage &&  <p className="text-red-500">{errorMessage}</p> } */}
      
    
      
      { isloading ? (
        <Spinner />
      ) : errorMessage ? (
        <p> {errorMessage}  </p>
      ) : (
        <ul className="all-movies">
          {movieList.map((movie) => (
             <MovieCard key={movie.id} movie = {movie} />
          ))}
        </ul>
      )

      }
            
    
  </section>
          

</>
     
  )
}

export default App;
