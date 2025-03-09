import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import ReseauxFooter from "../components/ReseauxFooter";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { useGlobalVariables } from '../contexts/GlobalVariablesContext';
import moduleDolibarr from "../content/moduleDolibarr";

export default function Boutique() {
    const [moduleData, setModuleData] = useState([]);
    const variables = useGlobalVariables();

    useEffect(() => {
        fetch('http://localhost:3500/getModules')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setModuleData(data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des modules globales:', error);
            })
    }, [])

    return (
        <div className="boutique_main">
            <div className="boutique_mod_ctn">
                <h2>Modules Dolibarr</h2>
                <div className="btq_dol_mod">
                    {moduleData.map((module, index) => {
                        let nameConst = "MOD_" + module.name; // Génère la clé
                        let isActive = variables[nameConst] === "1";
                        if (isActive) {
                            return (
                                <div className="doli_mod_card" key={index}>
                                    <div className="btq_doli_mod_vrs" title="Version Dolibarr (min - max)">
                                        <span>{module.version_dolibarr} </span>
                                    </div>
                                    {module.files
                                        .sort((a, b) => {
                                            // Trie les fichiers .zip à la fin
                                            if (a.filename.includes(".zip")) return 1;
                                            if (b.filename.includes(".zip")) return -1;
                                            return 0;
                                        })
                                        .map((file) => (
                                            <div key={file.id} style={{ width: "100%" }}>
                                                {!file.filename.includes(".zip") && (
                                                    <img
                                                        src={`${window.location.origin}/backend/uploads/modules/${file.filename}`}
                                                        alt={module.name}
                                                    />
                                                )}
                                                {file.filename.includes(".zip") && (
                                                    <section>
                                                        <a
                                                            href={`${window.location.origin}/backend/uploads/modules/${file.filename}`}
                                                            download
                                                        >
                                                            {module.name}
                                                        </a>
                                                    </section>
                                                )}
                                            </div>
                                        ))}
                                    <section>
                                        {/* Vérifier si aucun fichier .zip n'est présent */}
                                        {!module.files.some((file) => file.filename.includes(".zip")) && (
                                            <p>{module.name}</p>
                                        )}
                                        <p>{module.prix} € TTC</p>
                                    </section>
                                </div>
                            );
                        }
                        return null; // Important pour ne pas casser le `map()`
                    })}
                </div>
            </div>
        </div>
    );    
}