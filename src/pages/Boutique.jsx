import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import ReseauxFooter from "../components/ReseauxFooter";
import ScrollToTopButton from "../components/ScrollToTopButton";

import moduleDolibarr from "../content/moduleDolibarr";

export default function Boutique() {
    const [moduleData, setModuleData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3500/getModules')
            .then(response => response.json())
            .then(data => {
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
                    {moduleDolibarr.map((module, key) => {
                        return (
                            <div className="doli_mod_card" key={key}>
                                <div className="btq_doli_mod_vrs" title="Version Dolibarr (min - max)">
                                    <span>{module.version} </span>
                                </div>
                                <img src={`${window.location.origin}${module.image}`} alt={module.name} />
                                <section>
                                    <a href={module.url}>
                                        <p>{module.name}</p>
                                    </a>
                                    <p>{module.prix} € TTC</p>
                                </section>
                            </div>
                        );
                    })}
                    {moduleData.map((module, index) => {
                        return (
                            <div className="doli_mod_card" key={index}>
                                <div className="btq_doli_mod_vrs" title="Version Dolibarr (min - max)">
                                    <span>{module.version_module} </span>
                                </div>
                                <img src={`${window.location.origin}${module.image}`} alt={module.name} />
                                <section>
                                    <a href={module.url}>
                                        <p>{module.name}</p>
                                    </a>
                                    <p>{module.prix} € TTC</p>
                                </section>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}