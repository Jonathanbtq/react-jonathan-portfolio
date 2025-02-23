import { useEffect, useState } from "react";
import { Cookies } from 'react-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom"

const AdminPage = ({setIsLoggedIn}) => {
  const [message, setMessage] = useState("");
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Vérifie si l'utilisateur est connecté
  const user = cookies.get("user");

  useEffect(() => {
    // Si l'utilisateur n'est pas connecté, rediriger vers la page d'accueil
    if (!user) {
      navigate("/");
      return;
    }

    // Si l'utilisateur est connecté, récupérer ses informations
    setUserData(user);

    // Si l'utilisateur est connecté, afficher un message de bienvenue
    setMessage(`Bienvenue ${user.username || "utilisateur"}`);
  }, [user, navigate]);

  const handleLogout = () => {
    cookies.remove("user", {path: "/"});
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
    </div>
  );
};

export default AdminPage;
