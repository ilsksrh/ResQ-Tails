import React from "react"
import { getCurrentUser } from "./services/auth_service";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CheckAdmin } from "./services/checkRole";


const AdminBoard = () => {
    const check = CheckAdmin();
    useEffect(() => {
        check();
      }, [check]);
    
  
    return (
      <>
        It is admin
      </>
    );
  };
  
  export default AdminBoard;
  