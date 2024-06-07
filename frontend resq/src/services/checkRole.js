import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth_service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from "react";


export const Unauthorized = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      toast.warning("You need to log in first!");
      navigate('/login'); 
    }
  }, [user, navigate]);

  return null; 
}


export const CheckMod = () => {
  const navigate = useNavigate();

  return () => {
    const user = getCurrentUser();
    if (!user || !user.roles.includes("ROLE_MODERATOR")) {
      navigate("/");
    }
  };
};

export const CheckAdmin = () => {
  const navigate = useNavigate();

  return () => {
    const user = getCurrentUser();
    if (!user || !user.roles.includes("ROLE_ADMIN")) {
      navigate("/");
    }
  };
};