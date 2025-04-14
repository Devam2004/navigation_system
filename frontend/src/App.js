// App.js or your main routing file
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CampusMap from './Components/CampusMap';
import BlockDetailsPage from './Components/BlockDetailsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CampusMap />} />
        <Route path="/block-details/:blockName" element={<BlockDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
