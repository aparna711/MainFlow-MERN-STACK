
import { useState, useEffect, use } from 'react'
import {useDebounce} from 'react-use';
// import Header from './components/Header'
import Search from './components/Search.jsx'
import './App.css'
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { updateSearchCount, getTrendingMovies } from './Appwrite.js';


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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [trendingMovies, setTrendingMovies] = useState([]);

  
  const fetchMovies = async (query='') => {
    setIsLoading(true);
    setErrorMessage(''); // Clear any previous error messages
    try{
      const endpoint = query? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
                            : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json();
      console.log(data);
      if(data.Response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      
      setErrorMessage(''); // Clear any previous error messages
      setMovieList(data.results || []);
      
      // If a search term is provided, update the search count in Appwrite
         if (query && data.results.length > 0) {
           await updateSearchCount(query.trim(), data.results[0]);
        }

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



  // Debounce the search term to avoid too many API calls
  // useDebounce is a custom hook that delays the execution of the function until after a specified delay
  // This helps to reduce the number of API calls made while the user is typing
  useDebounce(() => { setDebouncedSearchTerm(searchTerm) }, 900, [searchTerm]);
  
   const loadTrendingMovies = async() =>{
      try{
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
      }
      catch(error){
        console.error(`Error fetching trending movies : ${error}`)
      }
  }
  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm]);

   useEffect(() => {
    loadTrendingMovies();
  },[trendingMovies]);

  return (
    
      <>
       <main>
       <div className="wrapper">
       <header className="flex flex-col justify-center items-center">
       
        {/* <img src="https://i.ibb.co/6n1x5f3/logo.png" alt="logo" /> */}
        <img src="https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720822.jpg" alt="hero" 
        className="hero"/>
       
        <h1 className=" text-gradient m-4">
           Welcome to Movie World
        </h1>
       </header>
       <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
       </div>
      </main>
       
      <section className="text-white">
       {/* <h2 className='m-3 text-xl'>All Movies</h2> */}
       <h3 className=' m-4 text-xl text-center'>
          Find <span className='text-gradient'> Your Movies </span> Without any Hassel <span className='text-gradient text-3xl'>....</span>
        </h3>
       
        {/* {errorMessage &&  <p className="text-red-500">{errorMessage}</p> } */}
   
     {trendingMovies.length > 0 && (
      <div>
         <h2 className='text-gradient-secondary  m-4 text-2xl text-center font-bold'>. . .    Trending Movies  . . .</h2>
         <section className="trending ">
        <ul>
          {trendingMovies.map((movie, index) => (
            <li key={movie.$id}>
              <p>{index+1 }</p>
              <img src={movie.poster_url} alt={movie.title}/>
            </li>
          ))}
        </ul>
      </section>
      </div>   
     )}
   
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
      )}
  </section>
</>
  )
}

export default App;
