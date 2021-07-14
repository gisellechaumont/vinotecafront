import React, { useState, useEffect } from 'react'
import './App.css';

//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';

//COMPONENTS
import NavigationBar from './components/NavBar';
import PubliList from './components/PubliList';
import PubliDetail from './components/PubliDetail';
import Envio from './components/Envio';
import SearchBar from './components/SearchBar';
import NotFound from './components/NotFound';

//REACT ROUTER DOM
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(checkUser, []);

  function checkUser() {
    fetch('http://localhost:8000/auth/check', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        updateUser(data.data);
      });
  }

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return ( 
  <BrowserRouter> 
  <Envio /> 
  <NavigationBar user={user}  updateUser={updateUser} /> 
  <SearchBar /> 
  
  <Switch>

  <Route exact path='/'>
    <PubliList type="productos" />
  </Route> 

  <Route path="/detalles/:id">
      <PubliDetail />
  </Route>

  <NotFound />
</Switch>
  </BrowserRouter>


  )};

export default App;
