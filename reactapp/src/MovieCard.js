import React, {useState} from 'react';
import {Badge,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, ButtonGroup 
} from 'reactstrap';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';



const MovieCard = (props) => {

const { name, desc, img, note, vote } = props.data;

// const [likeMovie, setLikeMovie] = useState(false);
const [countWatchMovie, setWatchMovie] = useState(0);
const [selected, setSelected] = useState(false);
const [myRatingMovie, setMyRatingMovie] = useState(0);
const [voteCount, setVoteCount] = useState(vote);



  var handleLikeMovie = () => {
 
   
    if(props.isLiked === false){
      props.lambda(name, img);
      
     
    } else {
    props.deleteMovie(name, img);

  }    
  }

  var handleWatchMovie = () => {
    setWatchMovie(countWatchMovie + 1);
    setSelected(true);
  }

  var color2;
  if(selected === true){
    color2 = { color: "#e74c3c" }
  };




  var color;
  if(props.isLiked === true ){
    color = { color: "#e74c3c"}
  };

    var goldColor = {
      color: "gold"
    };
      var star =[];
    for(let i = 0; i < 10; i++){
      if(i < note){
      star.push(<FontAwesomeIcon key={i} style={goldColor} icon={ faStar } />)
    } else {
      star.push(<FontAwesomeIcon key={i} icon={ faStar } />)

    }}

      var cardStyle = {
      marginTop: '25px',
    };

    var star2 = [];
    for(let i = 0; i < 10; i++){
      if( i < myRatingMovie){
        star2.push(<FontAwesomeIcon   type="button" onClick= { () => {handleRating(i + 1)}} key={i} style={goldColor} icon={ faStar } />)
    }else{
      star2.push(<FontAwesomeIcon  type="button" onClick= { () => {handleRating(i + 1)}} key={i} icon={ faStar } />)
    }}
      
    var movieRated = false;

    
    const handleRating = (i) => {
      setMyRatingMovie(i);
      setVoteCount(vote + 1)
    }


    const handlePlus = () => {
      if(movieRated === false){
      setVoteCount(vote + 1)
      movieRated = true;
    }
      if(myRatingMovie < 10){
      setMyRatingMovie(myRatingMovie + 1);
      };
    };


    const handleMinus = () => {
      star2 =[];
      if(myRatingMovie > 0){
      setMyRatingMovie(myRatingMovie - 1);}
      if(myRatingMovie === 1 ){
        setVoteCount(vote)
      }
    }

    let average = (Math.round((((note * vote) + myRatingMovie)/voteCount*100)))/100


  return (
    <div>
      <Card height="650PX" style={cardStyle}>
        
        <CardImg top width="100vw" height="350PX" src={img}  />

        <CardBody>

          <CardTitle tag="h5">{name}</CardTitle>

          <CardSubtitle style={{cursor :'pointer'}} tag="h6" className="mb-2 text-muted">Like 
            <FontAwesomeIcon onClick={ () => handleLikeMovie() } id="testhover2" style={color} icon={ faHeart } /> 
          </CardSubtitle>

          <CardSubtitle tag="h6" className="mb-2 text-muted">Nombre de vue
            <FontAwesomeIcon style={color2} onClick={ ()=>handleWatchMovie() } className="mx-1" id="testhover" icon={ faVideo } /> 
            <Badge color="secondary">{countWatchMovie}</Badge> 
          </CardSubtitle>

          <CardSubtitle  tag="h6" className="mb-2 text-muted">Avis {star2}
            <ButtonGroup>
              <Button onClick = { () => {handleMinus()}}  outline color="warning" size="sm">-</Button>
              <Button onClick = { () => {handlePlus()}} outline color="success" size="sm">+</Button>
            </ButtonGroup>
          </CardSubtitle>

          <CardSubtitle tag="h6" className="mb-2 text-muted">Rating {star} {average} </CardSubtitle>

          <CardSubtitle tag="h6" className="mb-2 text-muted">Rating Count : {voteCount} </CardSubtitle>

          <CardText className="text-truncate">{desc}</CardText>

        </CardBody>
        
      </Card>
    </div>
  );
};

export default MovieCard;