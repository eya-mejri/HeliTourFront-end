import React from "react";
import {  Route, Routes } from "react-router";
import { adminRoutes, authRoutes, publicRoutes } from "./router.link";
import Feature from "../feature";
import AuthFeature from "../authFeature";

const ALLRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<Feature />}>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>

        <Route element={<AuthFeature />}>
          {authRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>

        {adminRoutes.map((route) => (
        <Route path={route.path} element={route.element} key={route.path}>
          {route.children?.map((child) => (
            <Route
              path={child.path}
              element={child.element}
              key={child.path}
            />
          ))}
        </Route>
      ))}
      </Routes>
    </>
  );
};

export default ALLRoutes;
