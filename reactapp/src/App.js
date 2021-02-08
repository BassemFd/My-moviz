
import React, {useState, useEffect} from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import MovieCard from './MovieCard';
import NavPill from './NavPill';



function App() {

  


  const [moviesCount, setMoviesCount] = useState(0);
  const [movieName, setMovieName] = useState([]);
  const [movieData, setMovieData] = useState([]);
  
  useEffect( ()=>{
    async function fetchData() {
    var rawResponse = await fetch('/new-movies');
    const response = await rawResponse.json();
    
    var rawResponseDB = await fetch('/wishlist-movies');
    const responseDB = await rawResponseDB.json();
     console.log(responseDB)
    const wishListfromDB = responseDB.movieList.map((movie, i) => {
      return {name: movie.movieName, img: movie.movieImage}
      })
      console.log(wishListfromDB)
      setMovieName(wishListfromDB)
      setMoviesCount(responseDB.movieList.length)

    var filmData = await response.results.map((movie, i)=>{
            
      var foundImg = "https://ariane.lacapsule.academy/ressources/W5/generique.jpg"
      if(foundImg !== null){
        foundImg = "https://image.tmdb.org/t/p/w500/" + movie.backdrop_path;
      }
      return ({name: movie.title, desc: movie.overview, img: foundImg, note: movie.vote_average, vote: movie.vote_count})
      
    })

    setMovieData(filmData)
  } fetchData();
}, [])







  const handleClickAddMovie = async (name, img) => {
    setMoviesCount(moviesCount + 1);
    setMovieName([...movieName, {name: name, img: img}]);
   console.log(name)
   const response =   
     await fetch('/wishlist-movies', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `movieName=${name}&movieImage=${img}`
     })
    

  }

  const handleClickDeleteMovie = async (b) => {
    setMovieName(movieName.filter( (e)=> e.name !== b));
    
    setMoviesCount(moviesCount - 1);

   const response =  await fetch(`/wishlist-movies/${b}`, {
      method: 'DELETE'
     });
    } 


  var movieList = movieData.map(function(movie, i){
    var isLiked = false;
    for(let i=0; i < movieName.length; i++){ 
         if(movie.name === movieName[i].name){
      isLiked=true
    }}
    return (<Col xs="12" lg="6" xl="4"><MovieCard data={movie} isLiked={isLiked} lambda={handleClickAddMovie} deleteMovie={handleClickDeleteMovie} key={i} /></Col>)
  })



  var font = {
    backgroundColor: "Black"
  }



return (
    
    <div style={font}>
      <Container>

          <Row>
            <NavPill lambda2={moviesCount} movieName={movieName} handleDeleteParent={handleClickDeleteMovie} />
          </Row>

          <Row>
            {movieList}
          </Row>

      </Container>
    </div>
  );
}

export default App;
