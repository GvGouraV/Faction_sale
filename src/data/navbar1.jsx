import React , {Component} from "react"
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import auth from "../services/authServices";
class NavBar1 extends Component {
  
      render (){
        let user = auth.getUser()
          return(<div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/All">My-Store</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/Watches">Watches</Nav.Link>
                <Nav.Link href="/Sunglasses">Sunglasses</Nav.Link>
                <Nav.Link href="/Belts">Belts</Nav.Link>
                <Nav.Link href="/Handbags">HandBags</Nav.Link>
                <NavDropdown title="Footwear" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/Formal Shoes">Formal Shoes</NavDropdown.Item>
                  <NavDropdown.Item href="/Sport Shoes">Sport Shoes</NavDropdown.Item>
                  <NavDropdown.Item href="/Floaters">Floaters</NavDropdown.Item>
                  <NavDropdown.Item href="/Sandals">Sandals</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                {user
                ? <NavDropdown title={user.email} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/myOrder">My Order</NavDropdown.Item>
                <NavDropdown.Item href="/manageProducts">Manage Products</NavDropdown.Item>
                <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
                :<Nav.Link href="/login">Login</Nav.Link>
                }                
                <Nav.Link eventKey={2} href="/cart">
                  Cart <span className="text-success " ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg></span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>
         

          </div> )
      }
}
export default NavBar1;