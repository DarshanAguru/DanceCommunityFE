import React from 'react';
import Home from './pages/Home';
import Classes from './pages/Classes'; 
import AddAudition from './pages/AddAudition';
import AddInstitution from './pages/AddInstitution';
import Auditions from './pages/Auditions'; 
import Events from './pages/Events';
import Institutions from './pages/Institutions';
import Profile from './pages/Profile';
import IndividualClass from './pages/IndividualClass';
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Institutions' element={<Institutions />} />
        <Route path='/AddAudition' element={<AddAudition />} />
        <Route path='/AddInstitution' element={<AddInstitution />} />
        <Route path='/Auditions' element={<Auditions />} />
        <Route path='/Classes' element={<Classes />} />
        <Route path='/Events' element={<Events />} />
        <Route path='/IndividualClass/:cn' element={<IndividualClass />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/Signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

