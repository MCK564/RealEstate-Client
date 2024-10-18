import { Outlet } from "react-router-dom"
import Sidebarr from "./AdminSideBar"



export const AdminLayout =() => {
    return (
        <>
      <Sidebarr/>
        <Outlet />
        
        </>
   
      
    )
}