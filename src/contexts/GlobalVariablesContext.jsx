import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Création du contexte
const GlobalVariablesContext = createContext(null);

// Fournisseur du contexte
export const GlobalVariablesProvider = ({ children }) => {
  const [variables, setVariables] = useState(null); // null tant que les données ne sont pas chargées

  useEffect(() => {
    const fetchGlobalVariables = async () => {
      try {
        const response = await axios.get('http://localhost:3500/getConst');
        if (response.data) {
            setVariables(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des variables globales:', error);
      }
    };

    fetchGlobalVariables();
  }, []);

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
