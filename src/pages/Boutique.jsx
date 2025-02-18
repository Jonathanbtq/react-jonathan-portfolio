import Footer from "../components/Footer";
import ReseauxFooter from "../components/ReseauxFooter";
import ScrollToTopButton from "../components/ScrollToTopButton";

import moduleDolibarr from "../content/moduleDolibarr";

export default function Boutique() {
    console.log(moduleDolibarr)
    return (
        <div className="boutique_main">
            <div className="boutique_mod_ctn">
                <h2>Modules Dolibarr</h2>
                <div className="btq_dol_mod">
                    {moduleDolibarr.map((module, key) => {
                        return (
                            <div className="doli_mod_card" key={key}>
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
                </div>
            </div>
        </div>
    )
}