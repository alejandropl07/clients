import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormClient from "../components/FormClient";
import Home  from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {

  return (
    <BrowserRouter>
      <>
        <Routes>
          {/* <Route
            exact
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          /> */}
          {/* <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/create" element={<FormClient />} /> */}
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default AppRouter;
