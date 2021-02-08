// import {  } from 'bootstrap';
import React, {useState} from 'react';
import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink, Popover, PopoverHeader, ListGroup, ListGroupItem, Button } from 'reactstrap';




const NavPill = (props) => {

  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);
  
    var sizing = {
      width: "250px",
      display: "flex",
      justifyContent: "space-between",
      padding: "5px"
     
    }
    var font = {
        backgroundColor: "black"
      }
    
    var blackText = {
      color: "white" 
    }
    
  
 
const handleDeleteFav = (name) => {
  props.handleDeleteParent(name);
  
}
   

    
    let wishlist = props.movieName.map(function(movie, i){
      return  <ListGroup type="inline">
          <ListGroupItem style={sizing}>{movie.name}
          <img  alt="
          current movie" width="50vw" height="50vh" src={movie.img} /><Button className="btn  btn-danger btn-sm" onClick={() => handleDeleteFav(movie.name)}>x</Button>
          </ListGroupItem>
        </ListGroup>     
      
    })

    

    


 return (
    <div  style={font}>
      
      <Navbar style={blackText} expand="">

          <NavbarBrand style={blackText} href="/"> 
            <img width="50px" src="../popcorn.svg" className="mr-1" alt="movie Logo" />Latest Releases
          </NavbarBrand>

          <Nav className="mr-auto" navbar>
            <NavItem>
            
              <NavLink  id="Popover1" type="button" style={blackText} >Nombre de FILMS: {props.lambda2}</NavLink>
              <Popover  placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle} >
                <h5>Wishlist</h5>
                  <PopoverHeader >
                    {wishlist}
                  </PopoverHeader>
              </Popover>
            </NavItem>
          </Nav>

      </Navbar>
      
    </div>
  );
}


export default NavPill;