import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Création du contexte
const GlobalVariablesContext = createContext(null);

// Fournisseur du contexte
export const GlobalVariablesProvider = ({ children }) => {
  const [variables, setVariables] = useState([]); // null tant que les données ne sont pas chargées

  useEffect(() => {
    fetch('http://localhost:3500/getConstValue')
        .then(response => {
            // if (!response.ok) {
            //     throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
            // }
            return response.json(); // Convertir la réponse en JSON
        })
        .then(data => {
          setVariables(data); // Met à jour l'état
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des variables globales:', error);
        });
  }, []);

useEffect(() => {
  console.log("Variables mises à jour:", variables);
}, [variables]); // Ce useEffect affichera la mise à jour

  return (
    <GlobalVariablesContext.Provider value={variables}>
      {children}
    </GlobalVariablesContext.Provider>
  );
};

// Hook pour accéder aux variables globales
export const useGlobalVariables = () => {
  const context = useContext(GlobalVariablesContext);
  return context;
};
