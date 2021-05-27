import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Upperbar() {
  return (
    <div className="Navigation">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Upperbar;
