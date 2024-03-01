import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const NavBar = ({ setToken }) => {
  const [expanded, setExpanded] = useState([]);

  const handleNavBarClick = () => {
    setExpanded(true);
  };
  const navigate = useNavigate();

  return (
    <Navbar expanded={!expanded} expand="lg" className="bg-light fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          AllTails
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link
                onClick={handleNavBarClick}
                as={Link}
                to="/"
                className="nav-link"
              >
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={handleNavBarClick}
                as={Link}
                to="/register"
                className="nav-link"
              >
                Register
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={handleNavBarClick}
                as={Link}
                to="/login"
                className="nav-link"
              >
                Login
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={handleNavBarClick}
                as={Link}
                to="/account"
                className="nav-link"
              >
                My Account
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                    setToken ('')
                    window.localStorage.removeItem("token");
                    navigate('/');
                }}
                className="nav-link"
              >
                Log Out
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;