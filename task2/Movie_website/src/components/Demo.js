const url = 
'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';


// ?include_adult=false
// &include_video=false
// &language=en-US
// &page=1
// &sort_by=popularity.desc';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWQ0ODdiNzljMmE5YjBlNjcwZTUzOGViNzI5YWJkNCIsIm5iZiI6MTc1MjY4ODA2My45NDgsInN1YiI6IjY4NzdlNWJmMDIzM2MzNTIzZmJhMWM1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I0SNmJ_D6n6Ef3XPeVcXkJVuy5QsH9IUBp8-zUxHxtc'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
