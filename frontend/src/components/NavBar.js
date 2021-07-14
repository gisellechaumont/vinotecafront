import React, { useState } from "react";

//REACT BOOTSTRAP
import Navbar from "react-bootstrap/Navbar"
import Nav from 'react-bootstrap/Nav';
import NavDropdown from "react-bootstrap/NavDropdown";
import Button  from "react-bootstrap/Button";

//LOGO
import logoVinoteca from '../assets/images/LogoVinoteca.png';

//MODAL
import LoginModal from "./LoginModal";

export default function NavigationBar(props) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    
    const navStyle = {
        width: '90px',
        borderRadius: '50%',
    };

    const handleLoginClick = () => {
    setShowLoginModal(true);
    }

    const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    }

    const handleLogin = async (email, password) => {
    console.log(email, password);

    const url = 'http://localhost:8000/auth';

    const params = {
      email,
      password,
    };

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });
    
    const data = await response.json();

    if (response.status === 200) {
        props.updateUser({name: data.data});
        handleCloseLoginModal();
        } else {
        alert(data.message); }
        
        console.log(data);
    };

    const handleLogout = async () => {
        const url = 'http://localhost:8000/auth';

        const response = await fetch(url, 
            {method: 'DELETE', 
            credentials: 'include', });

        if (response.status === 200){
            props.updateUser(null);
        }else{
            alert('data.message')
        }
    }
  

    return (
        <>
    <Navbar style= {{backgroundColor: '#f5f5ef' }} expand="lg">
    <Navbar.Brand href="http://localhost:3000"> 
        <img src={logoVinoteca} style={ navStyle } alt="Vinoteca Calchaqui"/>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    
    <Nav className="ml-auto">

        { props.user ? (
            <>
        <Nav.Link href="http://localhost:3000">Inicio</Nav.Link>
        <NavDropdown alignRight title={props.user.name} id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Mi cuenta</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Mis pedidos</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Favoritos</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">Lista de deseos</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
        </NavDropdown>
        </>

    ) : (

        <>
        <Nav.Link href="http://localhost:3000">Inicio</Nav.Link>
        <NavDropdown alignRight title="Productos" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Vinos</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Bodegas</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Variedades</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">Vinos por caja</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.5">Recomendados</NavDropdown.Item>
        </NavDropdown>
        <Button variant="dark" onClick={handleLoginClick}>Mi cuenta</Button>
        
        </>
        )}

    </Nav>
    </Navbar.Collapse>
    </Navbar>
        <LoginModal show={showLoginModal} handleCloseLoginModal={handleCloseLoginModal} handleLogin={handleLogin}/>
    </>
);}