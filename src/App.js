import { useState, useEffect } from "react";
import './App.css';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Fetching!");
    Auth.currentAuthenticatedUser().then(user => {
      setUser(user);
      console.log(user.attributes);
    });
  }, []);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Bogdanoff</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              {user?<NavDropdown title="Connect" id="basic-nav-dropdown">
                <NavDropdown.Item href="#connect/coinex">Coinex</NavDropdown.Item>
                <NavDropdown.Item href="#connect/kraken">Kraken</NavDropdown.Item>
                <NavDropdown.Item href="#connect/ibkr">Interactive Brokers</NavDropdown.Item>
              </NavDropdown>:""}
            </Nav>
            {
              user ?
              <Nav className="ml-auto">
                <Navbar.Text>{user.attributes.given_name + " " + user.attributes.family_name}</Navbar.Text>
                <Button variant="outline-light" onClick={() => Auth.signOut()}>Log out</Button>
              </Nav> :
              <Nav className="ml-auto">
                <Button variant="outline-light" onClick={() => Auth.federatedSignIn({ provider: "Google" })}>Log in</Button>
              </Nav>
            }

          </Navbar.Collapse>
        </Container>
      </Navbar>
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
