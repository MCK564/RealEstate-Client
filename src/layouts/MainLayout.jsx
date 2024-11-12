import React from "react";
import { Outlet } from "react-router-dom";
import { MainAppbar } from "./MainAppbar";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

export const MainLayout = () => {
  return (
    <>
  
       <MainAppbar />
      <Outlet />
      <Footer/>
   
     
    </>
  );
};
