import { Component, useEffect, useState } from "react";
import { Cookies } from 'react-cookie';
import { useGlobalVariables } from '../contexts/GlobalVariablesContext';
import ModuleNewForm from '../components/form/ModuleNewForm';
import ConstForm from "../components/admin/constform";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const AdminPage = ({setIsLoggedIn}) => {
  const variables = useGlobalVariables();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [newConstFormVisible, setConstFormVisible] = useState(false);
  const [constData, setConstData] = useState(null);
  const [msgErrorUpdate, setMsgErrorUpdate] = useState(null);
  const [msgErrorUpdateClass, setMsgErrorUpdateClass] = useState(null);

  // Vérifie si l'utilisateur est connecté
  const [user, setUser] = useState(cookies.get("user"));
  const [message] = useState(
    user ? `Bienvenue ${user.username || "utilisateur"}` : ""
  );

  useEffect(() => {
    // Si l'utilisateur n'est pas connecté, rediriger vers la page d'accueil
    if (!user) {
      navigate("/");
    }

    fetch('http://localhost:3500/getConst')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }
        return response.json(); // Convertir la réponse en JSON
    })
    .then(data => {
      setConstData(data); // Met à jour l'état
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des variables globales:', error);
    });
  }, [user, navigate]);

  const handleLogout = () => {
    cookies.remove("user", {path: "/"});
    setUser(null);
    navigate("/");
    setIsLoggedIn(false);
  }

  const handleOpen = () => {
    setConstFormVisible(true);
  }

  const handleConstClose = () => {
    setConstFormVisible(false);
  }

  const handleConstChange = (e, index) => {
    const {name, value} = e.target;
    const updatedData = [...constData];
    updatedData[index] = {...updatedData[index], [name]: value};
    setConstData(updatedData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3500/updateConst', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(constData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          setMsgErrorUpdateClass('msgerror');
          console.error('Erreur:', data);
        } else {
          console.log('Données mises à jour:', data);
          console.log(variables);

          // Mise à jour des valeurs dans variables
          data.data.forEach(({ name, value }) => {
            if (variables.hasOwnProperty(name)) {
              variables[name] = value;
            }
          });

          console.log(variables);

          setMsgErrorUpdate('Mise à jour réussie');
          setMsgErrorUpdateClass('msgsucess');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour:', error);
        setMsgErrorUpdate('Une erreur est survenue');
      });
  }
  
  return (
    <div className="main_ctn">
      <div className="admin_ctn">
        <h1>{message}</h1>
        <button className="btn_action" onClick={handleLogout}>Deconnexion</button>
        {user && (
          <div>
            <p>Nom: {user.username}</p>
            <p>Email: {user.email}</p>
            {/* Vous pouvez ajouter d'autres informations de l'utilisateur ici */}
          </div>
        )}
        <div className="const_admin_ctn">
          <h3>Variable système</h3>
          { !newConstFormVisible && 
            <button className="btn_action btn_width_300" onClick={handleOpen}>Nouvelle Constante +</button>
          }
          { newConstFormVisible && 
            <ConstForm setConstFormVisible={handleConstClose}/>
          }
          {/* Afficher les variables globales récupérées */}
          {msgErrorUpdate && 
            <p>{msgErrorUpdate}</p>
          }
          {constData && 
            <form className="form form_admin_const" onSubmit={handleSubmit}>
            {constData.map((element, index) => (
              <div key={index}>
                <label htmlFor={`constvalue-${index}`}>{element.name}</label>
                <input 
                  id={`constvalue-${index}`}
                  name="value" 
                  onChange={(e) => handleConstChange(e, index)} 
                  type="text" 
                  value={element.value} 
                />
                <input 
                  name="note" 
                  type="text" 
                  onChange={(e) => handleConstChange(e, index)} 
                  value={element.note} 
                />
              </div>
            ))}
            <input type="submit" />
          </form>
          }
        </div>
        <div className="admin_module_new">
          <ModuleNewForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
