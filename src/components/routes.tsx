import React from "react";
import { Routes, Route } from "react-router-dom";
import MostStarsComponent from "./mostStarsComponent";
// import GetFavorites from "./GetFavorites";
import Signup from "./signup";
import Login from "./login";

const RouterComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/getMostStarred" element={<MostStarsComponent />} />
      {/* <Route path="/getFavorites" Component={GetFavorites} /> */}
    </Routes>
  );
};

export default RouterComponent;
