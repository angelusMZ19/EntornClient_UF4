import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Welcome from './components/C-Welcome/Welcome';
import MoviesAdd from './components/C-Movies/MoviesAdd';
import MoviesList from "./pages/MoviesList";

function App() {
  return (
    <Router> {}
      <>
        <Routes>
          <Route path="/" element={<Welcome username="Angelo" />} />
          <Route path="/movies/list" element={<MoviesList />} />
          <Route path="/movies/add" element={<MoviesAdd />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
