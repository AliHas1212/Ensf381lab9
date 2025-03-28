// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/login';
import HousePricePredictor from './components/HousePricePredictor';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/" element={<HousePricePredictor />} />
      </Routes>
    </Router>
  );
};

export default App;
