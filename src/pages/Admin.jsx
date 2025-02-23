import { useEffect, useState } from "react";
import { Cookies } from 'react-cookie';
import { useGlobalVariables } from '../contexts/GlobalVariablesContext';
import ConstForm from "../components/admin/constform";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const AdminPage = ({setIsLoggedIn}) => {
  const variables = useGlobalVariables();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Vérifie si l'utilisateur est connecté
  const [user, setUser] = useState(cookies.get("user"));
  const [message, setMessage] = useState(
    user ? `Bienvenue ${user.username || "utilisateur"}` : ""
  );

  useEffect(() => {
    // Si l'utilisateur n'est pas connecté, rediriger vers la page d'accueil
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    cookies.remove("user", {path: "/"});
    setUser(null);
    navigate("/");
    setIsLoggedIn(false);
  }

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={handleLogout}>Deconnexion</button>
      {userData && (
        <div>
          <p>Nom: {userData.username}</p>
          <p>Email: {userData.email}</p>
          {/* Vous pouvez ajouter d'autres informations de l'utilisateur ici */}
        </div>
      )}
      <ConstForm />
    </div>
  );
};

export default AdminPage;
