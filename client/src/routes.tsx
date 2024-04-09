import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/home-screen';
import CardDetail from './screens/card-detail-screen';

const RoutesC: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/detail" Component={CardDetail} />
      </Routes>
    </Router>
  );
};

export default RoutesC;
