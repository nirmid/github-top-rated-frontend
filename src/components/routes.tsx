import React from "react";
import { Routes, Route } from "react-router-dom";
import MostStarsTable from "./mostStars";
import GetFavorites from "./favorites";
import Signup from "./signup";
import Login from "./login";

const RouterComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/getMostStarred" element={<MostStarsTable />} />
      <Route path="/getFavorites" element={<GetFavorites />} />
    </Routes>
  );
};

export default RouterComponent;
