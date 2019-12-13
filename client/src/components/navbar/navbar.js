import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'


const NavbarComponent=(props)=>
{
    const logout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("uid");
        props.props.history.push('/');
      }

    return(
        <React.Fragment>
            <Navbar bg="light" expand="lg" className="shadow-sm">
                <Navbar.Brand>
                    <Link to="/home" className="text-dark">
                        <i className="chess king icon iconh text-dark"></i>
                        TheZalophusBlog
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link>
                            <Link to="/home" className="text-dark">Home</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/new" className="text-dark">New Blog</Link>
                        </Nav.Link>
                    </Nav>
                    <button className="btn btn-sm btn-warning" onClick={ logout }>Logout</button>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
    )
}

export default NavbarComponent;